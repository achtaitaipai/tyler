import type { GlobalProvider } from '@ladle/react'
import React from 'react'
import '../src/style/index.css'

export const Provider: GlobalProvider = ({ children, globalState }) => (
	<>{children}</>
)
