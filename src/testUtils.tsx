import { Provider } from "#src/shared/components/ui/provider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render as rndr, type RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react"

// eslint-disable-next-line react-refresh/only-export-components
const AllProviders = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				throwOnError: true,
				retry: false,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>
			<Provider>{children}</Provider>
		</QueryClientProvider>
	)
}

export const render = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => rndr(ui, { wrapper: AllProviders, ...options })
