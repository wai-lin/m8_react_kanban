import { AppPreferencesControls } from "#components"
import {
	useCreateProject,
	useProjectsQuery,
} from "#src/shared/services/useProjectsService.ts"
import { Card, Container, Flex, Heading, Text } from "@chakra-ui/react"
import { CreateNewProjectBtn } from "../components/CreateNewProjectBtn"
import { ProjectCard } from "../components/ProjectCard"

export function Index() {
	const projectsQuery = useProjectsQuery()
	const createProject = useCreateProject()
	const projects = projectsQuery.data ?? []

	return (
		<Container>
			<Flex gap="4" mt="8" mb="4" align="center">
				<Heading>Projects</Heading>
				<CreateNewProjectBtn
					onCreate={async (data) => {
						await createProject.mutateAsync({
							title: data.title,
							description: data.description,
						})
					}}
				/>
				<Flex marginLeft="auto" gap="2">
					<AppPreferencesControls />
				</Flex>
			</Flex>

			<Flex gap="4" wrap="wrap">
				{!projectsQuery.isLoading && projects.length === 0 && (
					<Card.Root>
						<Card.Body>
							<Text>There's no project yet...</Text>
						</Card.Body>
					</Card.Root>
				)}
				{projects.map((p) => (
					<ProjectCard key={p.slug} to={`/${p.slug}`} project={p} />
				))}
			</Flex>
		</Container>
	)
}
