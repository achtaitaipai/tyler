import { RadioGroup } from '@headlessui/react'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
	selectedTileIndexAtom,
	tilesetColumnsAtom,
	tilesetRowsAtom,
} from '../../store/tileSet'
import Tile from '../Tile'
import style from './style.module.css'

function Tileset() {
	const columns = useAtomValue(tilesetColumnsAtom)
	const rows = useAtomValue(tilesetRowsAtom)
	const [selectedTile, setSelectedTile] = useAtom(selectedTileIndexAtom)

	const tiles = useMemo(
		() =>
			Array.from({ length: columns * rows }, (_, i) => (
				<RadioGroup.Option
					value={i}
					key={
						columns.toString() +
						'-' +
						rows.toString() +
						'-' +
						i.toString()
					}
					className={style.option}
				>
					<Tile position={i} />
				</RadioGroup.Option>
			)),
		[columns, rows]
	)
	return (
		<RadioGroup
			className={style.wrapper}
			value={selectedTile}
			onChange={setSelectedTile}
			style={{
				gridTemplateColumns: `repeat(${columns},1fr)`,
			}}
		>
			{tiles}
		</RadioGroup>
	)
}

export default Tileset
