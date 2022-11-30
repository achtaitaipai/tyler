import { match } from 'ts-pattern'
import type { CanvasEvent } from '../../../../types/mouseEvents'
import type { Position } from '../../../../types/position'

type Handle = (oldPosition: Position, newPosition: Position) => void
type DefaultActions = (event: CanvasEvent) => void

const useMove = (handle: Handle, defaultActions: DefaultActions) => {
	return function (event: CanvasEvent) {
		match(event)
			.with(
				{
					type: 'drag',
					data: { button: 0 },
				},
				(payload) => {
					const data = payload.data
					handle(
						data.concreteOldMousePosition,
						data.concreteMousePosition
					)
				}
			)
			.otherwise(defaultActions)
	}
}

export { useMove }
