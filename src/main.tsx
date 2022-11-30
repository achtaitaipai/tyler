import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ThemeProvider from './lib/ui/ThemeProvider'
import './style/index.css'

const root = document.querySelector<HTMLElement>('#root')

if (root) {
	createRoot(root).render(
		<StrictMode>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</StrictMode>
	)
} else {
	console.error('no root element')
}
