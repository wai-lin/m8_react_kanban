import { useProjectsModel } from "#src/features/projects/hooks/index.ts"
import {
	CreateNewTaskBtn,
	TaskCard,
} from "#src/features/tasks/components/index.tsx"
import {
	useStatusModel,
	useTasksModel,
} from "#src/features/tasks/hooks/index.ts"
import { promiseAndSleep } from "#utils/promiseAndSleep.ts"
import { slugify } from "#utils/slugify.ts"
import {
	AbsoluteCenter,
	Box,
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	IconButton,
} from "@chakra-ui/react"
import { DragDropProvider, DragOverlay } from "@dnd-kit/react"
import { useMemo, useState } from "react"
import { LuArrowLeft, LuExternalLink } from "react-icons/lu"
import { Link, Outlet, useParams } from "react-router"
import { BoardColumn } from "../components/BoardColumn"
import { CreateNewColBtn } from "../components/CreateNewColBtn"

export function Index() {
	const params = useParams()

	const statusModel = useStatusModel()
	const tasksModel = useTasksModel()
	const projectsModel = useProjectsModel()
	const [activeId, setActiveId] = useState<string | null>(null)

	const project = useMemo(() => {
		return projectsModel.items.find((p) => p.slug === params.slug)
	}, [params.slug, projectsModel.items])

	const tasks = useMemo(() => {
		return tasksModel.items.filter((t) => t.projectId === project?.id)
	}, [project?.id, tasksModel.items])

	const activeTask = useMemo(() => {
		if (!activeId) return null
		return tasksModel.get(Number(activeId))
	}, [activeId, tasksModel])

	function moveTaskCard(sourceId?: string, targetId?: string) {
		if (!sourceId || !targetId) return
		const task = tasksModel.get(Number(sourceId))
		if (!task) return
		tasksModel.set({ ...task, status: String(targetId), updatedAt: new Date() })
	}

	if (!project) {
		return (
			<AbsoluteCenter>
				<Heading>Project doesn't exists</Heading>
				<Button asChild>
					<Link to="/">Back</Link>
				</Button>
			</AbsoluteCenter>
		)
	}

	return (
		<Box position="relative">
			<Container height="100vh" display="flex" flexDirection="column">
				<Flex paddingX="6" paddingY="4" gap="4" align="center" flexShrink={0}>
					<IconButton asChild variant="subtle" size="xs">
						<Link to="/">
							<LuArrowLeft />
						</Link>
					</IconButton>

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

				<DragDropProvider
					onDragStart={(ev) => {
						setActiveId(ev.operation.source?.id as string)
					}}
					onDragEnd={(ev) => {
						setActiveId(null)
						if (ev.canceled) return
						const { target, source } = ev.operation
						moveTaskCard(source?.id as string, target?.id as string)
					}}
				>
					<Flex
						gap="6"
						flex="1"
						paddingX="6"
						paddingBottom="6"
						overflowX="auto"
						minW="0"
						minH="0"
					>
						{statusModel.items.map((col) => (
							<BoardColumn key={col.value} dropId={col.value} title={col.title}>
								{tasks
									.filter((t) => t.status === col.value)
									.map((t) => (
										<TaskCard
											id={t.id}
											key={slugify(t.title)}
											header={
												<HStack justifyContent="space-between">
													<Heading size="md">{t.title}</Heading>
													<Link to={`/${project.slug}/${t.id}`}>
														<LuExternalLink />
													</Link>
												</HStack>
											}
										>
											{t.description}
										</TaskCard>
									))}
							</BoardColumn>
						))}

						<CreateNewColBtn
							onCreate={(data) =>
								promiseAndSleep(() => {
									statusModel.set({
										...data,
										id: statusModel.newId(),
									})
								}, 500)
							}
						/>
					</Flex>

					<DragOverlay>
						{activeTask ? (
							<TaskCard
								id={activeTask.id}
								header={<Heading size="md">{activeTask.title}</Heading>}
							>
								{activeTask.description}
							</TaskCard>
						) : null}
					</DragOverlay>
				</DragDropProvider>
			</Container>

			<Outlet />
		</Box>
	)
}
