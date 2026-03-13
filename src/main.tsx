import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import { Provider } from "./components/ui/provider.tsx"

const root = document.getElementById("root")
if (!root) {
	throw new Error("`root` element not found!")
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: import.meta.env.PROD,
			throwOnError: true,
		},
	},
})

createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider enableSystem={false}>
				<App />
			</Provider>
		</QueryClientProvider>
	</StrictMode>,
)
