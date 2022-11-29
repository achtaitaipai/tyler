import { Cell } from '../types/cell'
import { Grid } from '../types/grid'

type Condition = (cell: Cell) => boolean

function bucket(grid: Grid, x: number, y: number) {
	const value = get(grid, x, y)
	if (!value) return
	const visited = new Set<string>()
	const stack: Cell[] = [{ x, y, value }]
	const result: Cell[] = [{ x, y, value }]

	while (stack.length > 0) {
		const cell = stack.pop()
		if (!cell) return
		visited.add(`${cell.x},${cell.y}`)
		const neighBors = getNeighBors(grid, cell.x, cell.y, (c) => {
			return c.value === value && !visited.has(`${c.x},${c.y}`)
		})
		stack.push(...neighBors)
		result.push(...neighBors)
	}
	return result
}

function getNeighBors(
	grid: Grid,
	x: number,
	y: number,
	condition?: Condition
): Cell[] {
	const left = { x: x - 1, y, value: get(grid, x - 1, y) }
	const right = { x: x + 1, y, value: get(grid, x + 1, y) }
	const top = { x: x, y: y - 1, value: get(grid, x, y - 1) }
	const bottom = { x: x, y: y + 1, value: get(grid, x, y + 1) }
	const neighBors = [left, right, top, bottom].filter(({ x, y, value }) => {
		if (value === null) return false
		if (condition) return condition({ x, y, value })
		return true
	}) as Cell[]
	return neighBors
}

function get(grid: Grid, x: number, y: number): string | null {
	return grid[y]?.charAt(x) ?? null
}

export { bucket }
