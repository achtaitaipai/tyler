import { RadioGroup } from '@headlessui/react'
import {
	BlendingModeIcon,
	EraserIcon,
	HandIcon,
	LightningBoltIcon,
	Pencil1Icon,
	ZoomInIcon,
	ZoomOutIcon,
} from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { toolAtom } from '../../store/tool'
import style from './style.module.css'

export default function SelectTool() {
	const [plan, setPlan] = useAtom(toolAtom)

	return (
		<RadioGroup value={plan} onChange={setPlan} className={style.wrapper}>
			<RadioGroup.Option value="paint">
				{({ checked }) => (
					<span>
						<Pencil1Icon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="autotile">
				{({ checked }) => (
					<span>
						<LightningBoltIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="erase">
				{({ checked }) => (
					<span>
						<EraserIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="bucket">
				{({ checked }) => (
					<span>
						<BlendingModeIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option>
			{/* <RadioGroup.Option value="auto">
				{({ checked }) => (
					<span>
						<StarIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option> */}
			<RadioGroup.Option value="zoom">
				{({ checked }) => (
					<span>
						<ZoomInIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="unzoom">
				{({ checked }) => (
					<span>
						<ZoomOutIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="move">
				{({ checked }) => (
					<span>
						<HandIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</span>
				)}
			</RadioGroup.Option>
		</RadioGroup>
	)
}
