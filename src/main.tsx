import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ThemeProvider from './lib/ui/ThemeProvider'
import './style/index.css'
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'

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
