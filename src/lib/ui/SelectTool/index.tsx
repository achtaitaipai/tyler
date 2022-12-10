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
import Tooltip from '../Tooltip'
import style from './style.module.css'

export default function SelectTool() {
	const [plan, setPlan] = useAtom(toolAtom)

	return (
		<RadioGroup value={plan} onChange={setPlan} className={style.wrapper}>
			<RadioGroup.Option value="paint">
				{({ checked }) => (
					<Tooltip
						tip="paint"
						position="Bottom"
						htmlFor="paitToolpaintTool"
					>
						<Pencil1Icon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
							id="paintTool"
						/>
					</Tooltip>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="autotile">
				{({ checked }) => (
					<Tooltip
						tip="autotile"
						position="Bottom"
						htmlFor="autoTileTool"
					>
						<LightningBoltIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
							id="autoTileTool"
						/>
					</Tooltip>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="erase">
				{({ checked }) => (
					<Tooltip tip="erase" position="Bottom" htmlFor="eraseTool">
						<EraserIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
							id="eraseTool"
						/>
					</Tooltip>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="bucket">
				{({ checked }) => (
					<Tooltip
						tip="bucket"
						position="Bottom"
						htmlFor="bucketTool"
					>
						<BlendingModeIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
							id="bucketTool"
						/>
					</Tooltip>
				)}
			</RadioGroup.Option>
			{/* <RadioGroup.Option value="auto">
				{({ checked }) => (
					<Tooltip>
						<StarIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
						/>
					</Tooltip>
				)}
			</RadioGroup.Option> */}
			<RadioGroup.Option value="zoom">
				{({ checked }) => (
					<Tooltip tip="zoom" position="Bottom" htmlFor="zoomTool">
						<ZoomInIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
							id="zoomTool"
						/>
					</Tooltip>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="unzoom">
				{({ checked }) => (
					<Tooltip
						tip="unzoom"
						position="Bottom"
						htmlFor="unzoomTool"
					>
						<ZoomOutIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
							id="unzoomTool"
						/>
					</Tooltip>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="move">
				{({ checked }) => (
					<Tooltip tip="move" position="Bottom" htmlFor="moveTool">
						<HandIcon
							className={
								style.icon +
								' ' +
								(checked ? style.iconChecked : '')
							}
							width={32}
							height={32}
							id="moveTool"
						/>
					</Tooltip>
				)}
			</RadioGroup.Option>
		</RadioGroup>
	)
}
