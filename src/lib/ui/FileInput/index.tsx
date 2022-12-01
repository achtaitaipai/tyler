import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from 'react'

type FileInputProps = {
	onUpload?: (src: string[]) => void
} & InputHTMLAttributes<HTMLInputElement>

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
	({ onUpload, ...props }, ref) => {
		function handleChange(e: ChangeEvent<HTMLInputElement>) {
			if (!onUpload) return
			const files = e.target.files
			console.log(files)
			if (files) {
				const sources = [...files].map((file) =>
					URL.createObjectURL(file)
				)
				onUpload(sources)
			}
		}
		return (
			<input
				type="file"
				onChange={handleChange}
				ref={ref}
				{...props}
				style={{ display: 'none' }}
			/>
		)
	}
)
FileInput.displayName = 'FileInput'

export default FileInput
