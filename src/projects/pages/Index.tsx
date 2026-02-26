import { useModel } from "#hooks/useModel.ts"
import { CreateNewProjectBtn } from "../components/CreateNewProjectBtn"
import { storageKey } from "../constants"
import type { Project } from "../types"

export function Index() {
	const projects = useModel<Project>(storageKey)

	return (
		<main className="container">
			<header
				className="flex gap-2"
				style={{ paddingTop: "var(--sp-md)", marginBottom: "var(--sp-lg)" }}
			>
				<h2>Projects</h2>

				<CreateNewProjectBtn
					onCreate={(data) => {
						projects.set({ ...data, id: projects.newId() })
					}}
				/>
			</header>

			<section className="flex">
				{projects.isEmpty && <p className="card">There's no project yet...</p>}
				{projects.items.map((p) => (
					<p key={p.slug} className="card">
						{p.title}
					</p>
				))}
			</section>
		</main>
	)
}
