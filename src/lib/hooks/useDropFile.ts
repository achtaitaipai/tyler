import { useEffect, useRef } from 'react'

function useDropFileZone<T extends HTMLElement>(
	callBack: (sources: string[]) => void,
	acceptedFiles?: string[]
) {
	const ref = useRef<T>(null)
	useEffect(() => {
		const handleDrop = (e: globalThis.DragEvent) => {
			e.preventDefault()
			console.log(e.dataTransfer?.items)
			const items = e.dataTransfer?.items
			if (!items) return
			const files = [...items]
				.map((item) => {
					const file = item.getAsFile()
					if (!file) return null
					if (acceptedFiles && !acceptedFiles.includes(file.type))
						return null
					return URL.createObjectURL(file)
				})
				.filter((el) => el !== null) as string[]
			callBack(files)
		}
		function handleDrag(e: globalThis.DragEvent) {
			e.preventDefault()
		}
		ref.current?.addEventListener('drop', handleDrop)
		ref.current?.addEventListener('dragover', handleDrag)
		return () => {
			ref.current?.removeEventListener('drop', handleDrop)
			ref.current?.removeEventListener('dragover', handleDrag)
		}
	}, [ref])
	return ref
}

export default useDropFileZone
