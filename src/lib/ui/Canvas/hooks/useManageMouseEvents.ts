import { useAtomValue, useSetAtom } from 'jotai'
import { RefObject, useCallback, useState } from 'react'
import { match } from 'ts-pattern'
import {
	gridAtom,
	gridHeightAtom,
	gridWidthAtom,
	setCellAtom,
} from '../../../store/grid'
import { selectedTileCharAtom } from '../../../store/tileSet'
import { toolAtom } from '../../../store/tool'
import { CanvasEvent } from '../../../types/mouseEvents'
import { Position } from '../../../types/position'
import { useBucket } from './tools/useBucket'
import { useDefaultActions } from './tools/useDefaultActions'
import { useErase } from './tools/useErase'
import { useMove } from './tools/useMove'
import { usePaint } from './tools/usePaint'
import { useUnZoom } from './tools/useUnzoom'
import { useZoom } from './tools/useZoom'

const useManageMouseEvents = (ref: RefObject<HTMLElement>) => {
	const grid = useAtomValue(gridAtom)
	const gridWidth = useAtomValue(gridWidthAtom)
	const gridHeight = useAtomValue(gridHeightAtom)
	const setCell = useSetAtom(setCellAtom)
	const tool = useAtomValue(toolAtom)
	const currentTile = useAtomValue(selectedTileCharAtom)
	const [translate, setTranslate] = useState({ x: 0, y: 0 })
	const [scale, setScale] = useState(1)

	const handleCanvas = (oldPosition: Position, newPosition: Position) => {
		const tx = newPosition.x - oldPosition.x
		const ty = newPosition.y - oldPosition.y
		setTranslate((value) => ({
			x: value.x + tx,
			y: value.y + ty,
		}))
	}

	const gridPosition = useCallback(
		(mousePosition: Position) => {
			return {
				x: Math.floor(mousePosition.x * gridWidth),
				y: Math.floor(mousePosition.y * gridHeight),
			}
		},
		[gridWidth, gridHeight]
	)

	const zoomCanvas = (direction: number, mousePosition: Position) => {
		const element = ref.current
		if (!element) return
		const { width, height } = element.getBoundingClientRect()
		if (direction > 0) {
			const tx = mousePosition.x * width - mousePosition.x * width * 1.2
			const ty = mousePosition.y * height - mousePosition.y * height * 1.2
			setScale((z) => z * 1.2)
			setTranslate((value) => ({
				x: value.x + tx,
				y: value.y + ty,
			}))
		} else {
			const tx = mousePosition.x * width - mousePosition.x * width * 0.8
			const ty = mousePosition.y * height - mousePosition.y * height * 0.8
			setScale((z) => z * 0.8)
			setTranslate((value) => ({
				x: value.x + tx,
				y: value.y + ty,
			}))
		}
	}
	const defaultActions = useDefaultActions(handleCanvas, zoomCanvas)
	const zoom = useZoom(zoomCanvas, defaultActions)
	const unzoom = useUnZoom(zoomCanvas, defaultActions)
	const move = useMove(handleCanvas, defaultActions)
	const paint = usePaint(gridPosition, setCell, currentTile, defaultActions)
	const erase = useErase(gridPosition, setCell, defaultActions)
	const bucket = useBucket(
		grid,
		gridPosition,
		setCell,
		currentTile,
		defaultActions
	)

	const manageEvents = (event: CanvasEvent) => {
		match(tool)
			.with('move', () => move(event))
			.with('zoom', () => zoom(event))
			.with('unzoom', () => unzoom(event))
			.with('paint', () => paint(event))
			.with('erase', () => erase(event))
			.with('bucket', () => bucket(event))
			.exhaustive()
	}

	return { manageEvents, translate, zoom: scale }
}

export { useManageMouseEvents as useEventsManager }
