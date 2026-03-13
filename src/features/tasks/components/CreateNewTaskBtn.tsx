import { Dialog, FormField } from "#components"
import {
	Button,
	ButtonGroup,
	Fieldset,
	Heading,
	Input,
	Textarea,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type z from "zod"
import { taskSchema } from "../constants"

const schema = taskSchema.pick({
	title: true,
	description: true,
	status: true,
	projectId: true,
})

const createTaskId = "create-task-form"

interface Props {
	projectId: number
	onCreate: (data: z.output<typeof schema>) => Promise<void>
}

export function CreateNewTaskBtn({ projectId, onCreate }: Props) {
	const [open, setOpen] = useState(false)

	const { register, reset, handleSubmit, formState } = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			title: "",
			description: "",
			status: "todo",
			projectId: projectId,
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		await onCreate({
			...data,
			projectId,
		})
		setOpen(false)
		reset()
	})

	return (
		<Dialog
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			trigger={<Button size="sm">New Task</Button>}
			title={<Heading>Create new task</Heading>}
			footer={
				<ButtonGroup size="sm">
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						form={createTaskId}
						type="submit"
						loading={formState.isSubmitting}
					>
						Save
					</Button>
				</ButtonGroup>
			}
		>
			<form id={createTaskId} onSubmit={onSubmit}>
				<Fieldset.Root disabled={formState.isSubmitting}>
					<Fieldset.Content>
						<FormField
							label="Title"
							requiredIndicator
							error={formState.errors.title?.message}
						>
							<Input {...register("title")} />
						</FormField>
						<FormField
							label="Description"
							error={formState.errors.description?.message}
						>
							<Textarea {...register("description")} />
						</FormField>
					</Fieldset.Content>
				</Fieldset.Root>
			</form>
		</Dialog>
	)
}
