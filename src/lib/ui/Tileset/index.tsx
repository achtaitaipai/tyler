import { useAtom } from 'jotai'
import { tilesetImageAtom } from '../../store/tileSet'

function Tileset() {
	const [tileSetImg] = useAtom(tilesetImageAtom)
	return (
		<>
			<img src={tileSetImg.src} />
		</>
	)
}

export default Tileset
