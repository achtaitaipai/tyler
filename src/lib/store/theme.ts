import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const isDarkAtomPreference = atomWithStorage<boolean | null>(
	'tylerIsDark',
	null
)
export const toggleAtom = atom<null, boolean | undefined>(
	null,
	(get, set, update?: boolean) =>
		set(isDarkAtomPreference, update ?? !get(isDarkAtomPreference))
)
