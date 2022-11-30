import { useAtom } from 'jotai'
import { isDarkAtomPreference } from '../store/theme'
import useUpdateEffect from './updateEffect'
import useMediaQuery from './useMediaQuery'

export default function useIsDark() {
	const [isDark, setIsDark] = useAtom(isDarkAtomPreference)

	const isDarkOs = useMediaQuery('(prefers-color-scheme: dark)')

	function toggleIsDark() {
		setIsDark((pref) => (pref !== null ? !pref : !isDarkOs))
	}

	useUpdateEffect(() => {
		setIsDark(isDarkOs)
	}, [isDarkOs])

	return [isDark, toggleIsDark] as const
}
