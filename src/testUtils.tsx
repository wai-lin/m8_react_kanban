import { render, type RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"
import { Provider } from "./components/ui/provider.tsx"

const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}</Provider>
}

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }
