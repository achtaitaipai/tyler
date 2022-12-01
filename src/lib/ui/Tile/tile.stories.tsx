import { useAtomValue } from 'jotai'
import Tile from '.'
import { selectedTileIndexAtom } from '../../store/tileSet'

export const story = () => {
	const tileIndex = useAtomValue(selectedTileIndexAtom)
	return (
		<div
			style={{
				width: '100px',
			}}
		>
			<Tile position={tileIndex} />
		</div>
	)
}
story.storyName = 'Tile'
