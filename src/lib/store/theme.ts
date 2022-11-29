import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const isDarkAtom = atomWithStorage<boolean>('tylerIsDark', true)
export const toggleAtom = atom<null, boolean | undefined>(
	null,
	(get, set, update?: boolean) => set(isDarkAtom, update ?? !get(isDarkAtom))
)
