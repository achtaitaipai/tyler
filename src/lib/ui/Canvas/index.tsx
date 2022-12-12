import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { canvasBackgroundAtom } from '../../store/canvasBackground'
import {
	getImageAtom,
	gridAtom,
	mapHeightAtom,
	mapWidthAtom,
} from '../../store/grid'
import { useEventsManager } from './hooks/useManageMouseEvents'
import useMouseEvents from './hooks/useMouseEvents'
import style from './style.module.css'

function Canvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const width = useAtomValue(mapWidthAtom)
	const height = useAtomValue(mapHeightAtom)
	const image = useAtomValue(getImageAtom)
	const canvasBackground = useAtomValue(canvasBackgroundAtom)

	const { manageEvents, translate, zoom } = useEventsManager(canvasRef)

	useMouseEvents(canvasRef, manageEvents)

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d')
		if (!ctx) return
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				ctx.fillStyle =
					(x + y) % 2 === 0 ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 85%)'
				ctx.fillRect(x, y, 1, 1)
			}
		}
		ctx.fillStyle = canvasBackground
		ctx.fillRect(0, 0, width, height)
		if (image) ctx.drawImage(image, 0, 0)
	}, [canvasRef, image, canvasBackground])

	return (
		<div className={style.wrapper}>
			<canvas
				ref={canvasRef}
				className={style.canvas}
				width={width}
				height={height}
				style={{
					width: width > height ? '90%' : 'auto',
					height: width > height ? 'auto' : '90%',
					transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom}) `,
				}}
			/>
		</div>
	)
}

export default Canvas
