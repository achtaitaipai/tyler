import type { ReactNode } from 'react'
import useIsDark from '../../hooks/useIsDark'
import style from './style.module.css'

type ThemeProviderProps = {
	children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
	const [isDark] = useIsDark()
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
