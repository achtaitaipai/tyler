//https://usehooks-ts.com/react-hook/use-update-effect
import {
	useEffect,
	useRef,
	type DependencyList,
	type EffectCallback,
} from 'react'

function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
	const isFirst = useRef(true)

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false
		} else {
			return effect()
		}
	}, deps)
}

export default useUpdateEffect
