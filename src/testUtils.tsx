import { render as rndr, type RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"
import { Provider } from "./components/ui/provider.tsx"

// eslint-disable-next-line react-refresh/only-export-components
const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}</Provider>
}

export const render = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => rndr(ui, { wrapper: AllProviders, ...options })
