import { useSetAtom } from 'jotai'
import { loadImage } from '../../helpers/image'
import useDropFileZone from '../../hooks/useDropFile'
import { tilesetImageAtom } from '../../store/tileSet'
import Tileset from '../Tileset'
import style from './style.module.css'
import TileSetSettings from './TileSetSettings'
import TileSettings from './TileSettings'

function TileSetwindow() {
	const setTilesetImg = useSetAtom(tilesetImageAtom)

	async function handleUpload(sources: string[]) {
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
				<TileSettings />
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
