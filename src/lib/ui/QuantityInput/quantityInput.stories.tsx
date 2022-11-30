import { useState } from 'react'
import QuantityInput from '.'

export const story = () => {
	const [val, setVal] = useState(0)
	return <QuantityInput value={val} onChange={setVal} />
}
story.storyName = 'Input Quantity'
