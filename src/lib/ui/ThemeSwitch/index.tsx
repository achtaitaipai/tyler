import useIsDark from '../../hooks/useIsDark'
import style from './style.module.css'
export default function ThemeSwitch() {
	const [, toogleIsDark] = useIsDark()

	const handleClick = () => {
		toogleIsDark()
	}

	return (
		<button
			aria-checked="false"
			role="switch"
			title="Activer le thème nuit"
			className={style.btn}
			onClick={handleClick}
		>
			<svg
				aria-hidden="true"
				fill="currentColor"
				height="24"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={style.sun}
			>
				<circle cx="12" cy="12" r="5"></circle>
				<line x1="12" x2="12" y1="1" y2="3"></line>
				<line x1="12" x2="12" y1="21" y2="23"></line>
				<line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
				<line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line>
				<line x1="1" x2="3" y1="12" y2="12"></line>
				<line x1="21" x2="23" y1="12" y2="12"></line>
				<line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
				<line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
			</svg>
			<svg
				aria-hidden="true"
				fill="currentColor"
				height="24"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
				className={style.moon}
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		</button>
	)
}
