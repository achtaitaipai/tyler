import 'react-toastify/dist/ReactToastify.css'
import DrawingSection from './lib/ui/DrawingSection'
import DropdownMenu from './lib/ui/DropdownMenu'
import HistoryNav from './lib/ui/HistoryNav'
import SelectTool from './lib/ui/SelectTool'
import ThemeSwitch from './lib/ui/ThemeSwitch'
import TileSetwindow from './lib/ui/TileSetWindow'
import Toasts from './lib/ui/Toasts'

function App() {
	return (
		<>
			<Toasts />
			<div className="app">
				<header>
					<DropdownMenu />
					<SelectTool />
					<HistoryNav />
				</header>
				<main>
					<TileSetwindow />
					<DrawingSection />
				</main>
				<footer>
					<ThemeSwitch />
				</footer>
			</div>
		</>
	)
}
export default App
