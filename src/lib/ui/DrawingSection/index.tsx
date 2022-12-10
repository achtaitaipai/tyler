import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useAtomValue, useSetAtom } from 'jotai'
import {
	gridHeightAtom,
	gridWidthAtom,
	insertColumnAtom,
	insertRowAtom,
	removeColumnAtom,
	removeRowAtom,
} from '../../store/grid'
import { historyPushAtom } from '../../store/history/index.ts'
import Btn from '../Btn'
import Canvas from '../Canvas'
import HistoryNav from '../HistoryNav'
import Tooltip from '../Tooltip'
import style from './style.module.css'

function DrawingSection() {
	const insertColumn = useSetAtom(insertColumnAtom)
	const removeColumn = useSetAtom(removeColumnAtom)
	const insertRow = useSetAtom(insertRowAtom)
	const removeRow = useSetAtom(removeRowAtom)
	const gridWidth = useAtomValue(gridWidthAtom)
	const gridHeight = useAtomValue(gridHeightAtom)
	const historyPush = useSetAtom(historyPushAtom)

	return (
		<>
			<div className={style.wrapper}>
				<div className={style.row}>
					<Tooltip
						position="Top"
						tip="insert a row"
						htmlFor="addFirstRow"
					>
						<Btn
							onClick={() => {
								historyPush()
								insertRow(0)
							}}
							type="Icon"
							id="addFirstRow"
						>
							<PlusIcon />
						</Btn>
					</Tooltip>
					<Tooltip
						tip="remove a row"
						position="Top"
						htmlFor="removeFirstRow"
					>
						<Btn
							onClick={() => {
								historyPush()
								removeRow(0)
							}}
							type="Icon"
							id="removeFirstRow"
						>
							<MinusIcon />
						</Btn>
					</Tooltip>
				</div>
				<div className={style.row}>
					<Tooltip
						tip="insert a row"
						position="Bottom"
						htmlFor="addLastRow"
					>
						<Btn
							onClick={() => {
								historyPush()
								insertRow(gridHeight)
							}}
							type="Icon"
							id="addLastRow"
						>
							<PlusIcon />
						</Btn>
					</Tooltip>
					<Tooltip
						tip="remove a row"
						position="Bottom"
						htmlFor="removeLastRow"
					>
						<Btn
							onClick={() => {
								historyPush()
								removeRow(gridHeight - 1)
							}}
							type="Icon"
							id="removeLastRow"
						>
							<MinusIcon />
						</Btn>
					</Tooltip>
				</div>
				<div className={style.column}>
					<Tooltip
						tip="insert a column"
						position="Left"
						htmlFor="insertFirstColumn"
					>
						<Btn
							onClick={() => {
								historyPush()
								insertColumn(0)
							}}
							type="Icon"
							id="insertFirstColumn"
						>
							<PlusIcon />
						</Btn>
					</Tooltip>
					<Tooltip
						tip="remove a column"
						position="Left"
						htmlFor="removeFirstColumn"
					>
						<Btn
							onClick={() => {
								historyPush()
								removeColumn(0)
							}}
							type="Icon"
							id="removeFirstColumn"
						>
							<MinusIcon />
						</Btn>
					</Tooltip>
				</div>
				<div className={style.column}>
					<Tooltip
						tip="insert a column"
						position="Right"
						htmlFor="insertLastColumn"
					>
						<Btn
							onClick={() => {
								historyPush()
								insertColumn(gridWidth)
							}}
							type="Icon"
							id="insertLastColumn"
						>
							<PlusIcon />
						</Btn>
					</Tooltip>
					<Tooltip
						tip="remove a column"
						position="Right"
						htmlFor="removeLastColumn"
					>
						<Btn
							onClick={() => {
								historyPush()
								removeColumn(gridWidth - 1)
							}}
							type="Icon"
							id="removeLastColumn"
						>
							<MinusIcon />
						</Btn>
					</Tooltip>
				</div>
				<Canvas />
			</div>
			<HistoryNav />
		</>
	)
}

export default DrawingSection
