import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeProvider from './lib/ui/ThemeProvider'
import './style/index.css'

const root = document.querySelector<HTMLElement>('#root')

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</React.StrictMode>
	)
} else {
	console.error('no root element')
}
