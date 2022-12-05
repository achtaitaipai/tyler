import Tooltip from '.'
import Btn from '../Btn'

export const story = () => (
	<div
		style={{
			display: 'grid',
			gap: '5rem',
			padding: '2rem',
		}}
	>
		<Tooltip tip="Ceci est un super tip" position="Bottom">
			<Btn>Clique</Btn>
		</Tooltip>
		<Tooltip tip="Ceci est un super tip" position="Left">
			<Btn>Clique</Btn>
		</Tooltip>
		<Tooltip tip="Ceci est un super tip" position="Right">
			<Btn>Clique</Btn>
		</Tooltip>
		<Tooltip tip="Ceci est un super tip" position="Top">
			<Btn>Clique</Btn>
		</Tooltip>
	</div>
)
