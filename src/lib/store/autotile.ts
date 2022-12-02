import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const autoTileValuesAtom = atomWithStorage(
	'tylerAutotileValues',
	Array.from({ length: 256 }, (_, i) => i % 16)
)

type AutoTileValuePayload = {
	index: number
	value: number
}

export const autoTileValueAtom = atom(
	(get) => (index: number) => get(autoTileValuesAtom)[index],
	(get, set, { index, value }: AutoTileValuePayload) => {
		const clone = [...get(autoTileValuesAtom)]
		clone[index] = value
		set(autoTileValuesAtom, clone)
	}
)
