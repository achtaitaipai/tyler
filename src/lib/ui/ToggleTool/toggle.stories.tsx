import { BorderLeftIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import Toggle from '.'

export const story = () => {
	const [enabled, setEnabled] = useState(false)
	return (
		<Toggle enabled={enabled} setEnabled={setEnabled}>
			{' '}
			<BorderLeftIcon />
		</Toggle>
	)
}
story.storyName = 'toggle tool'
