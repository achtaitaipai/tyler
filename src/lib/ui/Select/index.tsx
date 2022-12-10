import { Listbox } from '@headlessui/react'
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'
import style from './style.module.css'

type Option = string

type SelectProps = {
	options: Option[]
	selected: string
	onChange: (str: string) => void
	id?: string
}

function Select({ options, selected, onChange, id }: SelectProps) {
	return (
		<div className={style.wrapper} id={id}>
			<Listbox value={selected} onChange={onChange}>
				<Listbox.Button className={style.btn}>
					<span className={style.btnContent}>{selected}</span>
					<span className={style.closeIcon}>
						<CaretUpIcon />
					</span>
					<span className={style.openIcon}>
						<CaretDownIcon />
					</span>
				</Listbox.Button>
				<Listbox.Options className={style.options}>
					{options.map((option) => (
						<Listbox.Option
							key={option}
							value={option}
							className={style.option}
						>
							{option}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox>
		</div>
	)
}

export default Select
