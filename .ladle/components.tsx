import type { GlobalProvider } from '@ladle/react'
import React from 'react'
import ThemeProvider from '../src/lib/ui/ThemeProvider'
import '../src/style/index.css'

export const Provider: GlobalProvider = ({ children, globalState }) => {
	return (
		<ThemeProvider>
			<div
				style={{
					padding: '2rem',
				}}
			>
				{children}
			</div>
		</ThemeProvider>
	)
}
