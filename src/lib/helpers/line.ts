import { Position } from '../types/position'

export function line(point0: Position, point1: Position) {
	const points: Position[] = []
	const distance = diagonalDistance(point0, point1)
	for (let step = 0; step <= distance; step++) {
		const t = distance === 0 ? 0 : step / distance
		points.push(roundPoint(lerpPoint(point0, point1, t)))
	}
	return points
}

function lerp(start: number, end: number, t: number) {
	t = Math.min(Math.max(0, t), 1)
	return start * (1 - t) + end * t
}

function lerpPoint(point0: Position, point1: Position, t: number) {
	t = Math.min(Math.max(0, t), 1)
	return {
		x: lerp(point0.x, point1.x, t),
		y: lerp(point0.y, point1.y, t),
	}
}

function roundPoint(point: Position) {
	return {
		x: Math.round(point.x),
		y: Math.round(point.y),
	}
}

function diagonalDistance(point0: Position, point1: Position) {
	const dx = point1.x - point0.x
	const dy = point1.y - point0.y
	return Math.max(Math.abs(dx), Math.abs(dy))
}
