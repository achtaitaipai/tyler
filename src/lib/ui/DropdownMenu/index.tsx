import { Menu } from '@headlessui/react'
import {
	DownloadIcon,
	HamburgerMenuIcon,
	ImageIcon,
	SizeIcon,
	TrashIcon,
	UploadIcon,
} from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { type ChangeEvent, useRef } from 'react'
import { canvasBackgroundAtom } from '../../store/canvasBackground'
import {
	canvasScaleAtom,
	canvasTranslateAtom,
} from '../../store/canvasTransform'
import { getFileAtom, loadFileAtom } from '../../store/file'
import { getImageAtom, gridAtom } from '../../store/grid'
import { historyPushAtom } from '../../store/history/index.ts'
import ColorInput from '../ColorInput'
import style from './style.module.css'
import { toast } from 'react-toastify'
import { fileSchema } from '../../types/fileSchema'

export default function DropdownMenu() {
	const setGrid = useSetAtom(gridAtom)
	const historyPush = useSetAtom(historyPushAtom)
	const setTranslate = useSetAtom(canvasTranslateAtom)
	const setScale = useSetAtom(canvasScaleAtom)
	const image = useAtomValue(getImageAtom)
	const json = useAtomValue(getFileAtom)
	const [background, setBackground] = useAtom(canvasBackgroundAtom)
	const fileRef = useRef<HTMLInputElement>(null)
	const loadFile = useSetAtom(loadFileAtom)

	function fitToScreen() {
		setScale(1)
		setTranslate({ x: 0, y: 0 })
	}

	function clearCanvas() {
		historyPush()
		setGrid((grid) => grid.map((line) => ' '.repeat(line.length)))
	}

	function notifyError() {
		toast.error('Bad file format', {
			position: 'top-center',
			autoClose: 1000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		})
	}

	function downloadImage() {
		if (!image) return
		const data = image.toDataURL()
		const link = document.createElement('a')
		link.href = data
		link.download = 'tilerMap'
		link.click()
		link.remove()
	}

	function handleFile(e: ChangeEvent<HTMLInputElement>) {
		const files = e.currentTarget.files
		if (!files) return
		const reader = new FileReader()
		reader.addEventListener('load', () => {
			const src = reader.result
			e.target.value = ''
			if (typeof src === 'string') {
				try {
					const file = fileSchema.parse(JSON.parse(src))
					historyPush()
					void loadFile(file)
				} catch (error) {
					notifyError()
				}
			}
		})
		reader.readAsText(files[0])
	}

	function saveFile() {
		if (!json) return
		const link = document.createElement('a')
		link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(json)
		link.download = 'tilerMap.json'
		link.click()
		link.remove()
	}

	return (
		<div className={style.menu}>
			<input
				type="file"
				ref={fileRef}
				accept={'.json'}
				onChange={handleFile}
				style={{
					display: 'none',
				}}
			/>
			<Menu>
				<Menu.Button className={style.menuBtn}>
					<HamburgerMenuIcon className={style.icon} />
				</Menu.Button>
				<Menu.Items className={style.content}>
					<Menu.Item>
						{({ active }) => (
							<button
								className={clsx(
									active && style.activeItem,
									style.item
								)}
								onClick={() => fileRef.current?.click()}
							>
								<UploadIcon
									className={style.icon}
									width={20}
									height={20}
								/>
								Open
							</button>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								className={clsx(
									active && style.activeItem,
									style.item
								)}
								onClick={saveFile}
							>
								<DownloadIcon
									className={style.icon}
									width={20}
									height={20}
								/>
								Save
							</button>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								className={clsx(
									active && style.activeItem,
									style.item
								)}
								onClick={downloadImage}
							>
								<ImageIcon
									className={style.icon}
									width={20}
									height={20}
								/>
								Export Image
							</button>
						)}
					</Menu.Item>
					<hr />
					<Menu.Item>
						{({ active }) => (
							<button
								className={clsx(
									active && style.active,
									style.item
								)}
								onClick={clearCanvas}
							>
								<TrashIcon
									className={style.icon}
									width={20}
									height={20}
								/>
								Clear the canvas
							</button>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								className={clsx(
									active && style.active,
									style.item
								)}
								onClick={fitToScreen}
							>
								<SizeIcon
									className={style.icon}
									width={20}
									height={20}
								/>
								Fit to Screen
							</button>
						)}
					</Menu.Item>
					<hr />
					<div className={style.item}>
						<ColorInput hex={background} setHex={setBackground} />
						Canvas Background
					</div>
				</Menu.Items>
			</Menu>
		</div>
	)
}
