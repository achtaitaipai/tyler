import { match, P } from 'ts-pattern'
import { line } from '../../../../helpers/line'
import { Cell } from '../../../../types/cell'
import { CanvasEvent } from '../../../../types/mouseEvents'
import { Position } from '../../../../types/position'

type GridPosition = (mousePosition: Position) => {
	x: number
	y: number
}

type SetCell = (cells: Cell | Cell[]) => void
type DefaultActions = (event: CanvasEvent) => void

const usePaint = (
	gridPosition: GridPosition,
	setCell: SetCell,
	currentTile: string,
	defaultActions: DefaultActions
) => {
	return function paint(event: CanvasEvent) {
		match(event)
			.with({ type: 'click', data: { button: P.not(1) } }, (payload) => {
				const { mousePosition, button } = payload.data
				const { x, y } = gridPosition(mousePosition)
				let value = currentTile
				if (button === 2) value = ' '
				setCell({ x, y, value })
			})
			.with({ type: 'drag', data: { button: P.not(1) } }, (payload) => {
				const { oldMousePosition, mousePosition, button } = payload.data
				const point0 = gridPosition(oldMousePosition)
				const point1 = gridPosition(mousePosition)
				let value = currentTile
				if (button === 2) value = ' '
				const points = line(point0, point1).map((p) => ({
					x: p.x,
					y: p.y,
					value,
				}))
				setCell(points)
			})
			.otherwise(defaultActions)
	}
}

export { usePaint }
