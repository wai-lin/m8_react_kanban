import { FormField } from "#components"
import {
	Button,
	ButtonGroup,
	Card,
	Center,
	Container,
	Flex,
	Heading,
	Input,
	Textarea,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { taskSchema } from "../constants"
import { useTasksModel } from "../hooks"

const schema = taskSchema.pick({
	title: true,
	description: true,
})

const editTaskId = "edit-task-form"

export function TaskDetail() {
	const navigate = useNavigate()
	const params = useParams()
	const tasksModel = useTasksModel()
	const [isEditing, setIsEditing] = useState(false)

	const task = useMemo(
		() => tasksModel.get(Number(params.taskId)),
		[params.taskId, tasksModel],
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
		tasksModel.set({
			...task,
			title: data.title,
			description: data.description ?? "",
			updatedAt: new Date(),
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
									<Button size="sm" onClick={() => setIsEditing(true)}>
										Edit
									</Button>
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
