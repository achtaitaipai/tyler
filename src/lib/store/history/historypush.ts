import { atom } from 'jotai'
import { gridAtom } from '../grid'
import { historyCursorAtom, historyAtom } from './index.ts'

const lastTimeoutAtom = atom<ReturnType<typeof setTimeout> | undefined>(
	undefined
)
const isDebouncingAtom = atom(false)

export const historyPushAtom = atom(null, (get, set) => {
	const grid = [...get(gridAtom)]
	const currentCursor = get(historyCursorAtom)
	const currentHistory = get(historyAtom)
	if (grid.join('') === currentHistory[currentCursor - 1]?.join('')) return

	set(isDebouncingAtom, true)
	const add = () => {
		const newHistory =
			currentCursor === currentHistory.length
				? [...currentHistory, grid]
				: currentHistory.slice(0, currentCursor + 1)
		if (
			newHistory.length > 1 &&
			newHistory[newHistory.length - 1].join('') ===
				[...get(gridAtom)].join('')
		)
			return
		const lastInterval = get(lastTimeoutAtom)
		if (lastInterval) clearInterval(lastInterval)
		set(historyAtom, newHistory)
		set(historyCursorAtom, newHistory.length)
		set(isDebouncingAtom, false)
	}

	if (history.length === 0) add()
	else set(lastTimeoutAtom, setTimeout(add, 500))
})
