import { Link } from "react-router"
import type { Project } from "../types"

interface Props {
	to: string
	project: Project
}

export function ProjectCard({ to, project }: Props) {
	return (
		<Link to={to} style={{ textDecoration: "none" }}>
			<div className="card">
				<h4>{project.title}</h4>
				<p>{project.description}</p>
			</div>
		</Link>
	)
}
