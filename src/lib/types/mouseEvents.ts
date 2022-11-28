import type { Position } from './position'

type Button = number

interface EventClick {
	button: Button
	mousePosition: Position
}

interface EventUnClick {
	mousePosition: Position
}

interface EventDrag {
	button: Button
	concreteMousePosition: Position
	concreteOldMousePosition: Position
	mousePosition: Position
	oldMousePosition: Position
}

interface EventMove {
	mousePosition: Position
	oldMousePosition: Position
}

interface EventWheel {
	mousePosition: Position
	direction: number
}

export type CanvasEvent =
	| { type: 'click'; data: EventClick }
	| { type: 'unclick'; data: EventUnClick }
	| { type: 'drag'; data: EventDrag }
	| { type: 'move'; data: EventMove }
	| { type: 'wheel'; data: EventWheel }
