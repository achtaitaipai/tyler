import { useState } from 'react'
import Select from '.'

const options = [
	'Coucou les loups',
	'Salut',
	'Wesh',
	'Yo',
	'Hey',
	'Hello',
	'Quentin',
	'Charles',
	'Lampe',
	'Ordi',
	'Il était une fois un truc',
	'',
]

export const story = () => {
	const [selected, setSelected] = useState('hey')
	return (
		<div
			style={{
				width: '150px',
			}}
		>
			<Select
				options={options}
				onChange={setSelected}
				selected={selected}
			/>
		</div>
	)
}
story.storyName = 'Select'
