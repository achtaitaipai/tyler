import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import {
	gridHeightAtom,
	gridWidthAtom,
	insertColumnAtom,
	insertRowAtom,
	removeColumnAtom,
	removeRowAtom,
} from '../../store/grid'
import Btn from '../Btn'
import Canvas from '../Canvas'
import Tooltip from '../Tooltip'
import style from './style.module.css'

function DrawingSection() {
	const [, insertColumn] = useAtom(insertColumnAtom)
	const [, removeColumn] = useAtom(removeColumnAtom)
	const [, insertRow] = useAtom(insertRowAtom)
	const [, removeRow] = useAtom(removeRowAtom)
	const [gridWidth] = useAtom(gridWidthAtom)
	const [gridHeight] = useAtom(gridHeightAtom)
	return (
		<div className={style.wrapper}>
			<div className={style.row}>
				<Tooltip position="Top" tip="insert a row">
					<Btn onClick={() => insertRow(0)} type="Icon">
						<PlusIcon />
					</Btn>
				</Tooltip>
				<Tooltip tip="remove a row" position="Top">
					<Btn onClick={() => removeRow(0)} type="Icon">
						<MinusIcon />
					</Btn>
				</Tooltip>
			</div>
			<div className={style.row}>
				<Tooltip tip="insert a row" position="Bottom">
					<Btn onClick={() => insertRow(gridHeight)} type="Icon">
						<PlusIcon />
					</Btn>
				</Tooltip>
				<Tooltip tip="remove a row" position="Bottom">
					<Btn onClick={() => removeRow(gridHeight - 1)} type="Icon">
						<MinusIcon />
					</Btn>
				</Tooltip>
			</div>
			<div className={style.column}>
				<Tooltip tip="insert a column" position="Left">
					<Btn onClick={() => insertColumn(0)} type="Icon">
						<PlusIcon />
					</Btn>
				</Tooltip>
				<Tooltip tip="remove a column" position="Left">
					<Btn onClick={() => removeColumn(0)} type="Icon">
						<MinusIcon />
					</Btn>
				</Tooltip>
			</div>
			<div className={style.column}>
				<Tooltip tip="insert a column" position="Right">
					<Btn onClick={() => insertColumn(gridWidth)} type="Icon">
						<PlusIcon />
					</Btn>
				</Tooltip>
				<Tooltip tip="remove a column" position="Right">
					<Btn
						onClick={() => removeColumn(gridWidth - 1)}
						type="Icon"
					>
						<MinusIcon />
					</Btn>
				</Tooltip>
			</div>
			<Canvas />
		</div>
	)
}

export default DrawingSection
