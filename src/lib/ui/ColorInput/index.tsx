import { Popover } from '@headlessui/react'
import Chrome from '@uiw/react-color-chrome'
import type { Dispatch, SetStateAction } from 'react'

import style from './style.module.css'

type Props = {
	hex: string
	setHex: Dispatch<SetStateAction<string>>
}

export default function ColorInput({ hex, setHex }: Props) {
	return (
		<Popover className={style.wrapper}>
			<Popover.Button
				className={style.button}
				style={{ backgroundColor: hex }}
				id="test"
			/>
			<Popover.Panel className={style.inputWrapper}>
				<Chrome
					color={hex}
					onChange={(color) => {
						setHex(color.hexa)
					}}
				/>
			</Popover.Panel>
		</Popover>
	)
}
