import Tile from '.'

export const story = () => (
	<div
		style={{
			width: '100px',
		}}
	>
		<Tile position={[4, 1]} />
	</div>
)
story.storyName = 'Tile'
