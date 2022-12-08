import { match, P } from 'ts-pattern'
import { line } from '../../../../helpers/line'
import type { Cell } from '../../../../types/cell'
import type { CanvasEvent } from '../../../../types/mouseEvents'
import type { Position } from '../../../../types/position'

type GridPosition = (mousePosition: Position) => {
	x: number
	y: number
}

type SetCell = (cells: Cell | Cell[]) => void
type DefaultActions = (event: CanvasEvent) => void

const useErase = (
	gridPosition: GridPosition,
	setCell: SetCell,
	defaultActions: DefaultActions,
	historyPush: () => void
) => {
	return function (event: CanvasEvent) {
		match(event)
			.with({ type: 'click', data: { button: P.not(1) } }, (payload) => {
				const { mousePosition } = payload.data
				const { x, y } = gridPosition(mousePosition)
				historyPush()
				setCell({ x, y, value: ' ' })
			})
			.with({ type: 'drag', data: { button: P.not(1) } }, (payload) => {
				const { oldMousePosition, mousePosition } = payload.data
				const point0 = gridPosition(oldMousePosition)
				const point1 = gridPosition(mousePosition)
				const points = line(point0, point1).map((p) => ({
					...p,
					value: ' ',
				}))
				historyPush()
				setCell(points)
			})
			.otherwise(defaultActions)
	}
}

export { useErase }
