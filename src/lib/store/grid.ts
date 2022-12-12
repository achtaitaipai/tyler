import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { initialGrid } from '../../settings/initialGrid'
import { floodFill } from '../helpers/floodFill'
import type { Cell } from '../types/cell'
import type { Grid } from '../types/grid'
import {
	getTileFromCharAtom,
	tilesetColumnsAtom,
	tilesetImageAtom,
	tilesetRowsAtom,
	tilesHeightAtom,
	tilesWidthAtom,
} from './tileSet'

export const gridAtom = atomWithStorage<Grid>('tylerGrid', initialGrid)

export const gridWidthAtom = atom((get) => get(gridAtom)[0].length)
export const gridHeightAtom = atom((get) => get(gridAtom).length)

export const mapWidthAtom = atom(
	(get) => get(gridWidthAtom) * get(tilesWidthAtom)
)
export const mapHeightAtom = atom(
	(get) => get(gridHeightAtom) * get(tilesHeightAtom)
)

export const getImageAtom = atom((get) => {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	if (!ctx) return
	canvas.width = get(mapWidthAtom)
	canvas.height = get(mapHeightAtom)
	get(getCellsAtom).forEach((tile) => {
		if (tile !== null) ctx.drawImage(...tile)
	})
	return canvas
})

export const insertColumnAtom = atom(null, (get, set, x: number) =>
	set(
		gridAtom,
		get(gridAtom).map((line) =>
			x === line.length
				? line + ' '
				: line.slice(0, x) + ' ' + line.slice(x)
		)
	)
)

export const removeColumnAtom = atom(null, (get, set, x: number) => {
	if (get(gridAtom)[0].length <= 1) return
	set(
		gridAtom,
		get(gridAtom).map((line) => line.slice(0, x) + line.slice(x + 1))
	)
})

export const insertRowAtom = atom(null, (get, set, y: number) => {
	const clone = [...get(gridAtom)]
	const row = ' '.repeat(clone[0]?.length ?? 0)
	set(gridAtom, [...clone.slice(0, y), row, ...clone.slice(y)])
})

export const removeRowAtom = atom(null, (get, set, y: number) => {
	if (get(gridAtom).length <= 1) return
	set(gridAtom, [...get(gridAtom).slice(0, y), ...get(gridAtom).slice(y + 1)])
})

export const getCellAtom = atom((get) => (x: number, y: number) => {
	return get(gridAtom)[y].charAt(x)
})

export const setCellsAtom = atom(null, (get, set, cells: Cell | Cell[]) => {
	let clone = [...get(gridAtom)]
	const points = Array.isArray(cells) ? cells : [cells]
	points.forEach(({ x, y, value }) => {
		if (
			x >= 0 &&
			x < get(gridWidthAtom) &&
			y >= 0 &&
			y < get(gridHeightAtom)
		) {
			const line = clone[y].slice(0, x) + value + clone[y].slice(x + 1)
			clone = [...clone.slice(0, y), line, ...clone.slice(y + 1)]
		}
	})
	set(gridAtom, clone)
})

export const getCellsAtom = atom((get) => {
	const grid = get(gridAtom)
	get(tilesetColumnsAtom)
	get(tilesetRowsAtom)
	return grid.flatMap((line, y) =>
		line.split('').map((c, x) => {
			const tile = get(getTileFromCharAtom)(c)
			if (tile === null) return null
			const [sx, sy, sWidth, sHeight] = tile
			const dx = x * sWidth
			const dy = y * sHeight
			return [
				get(tilesetImageAtom),
				sx,
				sy,
				sWidth,
				sHeight,
				dx,
				dy,
				sWidth,
				sHeight,
			] as [
				HTMLImageElement,
				number,
				number,
				number,
				number,
				number,
				number,
				number,
				number
			]
		})
	)
})

export const floodFillGridAtom = atom((get) => (x: number, y: number) => {
	const grid = get(gridAtom)
	return floodFill(grid, x, y)
})
