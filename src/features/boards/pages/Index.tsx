import { Stack } from "#components"
import { BoardColumn } from "../components/BoardColumn"

export function Index() {
	return (
		<section>
			<Stack direction="row" gap="lg">
				<BoardColumn title="Todo">
					<p className="card">Define user requirements</p>
				</BoardColumn>
				<BoardColumn title="InProgress"></BoardColumn>
				<BoardColumn title="Done"></BoardColumn>
			</Stack>
		</section>
	)
}
