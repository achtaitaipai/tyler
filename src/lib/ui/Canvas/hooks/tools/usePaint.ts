import { useSetAtom, type SetStateAction } from 'jotai'
import { match, P } from 'ts-pattern'
import { line } from '../../../../helpers/line'
import { historyPushAtom } from '../../../../store/history/index.ts'
import { type Cell } from '../../../../types/cell'
import { type Grid } from '../../../../types/grid'
import type { CanvasEvent } from '../../../../types/mouseEvents'
import type { Position } from '../../../../types/position'

type GridPosition = (mousePosition: Position) => {
	x: number
	y: number
}

type SetGrid = (update: SetStateAction<Grid>) => void
type DefaultActions = (event: CanvasEvent) => void

const usePaint = (
	gridPosition: GridPosition,
	setGrid: SetGrid,
	currentTile: string,
	defaultActions: DefaultActions,
	historyPush: () => void
) => {
	function setCells(grid: Grid, ...cells: Cell[]) {
		const clone = [...grid]
		cells.forEach(({ x, y, value }) => {
			const line = clone[y]
			clone[y] = line.substring(0, x) + value + line.substring(x + 1)
		})
		return clone
	}

	return function paint(event: CanvasEvent) {
		match(event)
			.with({ type: 'click', data: { button: P.not(1) } }, (payload) => {
				const { mousePosition, button } = payload.data
				const { x, y } = gridPosition(mousePosition)
				let value = currentTile
				if (button === 2) value = ' '
				historyPush()
				setGrid((grid) => setCells(grid, { x, y, value }))
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
				historyPush()
				setGrid((grid) => setCells(grid, ...points))
			})
			.otherwise(defaultActions)
	}
}

export { usePaint }
