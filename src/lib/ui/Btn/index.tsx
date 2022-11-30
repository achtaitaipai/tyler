import clsx from 'clsx'
import { type InputHTMLAttributes, type PropsWithChildren } from 'react'
import style from './style.module.css'

type BtnType = 'Primary' | 'Icon'

type BtnProps = PropsWithChildren<
	{
		type?: BtnType
	} & InputHTMLAttributes<HTMLButtonElement>
>

export default function Btn({ children, onClick, type = 'Primary' }: BtnProps) {
	return (
		<button
			className={clsx(style.btn, type === 'Primary' && style.primary)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
