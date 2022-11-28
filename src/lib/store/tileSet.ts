import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import tilesetUrl from '../../assets/tileset.png'
import { charsMap } from '../../settings/charMap'

const loadImage = async (src: string) =>
	new Promise<HTMLImageElement>((res) => {
		const img = new Image()
		img.src = src
		img.onload = () => res(img)
	})

export const tilesetImageAtom = atomWithStorage<HTMLImageElement>(
	'tylerimg',
	await loadImage(tilesetUrl)
)

export const tilesetImageWidthAtom = atomWithStorage('tylerimgwidth', 32)
export const tilesetImageHeightAtom = atomWithStorage('tylerimgheight', 32)

export const charMapAtom = atomWithStorage('tylercharmap', charsMap)

export const tilesetColumnsAtom = atomWithStorage('tylercols', 4)
export const tilesetRowsAtom = atomWithStorage('tylerrowss', 4)

export const tilesWidthAtom = atom(
	(get) => get(tilesetImageWidthAtom) / get(tilesetColumnsAtom)
)

export const tilesHeightAtom = atom(
	(get) => get(tilesetImageHeightAtom) / get(tilesetRowsAtom)
)

type Tile = null | [number, number, number, number]
export const getTileAtom = atom((get) => (char: string): Tile => {
	const index = get(charMapAtom).findIndex((c) => c === char)
	if (index === -1) return null
	const cols = get(tilesetColumnsAtom)
	const width = get(tilesWidthAtom)
	const height = get(tilesHeightAtom)
	const y = Math.floor(index / cols)
	const x = index % cols
	return [x * width, y * height, width, height]
})
