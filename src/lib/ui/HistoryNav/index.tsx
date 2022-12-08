import { ResetIcon } from '@radix-ui/react-icons'
import { useSetAtom } from 'jotai'
import { redoAtom, undoAtom } from '../../store/history/index.ts'
import clsx from 'clsx'
import style from './style.module.css'

function HistoryNav() {
	const undo = useSetAtom(undoAtom)
	const redo = useSetAtom(redoAtom)
	return (
		<div className={style.wrapper}>
			<button onClick={undo} className={style.btn}>
				<ResetIcon />
			</button>
			<button onClick={redo} className={clsx(style.btn, style.flip)}>
				<ResetIcon />
			</button>
		</div>
	)
}

export default HistoryNav
