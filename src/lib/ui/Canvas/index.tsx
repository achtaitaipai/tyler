import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { useEventsManager } from './hooks/useManageMouseEvents'
import useMouseEvents from './hooks/useMouseEvents'
import { getCellsAtom, mapHeightAtom, mapWidthAtom } from '../../store/grid'
import style from './style.module.css'

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [width] = useAtom(mapWidthAtom)
	const [height] = useAtom(mapHeightAtom)
	const [getCells] = useAtom(getCellsAtom)

	const { manageEvents, translate, zoom } = useEventsManager(canvasRef)

	useMouseEvents(canvasRef, manageEvents)

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d')
		if (!ctx) return
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		getCells.forEach((tile) => {
			if (tile !== null) ctx.drawImage(...tile)
		})
	}, [canvasRef, getCells])

	return (
		<div className={style.wrapper}>
			<canvas
				ref={canvasRef}
				className={style.canvas}
				width={width}
				height={height}
				style={{
					width: width > height ? '100%' : 'auto',
					height: width > height ? 'auto' : '100%',
					transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom}) `,
				}}
			/>
		</div>
	)
}

export default Canvas
