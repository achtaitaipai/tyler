import { match, P } from 'ts-pattern'
import { CanvasEvent } from '../../../../types/mouseEvents'
import { Position } from '../../../../types/position'

type Zoom = (direction: number, mousePosition: Position) => void
type DefaultActions = (event: CanvasEvent) => void

const useUnZoom = (zoom: Zoom, defaultActions: DefaultActions) => {
	return function (event: CanvasEvent) {
		match(event)
			.with(
				{
					type: 'click',
					data: { button: 0, mousePosition: P.select() },
				},
				(mousePosition) => {
					zoom(-1, mousePosition)
				}
			)
			.otherwise(defaultActions)
	}
}

export { useUnZoom }
