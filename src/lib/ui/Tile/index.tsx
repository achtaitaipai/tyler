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
	}, [position, width])

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d')
		if (!ctx || !tile) return
		ctx.drawImage(img, ...tile, 0, 0, width, height)
	}, [canvasRef, tile])
	return (
		<div className={style.wrapper}>
			<canvas
				className={style.canvas}
				width={width}
				height={height}
				ref={canvasRef}
			/>
		</div>
	)
}

export default Tile
