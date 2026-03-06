import { promiseAndSleep } from "#utils/promiseAndSleep.ts"
import { Card, Container, Flex, Heading, Text } from "@chakra-ui/react"
import { CreateNewProjectBtn } from "../components/CreateNewProjectBtn"
import { ProjectCard } from "../components/ProjectCard"
import { useProjectsModel } from "../hooks/useProjectModel"

export function Index() {
	const projects = useProjectsModel()

	return (
		<Container>
			<Flex gap="4" mt="8" mb="4" align="center">
				<Heading>Projects</Heading>

				<CreateNewProjectBtn
					onCreate={(data) =>
						promiseAndSleep(() => {
							projects.set({ ...data, id: projects.newId() })
						}, 500)
					}
				/>
			</Flex>

			<Flex gap="4" wrap="wrap">
				{projects.isEmpty && (
					<Card.Root>
						<Card.Body>
							<Text>There's no project yet...</Text>
						</Card.Body>
					</Card.Root>
				)}
				{projects.items.map((p) => (
					<ProjectCard key={p.slug} to={`/project/${p.slug}`} project={p} />
				))}
			</Flex>
		</Container>
	)
}
