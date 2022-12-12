import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import tilesetUrl from '../../assets/tileset.png'
import { charsMap } from '../../settings/charMap'
import { loadImage } from '../helpers/image'

export const tilesetImageAtom = atom(await loadImage(tilesetUrl))

export const tilesetImageWidthAtom = atom((get) => get(tilesetImageAtom).width)
export const tilesetImageHeightAtom = atom(
	(get) => get(tilesetImageAtom).height
)

export const charMapAtom = atomWithStorage('tylercharmap', charsMap)

const tilesetColumnsAtomBase = atomWithStorage('tylercols', 4)
const tilesetRowsAtomBase = atomWithStorage('tylerrows', 4)

export const tilesetColumnsAtom = atom(
	(get) => get(tilesetColumnsAtomBase),
	(get, set, value: number) => {
		set(tilesetColumnsAtomBase, value)
		const maxIndex = value * get(tilesetRowsAtom) - 1
		set(
			selectedTileIndexAtom,
			Math.min(get(selectedTileIndexAtom), maxIndex)
		)
	}
)

export const tilesetRowsAtom = atom(
	(get) => get(tilesetRowsAtomBase),
	(get, set, value: number) => {
		set(tilesetRowsAtomBase, value)
		const maxIndex = value * get(tilesetColumnsAtom) - 1
		set(
			selectedTileIndexAtom,
			Math.min(get(selectedTileIndexAtom), maxIndex)
		)
	}
)

export const selectedTileIndexAtom = atom(3)

export const selectedTileCharAtom = atom(
	(get) => get(charMapAtom)[get(selectedTileIndexAtom)]
)

export const tilesWidthAtom = atom(
	(get) => get(tilesetImageWidthAtom) / get(tilesetColumnsAtom)
)

export const tilesHeightAtom = atom(
	(get) => get(tilesetImageHeightAtom) / get(tilesetRowsAtom)
)

type Tile = null | [number, number, number, number]
export const getTileFromCharAtom = atom((get) => (char: string): Tile => {
	if (char === ' ') return null
	const index = get(charMapAtom).findIndex((c) => c === char)
	if (index === -1) return null
	return get(getTileFromIndexAtom)(index)
})

export const getTileFromIndexAtom = atom((get) => (index: number): Tile => {
	const cols = get(tilesetColumnsAtom)
	const width = get(tilesWidthAtom)
	const height = get(tilesHeightAtom)
	const y = Math.floor(index / cols)
	const x = index % cols
	return [x * width, y * height, width, height]
})

export const tilesetBase64Data = atom((get) => {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	if (!ctx) return
	const img = get(tilesetImageAtom)
	canvas.width = img.width
	canvas.height = img.height
	ctx.drawImage(img, 0, 0)
	return canvas.toDataURL()
})
