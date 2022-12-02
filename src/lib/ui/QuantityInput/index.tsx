import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useState, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { clamp } from '../../helpers/math'
import style from './style.module.css'

type QuantityProps = {
	onChange?: (n: number) => void
	label?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

function QuantityInput({
	min = -Infinity,
	max = Infinity,
	value,
	onChange,
	id,
	label,
	...props
}: QuantityProps) {
	if (!value || !onChange) {
		;[value, onChange] = useState(0)
	}
	function incr(incr: number) {
		if (!onChange) return
		if (incr)
			onChange(clamp(Number(value ?? 0) + incr, Number(min), Number(max)))
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.valueAsNumber
		if (value && onChange) onChange(value)
	}
	return (
		<form className={style.form}>
			{label && (
				<label htmlFor={id} className={style.label}>
					{label}
				</label>
			)}
			<button
				type="button"
				className={style.btn}
				onClick={() => incr(-1)}
			>
				<MinusIcon />
			</button>
			<input
				type="number"
				name=""
				id=""
				value={value}
				onChange={handleChange}
				className={style.input}
				{...props}
			/>
			<button type="button" className={style.btn} onClick={() => incr(1)}>
				<PlusIcon />
			</button>
		</form>
	)
}

export default QuantityInput
