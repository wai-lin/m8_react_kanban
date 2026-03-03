import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { App } from "./App.tsx"
import { Provider } from "./components/ui/provider.tsx"

const root = document.getElementById("root")
if (!root) {
	throw new Error("`root` element not found!")
}

createRoot(root).render(
	<StrictMode>
		<Provider enableSystem={false}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>,
)
