import { ResetIcon } from '@radix-ui/react-icons'
import { useSetAtom } from 'jotai'
import { redoAtom, undoAtom } from '../../store/history/index.ts'
import { clsx } from 'clsx'
import style from './style.module.css'
import Tooltip from '../Tooltip'

function HistoryNav() {
	const undo = useSetAtom(undoAtom)
	const redo = useSetAtom(redoAtom)
	return (
		<div className={style.wrapper}>
			<Tooltip tip="undo" position="Bottom" htmlFor="undoButton">
				<button onClick={undo} className={style.btn} id="undoButton">
					<ResetIcon />
				</button>
			</Tooltip>
			<Tooltip tip="redo" position="Bottom" htmlFor="redoButton">
				<button
					onClick={redo}
					className={clsx(style.btn, style.flip)}
					id="redoButton"
				>
					<ResetIcon />
				</button>
			</Tooltip>
		</div>
	)
}

export default HistoryNav
