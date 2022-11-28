import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { match } from 'ts-pattern'
import useMouseEvents from '../../hooks/useMouseEvents'
import { toolAtom } from '../../store/tool'
import { CanvasEvent } from '../../types/mouseEvents'
import { Position } from '../../types/position'
import style from './style.module.css'

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [translate, setTranslate] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [tool] = useAtom(toolAtom)

	const handleCanvas = (oldPosition: Position, newPosition: Position) => {
		const tx = newPosition.x - oldPosition.x
		const ty = newPosition.y - oldPosition.y
		console.log(tx, ty)
		setTranslate((value) => ({
			x: value.x + tx,
			y: value.y + ty,
		}))
	}

	const zoomCanvas = (direction: number, mousePosition: Position) => {
		const canvas = canvasRef.current
		if (!canvas) return
		const { width, height } = canvas.getBoundingClientRect()
		console.log(width)
		if (direction > 0) {
			const tx = mousePosition.x * width - mousePosition.x * width * 1.2
			const ty = mousePosition.y * height - mousePosition.y * height * 1.2
			setZoom((z) => z * 1.2)
			setTranslate((value) => ({
				x: value.x + tx,
				y: value.y + ty,
			}))
		} else {
			const tx = mousePosition.x * width - mousePosition.x * width * 0.8
			const ty = mousePosition.y * height - mousePosition.y * height * 0.8
			setZoom((z) => z * 0.8)
			setTranslate((value) => ({
				x: value.x + tx,
				y: value.y + ty,
			}))
		}
	}

	const handleEvent = (canvasEvent: CanvasEvent) => {
		const payload = {
			event: canvasEvent,
			tool,
		}
		match(payload)
			.with(
				{ tool: 'zoom', event: { type: 'click', data: { button: 0 } } },
				(payload) => {
					const data = payload.event.data
					zoomCanvas(1, data.mousePosition)
				}
			)
			.with(
				{ tool: 'zoom', event: { type: 'click', data: { button: 2 } } },
				(payload) => {
					const data = payload.event.data
					zoomCanvas(-1, data.mousePosition)
				}
			)
			.with({ tool: 'unzoom', event: { type: 'click' } }, (payload) => {
				const data = payload.event.data
				zoomCanvas(-1, data.mousePosition)
			})
			.with(
				{
					tool: 'handle',
					event: { type: 'drag', data: { button: 0 } },
				},
				(payload) => {
					const data = payload.event.data
					handleCanvas(
						data.concreteOldMousePosition,
						data.concreteMousePosition
					)
				}
			)
			.with({ event: { type: 'wheel' } }, (payload) => {
				const data = payload.event.data
				zoomCanvas(data.direction, data.mousePosition)
			})
			.with(
				{ event: { type: 'drag', data: { button: 1 } } },
				(payload) => {
					const data = payload.event.data
					handleCanvas(
						data.concreteOldMousePosition,
						data.concreteMousePosition
					)
				}
			)
			.otherwise(() => {
				//
			})
	}

	useMouseEvents(canvasRef, handleEvent)

	return (
		<div className={style.wrapper}>
			<canvas
				ref={canvasRef}
				className={style.canvas}
				width={150}
				height={300}
				style={{
					transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom}) `,
				}}
			/>
		</div>
	)
}

export default Canvas
