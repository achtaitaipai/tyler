import { ToastContainer } from 'react-toastify'
import useIsDark from '../../hooks/useIsDark'

export default function Toasts() {
	const [isDark] = useIsDark()
	return (
		<ToastContainer
			position="top-center"
			autoClose={1000}
			hideProgressBar
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable={false}
			pauseOnHover={false}
			theme={isDark ? 'dark' : 'light'}
		/>
	)
}
