import { useSetAtom, type SetStateAction } from 'jotai'
import { match, P } from 'ts-pattern'
import { autotileValueFromBool } from '../../../../helpers/autotile'
import { line } from '../../../../helpers/line'
import { historyPushAtom } from '../../../../store/history/historypush'
import type { Cell } from '../../../../types/cell'
import { type Grid } from '../../../../types/grid'
import type { CanvasEvent } from '../../../../types/mouseEvents'
import type { Position } from '../../../../types/position'

type GridPosition = (mousePosition: Position) => {
	x: number
	y: number
}

type SetGrid = (update: SetStateAction<Grid>) => void
type GetTileFromGroupandValue = (
	group: number,
	value: number
) => string | undefined
type GetGroup = (char: string) => number
type DefaultActions = (event: CanvasEvent) => void

const useAutotile = (
	gridPosition: GridPosition,
	setGrid: SetGrid,
	currentTile: string,
	getGroup: GetGroup,
	getTileFromGroupAndValue: GetTileFromGroupandValue,
	defaultActions: DefaultActions,
	historyPush: () => void
) => {
	function setCellsWithAutotiling(grid: Grid, cells: Cell[]) {
		return cells.reduce(
			(currentGrid, cell) => setCellWithAutotiling(currentGrid, cell),
			grid
		)
	}

	function setCellWithAutotiling(grid: Grid, cell: Cell) {
		const clone = [...grid]
		const { x, y } = cell
		setCell(clone, x, y, cell.value)
		const neighbors = getNeighbors(clone, x, y).filter(
			(c) => c !== null && c.value !== ' '
		) as Cell[]

		const cellsToSet = cell.value === ' ' ? neighbors : [cell, ...neighbors]
		const height = grid.length
		const width = grid[0].length

		cellsToSet.forEach((c) => {
			if (c.x < 0 || c.x >= width || c.y < 0 || c.y >= height) return
			const weight = getWeight(clone, c.x, c.y)
			const group = getGroup(c.value)
			const tile = getTileFromGroupAndValue(group, weight) ?? c.value
			setCell(clone, c.x, c.y, tile)
		})
		return clone
	}

	function setCell(grid: Grid, x: number, y: number, value: string) {
		if (grid[y])
			grid[y] = grid[y].substring(0, x) + value + grid[y].substring(x + 1)
	}

	function getWeight(grid: Grid, x: number, y: number) {
		const group = getGroup(grid[y].charAt(x))
		const bools = getNeighbors(grid, x, y).map((c) => {
			if (c === null) return false
			if (getGroup(c.value) !== group) return false
			return true
		})
		return autotileValueFromBool(bools)
	}

	function getNeighbors(grid: Grid, x: number, y: number) {
		return [
			{
				x: x - 1,
				y: y,
				value: grid[y]?.charAt(x - 1),
			},
			{
				x,
				y: y + 1,
				value: grid[y + 1]?.charAt(x),
			},
			{
				x: x + 1,
				y,
				value: grid[y]?.charAt(x + 1),
			},
			{
				x,
				y: y - 1,
				value: grid[y - 1]?.charAt(x),
			},
		].map((c) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (c.value === undefined || c.value === '') return null
			return c
		})
	}

	return function paint(event: CanvasEvent) {
		match(event)
			.with({ type: 'click', data: { button: P.not(1) } }, (payload) => {
				const { mousePosition, button } = payload.data
				const position = gridPosition(mousePosition)
				const value = button === 2 ? ' ' : currentTile
				historyPush()
				historyPush()
				setGrid((grid) =>
					setCellWithAutotiling(grid, { ...position, value })
				)
			})
			.with({ type: 'drag', data: { button: P.not(1) } }, (payload) => {
				const { oldMousePosition, mousePosition, button } = payload.data
				const point0 = gridPosition(oldMousePosition)
				const point1 = gridPosition(mousePosition)
				const value = button === 2 ? ' ' : currentTile
				const cells = line(point0, point1).map((c) => ({ ...c, value }))
				historyPush()
				setGrid((grid) => setCellsWithAutotiling(grid, cells))
			})
			.otherwise(defaultActions)
	}
}

export { useAutotile }
