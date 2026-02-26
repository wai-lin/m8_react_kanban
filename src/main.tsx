import { ToastProvider, ToastsContainer } from "#components"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { App } from "./App.tsx"
import "./assets/css/icons.css"
import "./assets/css/main.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ToastProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<ToastsContainer />
		</ToastProvider>
	</StrictMode>,
)
