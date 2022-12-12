import { atom } from 'jotai'
import { autotileGroupAtom } from './autotileGroup'
import { autoTileValuesAtom } from './autotileSettings'
import { gridAtom } from './grid'
import { charsMap } from '../../settings/charMap'
import {
	tilesetBase64Data,
	tilesetColumnsAtom,
	tilesetImageAtom,
	tilesetRowsAtom,
} from './tileSet'
import { fileSchema, type FileType } from '../types/fileSchema'
import { loadImage } from '../helpers/image'
import { canvasBackgroundAtom } from './canvasBackground'
import { historyPushAtom } from './history/index.ts'

export const getFileAtom = atom((get) => {
	const img = get(tilesetBase64Data)
	if (!img) return
	const groups = get(autotileGroupAtom)
	const values = get(autoTileValuesAtom)
	const columns = get(tilesetColumnsAtom)
	const rows = get(tilesetRowsAtom)
	const grid = get(gridAtom)
	const backgroundColor = get(canvasBackgroundAtom)
	const file: FileType = {
		grid,
		backgroundColor,
		tileset: {
			img,
			groups,
			values,
			columns,
			rows,
			charsMap,
		},
	}
	return JSON.stringify(file)
})
export const loadFileAtom = atom(null, async (get, set, upload: FileType) => {
	const file = upload
	set(gridAtom, file.grid)
	set(canvasBackgroundAtom, file.backgroundColor)
	set(tilesetColumnsAtom, file.tileset.columns)
	set(tilesetRowsAtom, file.tileset.rows)
	set(autotileGroupAtom, file.tileset.groups)
	set(autoTileValuesAtom, file.tileset.values)
	set(tilesetImageAtom, await loadImage(file.tileset.img))
})
