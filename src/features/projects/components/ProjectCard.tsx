import { compactViewAtom } from "#src/shared/state/atoms.ts"
import { Card, Heading, Text } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { Link } from "react-router"
import type { Project } from "../types"

interface Props {
	to: string
	project: Project
}

export function ProjectCard({ to, project }: Props) {
	const compactView = useAtomValue(compactViewAtom)
	return (
		<Card.Root w={compactView ? "xs" : "sm"} asChild>
			<Link to={to} style={{ textDecoration: "none" }}>
				<Card.Header py={compactView ? "2" : "4"}>
					<Heading size={compactView ? "sm" : "md"} truncate>
						{project.title}
					</Heading>
				</Card.Header>
				<Card.Body py={compactView ? "2" : "4"}>
					<Text fontSize={compactView ? "sm" : "md"} truncate>
						{project.description}
					</Text>
				</Card.Body>
			</Link>
		</Card.Root>
	)
}
