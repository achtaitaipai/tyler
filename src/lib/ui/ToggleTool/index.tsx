import { Switch } from '@headlessui/react'
import { clsx } from 'clsx'
import { type PropsWithChildren } from 'react'
import style from './style.module.css'

type ToggleProps = PropsWithChildren<{
	enabled: boolean
	setEnabled: (value: boolean) => void
}>

function Toggle({ enabled, setEnabled, children }: ToggleProps) {
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
