export const loadImage = async (src: string) =>
	new Promise<HTMLImageElement>((res) => {
		const img = new Image()
		img.src = src
		img.onload = () => res(img)
	})
