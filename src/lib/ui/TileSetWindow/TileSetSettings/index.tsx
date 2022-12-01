import { UploadIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import { tilesetColumnsAtom, tilesetRowsAtom } from '../../../store/tileSet'
import FileInput from '../../FileInput'
import QuantityInput from '../../QuantityInput'
import style from './style.module.css'

type TileSetSettingsProps = {
	handleUpload: (sources: string[]) => void
}

function TileSetSettings({ handleUpload }: TileSetSettingsProps) {
	const [columns, setColumns] = useAtom(tilesetColumnsAtom)
	const [rows, setRows] = useAtom(tilesetRowsAtom)
	const ref = useRef<HTMLInputElement>(null)

	return (
		<div className={style.tilesetSettings}>
			<button
				className={style.btnUpload}
				onClick={() => ref.current?.click()}
			>
				<UploadIcon />
			</button>
			<FileInput
				accept="image/png, image/jpeg"
				multiple={false}
				ref={ref}
				onUpload={(sources) => {
					handleUpload(sources)
				}}
			/>
			<QuantityInput
				label="Columns :"
				value={columns}
				onChange={setColumns}
				min={1}
			/>
			<QuantityInput
				label="Rows :"
				value={rows}
				onChange={setRows}
				min={1}
			/>
		</div>
	)
}

export default TileSetSettings
