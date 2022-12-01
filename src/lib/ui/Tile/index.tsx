import { useAtomValue } from 'jotai'
import { useEffect, useMemo, useRef } from 'react'
import {
	getTileFromIndexAtom,
	tilesetImageAtom,
	tilesHeightAtom,
	tilesWidthAtom,
} from '../../store/tileSet'
import style from './style.module.css'

type TileProps = {
	position: number | [number, number]
}

function Tile({ position }: TileProps) {
	const width = useAtomValue(tilesWidthAtom)
	const height = useAtomValue(tilesHeightAtom)
	const getTile = useAtomValue(getTileFromIndexAtom)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const img = useAtomValue(tilesetImageAtom)
	const tile = useMemo(() => {
		const tileIndex =
			typeof position === 'number'
				? position
				: position[1] * width + position[0]
		return getTile(tileIndex)
	}, [position, width, height])

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d')
		if (!ctx || !tile) return
		ctx.clearRect(0, 0, width, height)
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				ctx.fillStyle =
					(x + y) % 2 === 0 ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 85%)'
				ctx.fillRect(x, y, 1, 1)
			}
		}
		ctx.drawImage(img, ...tile, 0, 0, width, height)
	}, [canvasRef, tile, img, width, height])
	return (
		<canvas
			className={style.canvas}
			width={width}
			height={height}
			ref={canvasRef}
		/>
	)
}

export default Tile
