import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { autoTileValuesAtom } from './autotileSettings'
import { charMapAtom } from './tileSet'

export const autotileGroupAtom = atomWithStorage<number[]>(
	'tylerautotilegroup',
	Array.from({ length: 256 }, (_, i) => (i < 16 ? 1 : 0))
)

type AutoTileValuePayload = {
	index: number
	value: number
}
export const setAutotileGroupAtom = atom(
	null,
	(get, set, { index, value }: AutoTileValuePayload) => {
		const clone = [...get(autotileGroupAtom)]
		clone[index] = value
		set(autotileGroupAtom, clone)
	}
)

export const getGroupAtom = atom((get) => (char: string) => {
	const index = get(charMapAtom).findIndex((el) => el === char)
	return get(autotileGroupAtom)[index]
})

export const getTileFromGroupAndValue = atom(
	(get) => (group: number, value: number) => {
		const tiles = get(charMapAtom)
		return tiles.find((t, i) => {
			const tGroup = get(autotileGroupAtom)[i]
			const tValue = get(autoTileValuesAtom)[i]
			return group === tGroup && value === tValue
		})
	}
)
