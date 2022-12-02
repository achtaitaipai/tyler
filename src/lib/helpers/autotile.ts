export function autotileValueFromBool(bools: boolean[]) {
	const bin = bools.map((b) => (b ? 1 : 0))
	return toNum(bin)
}

export function boolsFromAutoTileValue(value: number) {
	const bin = toBin(value)
	return bin.map((b) => b === 1)
}

export function toBin(value: number, length = 4) {
	const placeHolder = Array.from({ length }, () => '0').join('')
	const bin = value.toString(2)
	const str = placeHolder.slice(0, length - bin.length) + bin
	return str.split('').map(Number)
}

export function toNum(value: number[]) {
	return value.reduce((res, currentValue, i) => {
		const exp = value.length - i - 1
		return currentValue === 0 ? res : res + Math.pow(2, exp)
	}, 0)
}
