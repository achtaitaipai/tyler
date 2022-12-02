import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

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
