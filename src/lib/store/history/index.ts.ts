import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Grid } from '../../types/grid'
import { gridAtom } from '../grid'

export const historyAtom = atomWithStorage<Grid[]>('tylerHistory', [])

export const historyCursorAtom = atomWithStorage('tilerHistoryCursor', 0)

export { historyPushAtom } from './historypush'

export const undoAtom = atom(null, (get, set) => {
	const currentCursor = get(historyCursorAtom)
	if (currentCursor === 0) return
	const newCursor = currentCursor - 1
	const history = get(historyAtom)
	const newGrid = history[newCursor]
	const grid = get(gridAtom)
	if (currentCursor === history.length) set(historyAtom, [...history, grid])
	set(historyCursorAtom, newCursor)
	set(gridAtom, newGrid)
})

export const redoAtom = atom(null, (get, set) => {
	const currentCursor = get(historyCursorAtom)
	const history = get(historyAtom)
	if (currentCursor >= history.length - 1) return
	const newCursor = currentCursor + 1
	const newGrid = history[newCursor]
	set(historyCursorAtom, newCursor)
	set(gridAtom, newGrid)
})
