import type { PropsWithChildren } from 'react'
import useIsDark from '../../hooks/useIsDark'
import style from './style.module.css'

function ThemeProvider({ children }: PropsWithChildren) {
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
