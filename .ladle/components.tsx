import type { GlobalProvider } from '@ladle/react'
import React from 'react'
import ThemeProvider from '../src/lib/ui/ThemeProvider'
import Toasts from '../src/lib/ui/Toasts'
import 'react-toastify/dist/ReactToastify.css'
import '../src/style/index.css'

export const Provider: GlobalProvider = ({ children, globalState }) => {
	return (
		<ThemeProvider>
			<Toasts />
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
