import { match } from 'ts-pattern'
import { CanvasEvent } from '../../../../types/mouseEvents'
import { Position } from '../../../../types/position'

type Handle = (oldPosition: Position, newPosition: Position) => void
type Zoom = (direction: number, mousePosition: Position) => void
const useDefaultActions = (handle: Handle, zoom: Zoom) => {
	return function (event: CanvasEvent) {
		match(event)
			.with({ type: 'wheel' }, (event) => {
				zoom(event.data.direction, event.data.mousePosition)
			})
			.with({ type: 'drag', data: { button: 1 } }, (event) => {
				handle(
					event.data.concreteOldMousePosition,
					event.data.concreteMousePosition
				)
			})
			.otherwise(() => null)
	}
}

export { useDefaultActions }
