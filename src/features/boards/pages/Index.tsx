import { AppPreferencesControls } from "#components"
import {
	CreateNewTaskBtn,
	TaskCard,
} from "#src/features/tasks/components/index.tsx"
import { useProjectsQuery } from "#src/shared/services/useProjectsService.ts"
import {
	useCreateProjectStatus,
	useProjectStatusesQuery,
} from "#src/shared/services/useStatusesService.ts"
import {
	useCreateTask,
	useProjectTasksQuery,
	useUpdateTask,
} from "#src/shared/services/useTasksService.ts"
import { slugify } from "#src/shared/utils/slugify.ts"
import {
	AbsoluteCenter,
	Box,
	Button,
	Container,
	Flex,
	Heading,
	IconButton,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react"
import { DragDropProvider, DragOverlay } from "@dnd-kit/react"
import { useMemo, useState } from "react"
import { LuArrowLeft, LuGripVertical } from "react-icons/lu"
import { Link, Outlet, useNavigate, useParams } from "react-router"
import { BoardColumn } from "../components/BoardColumn"
import { CreateNewColBtn } from "../components/CreateNewColBtn"
import { BoardFilterProvider } from "../context/BoardFilterProvider"
import { useBoardFilter } from "../context/useBoardFilter"

function BoardContent() {
	const params = useParams()

	const projectsQuery = useProjectsQuery()
	const navigate = useNavigate()
	const [activeId, setActiveId] = useState<string | null>(null)

	const project = useMemo(() => {
		return projectsQuery.data?.find((p) => p.slug === params.projectSlug)
	}, [params.projectSlug, projectsQuery.data])

	const projectId = project?.id
	const { searchTerm, setSearchTerm } = useBoardFilter()

	const statusesQuery = useProjectStatusesQuery(projectId)
	const tasksQuery = useProjectTasksQuery(projectId)
	const createStatus = useCreateProjectStatus(projectId)
	const createTask = useCreateTask(projectId)
	const updateTask = useUpdateTask(projectId)

	const activeTask = useMemo(() => {
		if (!activeId) return null
		return tasksQuery.data?.find((t) => t.id === Number(activeId)) ?? null
	}, [activeId, tasksQuery.data])

	function moveTaskCard(sourceId?: string, targetId?: string) {
		if (!sourceId || !targetId) return
		const task = tasksQuery.data?.find((t) => t.id === Number(sourceId))
		const targetStatus = statusesQuery.data?.find((s) => s.slug === targetId)
		if (!task || !targetStatus) return
		updateTask.mutate({
			id: task.id,
			input: {
				statusId: targetStatus.id,
			},
			optimisticStatus: {
				id: targetStatus.id,
				title: targetStatus.title,
				value: targetStatus.value,
			},
		})
	}

	if (!project || !projectId) {
		return (
			<AbsoluteCenter asChild>
				<VStack>
					<Heading>Project doesn't exists</Heading>
					<Button asChild>
						<Link to="/">Back</Link>
					</Button>
				</VStack>
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
					<Input
						maxW="240px"
						placeholder="Search tasks"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
					/>
					<CreateNewTaskBtn
						projectId={project?.id}
						defaultStatus={statusesQuery.data?.[0]?.slug}
						onCreate={async (data) => {
							await createTask.mutateAsync({
								projectId: data.projectId,
								statusId:
									statusesQuery.data?.find((s) => s.slug === data.status)?.id ??
									null,
								title: data.title,
								description: data.description,
							})
						}}
					/>
					<Flex marginLeft="auto" gap="2">
						<AppPreferencesControls />
					</Flex>
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
						paddingTop="4"
						paddingBottom="6"
						overflowX="auto"
						minW="0"
						minH="0"
					>
						{statusesQuery.data?.map((col) => (
							<BoardColumn key={col.id} dropId={col.value} title={col.title}>
								{(tasksQuery.data ?? [])
									.filter((t) => t.status?.id === col.id)
									.filter((t) =>
										[t.title, t.description]
											.join(" ")
											.toLowerCase()
											.includes(searchTerm.trim().toLowerCase()),
									)
									.map((t) => (
										<TaskCard
											id={t.id}
											key={slugify(t.title)}
											onClick={() => {
												navigate(`/${project.slug}/${t.slug}`)
											}}
											header={<Heading size="md">{t.title}</Heading>}
											handle={<LuGripVertical />}
										>
											<Text fontSize="sm">{t.description ?? "..."}</Text>
										</TaskCard>
									))}
							</BoardColumn>
						))}

						<CreateNewColBtn
							onCreate={async (data) => {
								await createStatus.mutateAsync({
									projectId: project.id,
									title: data.title,
									value: data.value,
								})
							}}
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

export function Index() {
	return (
		<BoardFilterProvider>
			<BoardContent />
		</BoardFilterProvider>
	)
}
