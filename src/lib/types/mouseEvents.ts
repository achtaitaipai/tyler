import type { Position } from './position'

type Button = number

type EventClick = {
	button: Button
	mousePosition: Position
}

type EventUnClick = {
	mousePosition: Position
}

type EventDrag = {
	button: Button
	concreteMousePosition: Position
	concreteOldMousePosition: Position
	mousePosition: Position
	oldMousePosition: Position
}

type EventMove = {
	mousePosition: Position
	oldMousePosition: Position
}

type EventWheel = {
	mousePosition: Position
	direction: number
}

export type CanvasEvent =
	| { type: 'click'; data: EventClick }
	| { type: 'unclick'; data: EventUnClick }
	| { type: 'drag'; data: EventDrag }
	| { type: 'move'; data: EventMove }
	| { type: 'wheel'; data: EventWheel }
