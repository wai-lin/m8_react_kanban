import { Stack } from "#components"
import { BoardColumn } from "../components/BoardColumn"

export function Index() {
	return (
		<main className="container">
			<header
				style={{ paddingTop: "var(--sp-md)", marginBottom: "var(--sp-lg)" }}
			>
				<h3>Tasks</h3>
			</header>

			<Stack direction="row" gap="lg">
				<BoardColumn title="Todo" iconColor="var(--color-primary)">
					<h4 className="card">Authentication Flow</h4>
					<h4 className="card">Create dashboard</h4>
				</BoardColumn>
				<BoardColumn title="InProgress" iconColor="var(--color-warning)">
					<h4 className="card">Define user requirements</h4>
				</BoardColumn>
				<BoardColumn
					title="Done"
					iconColor="var(--color-success)"
				></BoardColumn>
			</Stack>
		</main>
	)
}
