import { useState } from 'react'
import ColorInput from '.'

export const story = () => {
	const [hex, setHex] = useState('#ff0000')
	return <ColorInput hex={hex} setHex={setHex} />
}

story.storyName = 'Color Input'
