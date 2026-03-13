import { Provider } from "#src/shared/components/ui/provider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from "jotai"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"

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
			<JotaiProvider>
				<Provider enableSystem={false}>
					<App />
				</Provider>
			</JotaiProvider>
		</QueryClientProvider>
	</StrictMode>,
)
