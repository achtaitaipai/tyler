import {
	BorderBottomIcon,
	BorderLeftIcon,
	BorderRightIcon,
	BorderTopIcon,
} from '@radix-ui/react-icons'
import { useAtomValue, useSetAtom } from 'jotai'
import { useMemo } from 'react'
import {
	autotileValueFromBool,
	boolsFromAutoTileValue,
} from '../../../helpers/autotile'
import {
	autoTileValueAtom,
	autoTileValuesAtom,
} from '../../../store/autotileSettings'
import {
	autotileGroupAtom,
	setAutotileGroupAtom,
} from '../../../store/autotileGroup'
import { selectedTileIndexAtom } from '../../../store/tileSet'
import Select from '../../Select'
import Tile from '../../Tile'
import Toggle from '../../ToggleTool'
import style from './style.module.css'
import Tooltip from '../../Tooltip'

function TileSettings() {
	const selectedTile = useAtomValue(selectedTileIndexAtom)
	const autoTilesValues = useAtomValue(autoTileValuesAtom)
	const setAutoTileValue = useSetAtom(autoTileValueAtom)

	const autoTileGroup = useAtomValue(autotileGroupAtom)
	const setGroup = useSetAtom(setAutotileGroupAtom)

	const bools = useMemo(() => {
		const val = boolsFromAutoTileValue(autoTilesValues[selectedTile])
		return val
	}, [selectedTile, autoTilesValues])

	const group = useMemo(() => {
		return autoTileGroup[selectedTile].toString()
	}, [autoTileGroup, selectedTile])

	function onChange(index: number, value: boolean) {
		const clone = [...bools]
		clone[index] = value
		const autoTileValue = autotileValueFromBool(clone)
		setAutoTileValue({ index: selectedTile, value: autoTileValue })
	}
	return (
		<div className={style.wrapper}>
			<div className={style.tileWrapper}>
				<Tile position={selectedTile} />
			</div>
			<div className={style.settings}>
				<div className={style.toggles}>
					<Tooltip tip="top" position="Top" htmlFor="topToogle">
						<Toggle
							enabled={bools[3]}
							setEnabled={(value) => onChange(3, value)}
						>
							<BorderTopIcon id="topToogle" />
						</Toggle>
					</Tooltip>

					<Tooltip tip="right" position="Top" htmlFor="rightToogle">
						<Toggle
							enabled={bools[2]}
							setEnabled={(value) => onChange(2, value)}
						>
							<BorderRightIcon id="rightToogle" />
						</Toggle>
					</Tooltip>
					<Tooltip tip="bottom" position="Top" htmlFor="bottomToogle">
						<Toggle
							enabled={bools[1]}
							setEnabled={(value) => onChange(1, value)}
						>
							<BorderBottomIcon id="bottomToogle" />
						</Toggle>
					</Tooltip>
					<Tooltip tip="left" position="Top" htmlFor="leftToogle">
						<Toggle
							enabled={bools[0]}
							setEnabled={(value) => onChange(0, value)}
						>
							<BorderLeftIcon id="leftToogle" />
						</Toggle>
					</Tooltip>
				</div>
				<label className={style.label}>
					Group :{' '}
					<Tooltip
						tip="autotile group"
						position="Top"
						htmlFor="autotileGroupSelect"
					>
						<Select
							options={[
								'0',
								'1',
								'2',
								'3',
								'4',
								'5',
								'6',
								'7',
								'8',
								'9',
							]}
							selected={group}
							onChange={(selected) => {
								setGroup({
									index: selectedTile,
									value: Number(selected),
								})
							}}
							id="autotileGroupSelect"
						/>
					</Tooltip>
				</label>
			</div>
		</div>
	)
}

export default TileSettings
