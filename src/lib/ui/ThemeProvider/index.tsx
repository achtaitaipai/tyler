import { useAtom } from 'jotai'
import style from './style.module.css'
import type { ReactNode } from 'react'
import { isDarkAtom } from '../../store/theme'

type ThemeProviderProps = {
	children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
	const [isDark] = useAtom(isDarkAtom)
	return (
		<div
			data-theme={isDark ? 'dark' : 'light'}
			className={style.themeProvider}
		>
			{children}
		</div>
	)
}

export default ThemeProvider
