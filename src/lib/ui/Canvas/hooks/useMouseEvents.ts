import { RefObject, useEffect, useState } from 'react'
import { CanvasEvent } from '../../../types/mouseEvents'

const useListenMouseEvents = (
	ref: RefObject<HTMLElement>,
	callback: (e: CanvasEvent) => void
) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [concreteMousePosition, setConcreteMousePosition] = useState({
		x: 0,
		y: 0,
	})
	const [button, setButton] = useState<number | null>(null)
	useEffect(() => {
		const handleMove = (e: PointerEvent) => {
			const element = ref.current
			if (!element) return
			const rect = element.getBoundingClientRect()
			const { clientX, clientY } = e
			const mouseX = (clientX - rect.left) / rect.width
			const mouseY = (clientY - rect.top) / rect.height

			const event: CanvasEvent =
				button !== null
					? {
							type: 'drag',
							data: {
								button,
								concreteMousePosition: {
									x: clientX,
									y: clientY,
								},
								concreteOldMousePosition: concreteMousePosition,
								oldMousePosition: mousePosition,
								mousePosition: {
									x: mouseX,
									y: mouseY,
								},
							},
					  }
					: {
							type: 'move',
							data: {
								oldMousePosition: mousePosition,
								mousePosition: {
									x: mouseX,
									y: mouseY,
								},
							},
					  }
			callback(event)
			setMousePosition({
				x: mouseX,
				y: mouseY,
			})
			setConcreteMousePosition({
				x: e.clientX,
				y: e.clientY,
			})
		}
		const handleClick = (e: PointerEvent) => {
			e.preventDefault()
			setButton(e.button)
			const event: CanvasEvent = {
				type: 'click',
				data: {
					button: e.button,
					mousePosition,
				},
			}
			callback(event)
		}
		const handleUnclick = () => {
			setButton(null)
			const event: CanvasEvent = {
				type: 'unclick',
				data: {
					mousePosition,
				},
			}
			callback(event)
		}
		const handleWheel = (e: WheelEvent) => {
			const event: CanvasEvent = {
				type: 'wheel',
				data: {
					direction: -e.deltaY,
					mousePosition,
				},
			}
			callback(event)
		}
		const handleContextMenu = (e: MouseEvent) => {
			e.preventDefault()
		}

		document.addEventListener('pointermove', handleMove)
		document.addEventListener('pointerdown', handleClick)
		document.addEventListener('pointerup', handleUnclick)
		ref.current?.addEventListener('contextmenu', handleContextMenu)
		ref.current?.addEventListener('wheel', handleWheel)

		return () => {
			document.removeEventListener('pointermove', handleMove)
			document.removeEventListener('pointerdown', handleClick)
			document.removeEventListener('pointerup', handleUnclick)
			ref.current?.removeEventListener('contextmenu', handleContextMenu)
			ref.current?.removeEventListener('wheel', handleWheel)
		}
	}, [ref, mousePosition, setMousePosition])
}

export default useListenMouseEvents
