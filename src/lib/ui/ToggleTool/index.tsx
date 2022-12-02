import { Switch } from '@headlessui/react'
import { clsx } from 'clsx'
import { type PropsWithChildren, useState } from 'react'
import style from './style.module.css'

type ToggleProps = PropsWithChildren

function Toggle({ children }: ToggleProps) {
	const [enabled, setEnabled] = useState(false)

	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className={clsx(enabled && style.checked, style.toogle)}
		>
			{children}
		</Switch>
	)
}

export default Toggle
