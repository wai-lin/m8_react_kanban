import { Dialog, FormField } from "#components"
import { useProjectsQuery } from "#src/shared/services/useProjectsService.ts"
import {
	useDeleteTask,
	useProjectTasksQuery,
	useUpdateTask,
} from "#src/shared/services/useTasksService.ts"
import {
	Button,
	ButtonGroup,
	Card,
	Center,
	Container,
	Flex,
	Heading,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { taskSchema } from "../constants"

const schema = taskSchema.pick({
	title: true,
	description: true,
})

const editTaskId = "edit-task-form"

export function TaskDetail() {
	const navigate = useNavigate()
	const params = useParams()
	const projectSlug = params.projectSlug
	const taskSlug = params.taskSlug
	const projectsQuery = useProjectsQuery()
	const project = useMemo(() => {
		return projectsQuery.data?.find((p) => p.slug === projectSlug)
	}, [projectSlug, projectsQuery.data])
	const projectId = project?.id
	const tasksQuery = useProjectTasksQuery(projectId)
	const updateTask = useUpdateTask(projectId)
	const deleteTask = useDeleteTask(projectId)
	const [isEditing, setIsEditing] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const task = useMemo(
		() => tasksQuery.data?.find((t) => t.slug === taskSlug),
		[taskSlug, tasksQuery.data],
	)

	const { register, handleSubmit, reset, formState } = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			title: task?.title ?? "",
			description: task?.description ?? "",
		},
	})

	useEffect(() => {
		reset({
			title: task?.title ?? "",
			description: task?.description ?? "",
		})
	}, [task, reset])

	const onSubmit = handleSubmit((data) => {
		if (!task) return
		updateTask.mutate({
			id: task.id,
			input: {
				title: data.title,
				description: data.description ?? "",
			},
		})
		setIsEditing(false)
	})

	function handleDiscard() {
		reset({
			title: task?.title ?? "",
			description: task?.description ?? "",
		})
		setIsEditing(false)
	}

	function handleDelete() {
		if (!task) return
		deleteTask.mutate(task.id)
		setIsDeleteOpen(false)
		navigate(-1)
	}

	if (!projectId || !taskSlug) {
		return null
	}

	return (
		<Center
			position="absolute"
			zIndex="popover"
			bgColor="blackAlpha.600"
			inset="0"
			onClick={() => navigate(-1)}
		>
			<Card.Root asChild onClick={(ev) => ev.stopPropagation()}>
				<Container h="80vh">
					<form id={editTaskId} onSubmit={onSubmit}>
						<Card.Header>
							<Flex justify="flex-end" mb="4">
								{isEditing ? (
									<ButtonGroup size="sm">
										<Button variant="outline" onClick={handleDiscard}>
											Discard
										</Button>
										<Button
											type="submit"
											form={editTaskId}
											loading={formState.isSubmitting}
										>
											Save
										</Button>
									</ButtonGroup>
								) : (
									<ButtonGroup size="sm">
										<Button size="sm" onClick={() => setIsEditing(true)}>
											Edit
										</Button>
										<Dialog
											open={isDeleteOpen}
											onOpenChange={(e) => setIsDeleteOpen(e.open)}
											trigger={
												<Button size="sm" colorPalette="red">
													Delete
												</Button>
											}
											title={<Heading size="md">Delete task</Heading>}
											footer={
												<ButtonGroup size="sm">
													<Button
														variant="outline"
														onClick={() => setIsDeleteOpen(false)}
													>
														Cancel
													</Button>
													<Button colorPalette="red" onClick={handleDelete}>
														Delete
													</Button>
												</ButtonGroup>
											}
										>
											<Text>
												Are you sure you want to delete this task? This action
												cannot be undone.
											</Text>
										</Dialog>
									</ButtonGroup>
								)}
							</Flex>

							{isEditing ? (
								<FormField
									label="Title"
									requiredIndicator
									error={formState.errors.title?.message}
								>
									<Input {...register("title")} />
								</FormField>
							) : (
								<Heading size="xl">{task?.title}</Heading>
							)}
						</Card.Header>
						<Card.Body>
							{isEditing ? (
								<FormField
									label="Description"
									error={formState.errors.description?.message}
								>
									<Textarea {...register("description")} />
								</FormField>
							) : (
								task?.description || "..."
							)}
						</Card.Body>
					</form>
				</Container>
			</Card.Root>
		</Center>
	)
}
