import { useAtomValue, useSetAtom } from 'jotai'
import { loadImage } from '../../helpers/image'
import useDropFileZone from '../../hooks/useDropFile'
import { selectedTileIndexAtom, tilesetImageAtom } from '../../store/tileSet'
import Tile from '../Tile'
import Tileset from '../Tileset'
import style from './style.module.css'
import TileSetSettings from './TileSetSettings'

function TileSetwindow() {
	const selectedTile = useAtomValue(selectedTileIndexAtom)
	const setTilesetImg = useSetAtom(tilesetImageAtom)

	async function handleUpload(sources: string[]) {
		console.log(sources)
		const [imgSrc] = sources
		if (!imgSrc) return
		const img = await loadImage(imgSrc)
		setTilesetImg(img)
	}

	const ref = useDropFileZone<HTMLDivElement>(
		(sources) => void handleUpload(sources)
	)

	return (
		<div className={style.wrapper}>
			<div className={style.tileSettings}>
				<div className={style.selectedTile}>
					<Tile position={selectedTile} />
				</div>
			</div>
			<div className={style.tileset} ref={ref}>
				<Tileset />
			</div>
			<TileSetSettings
				handleUpload={(sources) => void handleUpload(sources)}
			/>
		</div>
	)
}

export default TileSetwindow
