import { match, P } from 'ts-pattern'
import type { Cell } from '../../../../types/cell'
import type { CanvasEvent } from '../../../../types/mouseEvents'
import type { Position } from '../../../../types/position'

type GridPosition = (mousePosition: Position) => {
	x: number
	y: number
}
type FloodFill = (x: number, y: number) => Cell[] | undefined

type SetCell = (cells: Cell | Cell[]) => void
type DefaultActions = (event: CanvasEvent) => void

const useBucket = (
	floodFill: FloodFill,
	gridPosition: GridPosition,
	setCell: SetCell,
	currentTile: string,
	defaultActions: DefaultActions,
	historyPush: () => void
) => {
	return function (event: CanvasEvent) {
		match(event)
			.with({ type: 'click', data: { button: P.not(1) } }, (payload) => {
				const { mousePosition, button } = payload.data
				const { x, y } = gridPosition(mousePosition)
				const value = button === 2 ? ' ' : currentTile
				const cells = floodFill(x, y)?.map((c) => ({
					...c,
					value,
				}))
				if (cells) {
					historyPush()
					setCell(cells)
				}
			})
			.otherwise(defaultActions)
	}
}

export { useBucket }
