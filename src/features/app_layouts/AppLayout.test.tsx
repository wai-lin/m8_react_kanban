import { render, screen } from "#src/testUtils.tsx"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, it } from "vitest"
import { AppLayout } from "./AppLayout"

describe("AppLayout", () => {
	it("renders children via Outlet", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route
							index
							element={<div data-testid="child">Child Content</div>}
						/>
					</Route>
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByTestId("child")).toBeInTheDocument()
		expect(screen.getByText("Child Content")).toBeInTheDocument()
	})
})
