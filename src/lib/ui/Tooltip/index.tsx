import { type PropsWithChildren } from 'react'
import { clsx } from 'clsx'
import style from './style.module.css'

type Position = 'Left' | 'Top' | 'Bottom' | 'Right'

type TooltipProps = PropsWithChildren<{
	tip: string
	position?: Position
	htmlFor?: string
}>

function Tooltip({ children, tip, position = 'Right', htmlFor }: TooltipProps) {
	return (
		<div className={style.wrapper}>
			{children}
			<label
				className={clsx(
					style.tip,
					position === 'Bottom' && style.bottom,
					position === 'Top' && style.top,
					position === 'Right' && style.right,
					position === 'Left' && style.left
				)}
				htmlFor={htmlFor}
			>
				{tip}
			</label>
		</div>
	)
}

export default Tooltip
