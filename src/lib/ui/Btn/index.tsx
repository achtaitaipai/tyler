import { type ReactNode } from 'react'
import style from './style.module.css'
import clsx from 'clsx'

type BtnType = 'Primary' | 'Icon'

type BtnProps = {
	children: ReactNode
	onClick?: () => void
	type?: BtnType
}

export default function Btn({ children, onClick, type = 'Primary' }: BtnProps) {
	const handleClick = () => {
		if (onClick) onClick()
	}
	return (
		<button
			className={clsx(style.btn, type === 'Primary' && style.primary)}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}
