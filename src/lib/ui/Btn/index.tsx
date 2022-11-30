import { type ReactNode } from 'react'
import style from './style.module.css'

type BtnProps = {
	children: ReactNode
	onClick?: () => void
}

export default function Btn({ children, onClick }: BtnProps) {
	const handleClick = () => {
		if (onClick) onClick()
	}
	return (
		<button
			className={style.primary + ' ' + style.btn}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}
