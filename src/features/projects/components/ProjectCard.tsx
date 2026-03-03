import { Card, Heading, Text } from "@chakra-ui/react"
import { Link } from "react-router"
import type { Project } from "../types"

interface Props {
	to: string
	project: Project
}

export function ProjectCard({ to, project }: Props) {
	return (
		<Link to={to} style={{ textDecoration: "none" }}>
			<Card.Root w="xs">
				<Card.Header>
					<Heading size="md" truncate>
						{project.title}
					</Heading>
				</Card.Header>
				<Card.Body>
					<Text truncate>{project.description}</Text>
				</Card.Body>
			</Card.Root>
		</Link>
	)
}
