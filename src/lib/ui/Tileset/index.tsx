import { useAtom } from 'jotai'
import { tilesetImageAtom } from '../../store/tileSet'

const Tileset = () => {
	const [tileSetImg] = useAtom(tilesetImageAtom)
	return (
		<>
			<img src={tileSetImg.src} />
		</>
	)
}

export default Tileset
