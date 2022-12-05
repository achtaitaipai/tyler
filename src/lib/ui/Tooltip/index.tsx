import { type PropsWithChildren } from 'react'
import { clsx } from 'clsx'
import style from './style.module.css'

type Position = 'Left' | 'Top' | 'Bottom' | 'Right'

type TooltipProps = PropsWithChildren<{
	tip: string
	position?: Position
}>

function Tooltip({ children, tip, position = 'Right' }: TooltipProps) {
	return (
		<div className={style.wrapper}>
			{children}
			<span
				className={clsx(
					style.tip,
					position === 'Bottom' && style.bottom,
					position === 'Top' && style.top,
					position === 'Right' && style.right,
					position === 'Left' && style.left
				)}
			>
				{tip}
			</span>
		</div>
	)
}

export default Tooltip
