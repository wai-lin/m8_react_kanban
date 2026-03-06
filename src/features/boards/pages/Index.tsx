import { useProjectsModel } from "#src/features/projects/hooks/index.ts"
import { useTasksModel } from "#src/features/tasks/hooks/index.ts"
import { CreateNewTaskBtn, TaskCard } from "#src/features/tasks/index.tsx"
import { promiseAndSleep } from "#utils/promiseAndSleep.ts"
import { slugify } from "#utils/slugify.ts"
import { AbsoluteCenter, Container, Flex, Heading } from "@chakra-ui/react"
import { useMemo } from "react"
import { LuCircleDashed, LuCircleDot, LuCircleDotDashed } from "react-icons/lu"
import { useParams } from "react-router"
import { BoardColumn } from "../components/BoardColumn"

export function Index() {
	const params = useParams()
	const tasksModel = useTasksModel()
	const projectsModel = useProjectsModel()

	const project = useMemo(() => {
		return projectsModel.items.find((p) => p.slug === params.slug)
	}, [params.slug, projectsModel.items])

	if (!project) {
		return (
			<AbsoluteCenter>
				<Heading>Project doesn't exists</Heading>
			</AbsoluteCenter>
		)
	}

	return (
		<Container
			maxW="100%"
			padding="0"
			height="100vh"
			display="flex"
			flexDirection="column"
		>
			<Flex paddingX="6" paddingY="4" gap="4" align="center">
				<Heading size="lg">{project.title} - Tasks</Heading>
				<CreateNewTaskBtn
					projectId={project?.id}
					onCreate={(data) =>
						promiseAndSleep(
							() => tasksModel.set({ ...data, id: tasksModel.newId() }),
							500,
						)
					}
				/>
			</Flex>

			<Flex gap="6" flex="1" paddingX="6" paddingBottom="6" overflowX="auto">
				<BoardColumn title="Todo" icon={<LuCircleDashed />}>
					{tasksModel.items
						.filter((t) => t.status === "todo")
						.map((t) => (
							<TaskCard
								key={slugify(t.title)}
								header={<Heading size="md">{t.title}</Heading>}
							>
								{t.description}
							</TaskCard>
						))}
				</BoardColumn>

				<BoardColumn title="InProgress" icon={<LuCircleDotDashed />}>
					{tasksModel.items
						.filter((t) => t.status === "in-progress")
						.map((t) => (
							<TaskCard
								key={slugify(t.title)}
								header={<Heading size="md">{t.title}</Heading>}
							>
								{t.description}
							</TaskCard>
						))}
				</BoardColumn>

				<BoardColumn title="Done" icon={<LuCircleDot />}>
					{tasksModel.items
						.filter((t) => t.status === "done")
						.map((t) => (
							<TaskCard
								key={slugify(t.title)}
								header={<Heading size="md">{t.title}</Heading>}
							>
								{t.description}
							</TaskCard>
						))}
				</BoardColumn>
			</Flex>
		</Container>
	)
}
