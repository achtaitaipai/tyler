import { useAtom } from 'jotai'
import React from 'react'
import { isDarkAtom } from '../../store/theme'
import style from './style.module.css'

interface ThemeProviderProps {
	children: React.ReactNode
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
