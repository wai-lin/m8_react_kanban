import { Loading } from "#components"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Outlet } from "react-router"

export function AppLayout() {
	return (
		<ErrorBoundary fallback={<Loading />}>
			<Suspense fallback={<Loading />}>
				<Outlet />
			</Suspense>
		</ErrorBoundary>
	)
}
