import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.css'

const root = document.querySelector<HTMLElement>('#root')

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
} else {
	console.error('no root element')
}
