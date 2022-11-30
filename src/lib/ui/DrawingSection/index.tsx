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
				<Btn onClick={() => insertRow(0)}>
					<PlusIcon />
				</Btn>
				<Btn onClick={() => removeRow(0)}>
					<MinusIcon />
				</Btn>
			</div>
			<div className={style.row}>
				<Btn onClick={() => insertRow(gridHeight)}>
					<PlusIcon />
				</Btn>
				<Btn onClick={() => removeRow(gridHeight - 1)}>
					<MinusIcon />
				</Btn>
			</div>
			<div className={style.column}>
				<Btn onClick={() => insertColumn(0)}>
					<PlusIcon />
				</Btn>
				<Btn onClick={() => removeColumn(0)}>
					<MinusIcon />
				</Btn>
			</div>
			<div className={style.column}>
				<Btn onClick={() => insertColumn(gridWidth)}>
					<PlusIcon />
				</Btn>
				<Btn onClick={() => removeColumn(gridWidth - 1)}>
					<MinusIcon />
				</Btn>
			</div>
			<Canvas />
		</div>
	)
}

export default DrawingSection
