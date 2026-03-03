import { Dialog, FormField } from "#components"
import { useForm } from "#hooks/useForm.ts"
import { useInputState } from "#hooks/useInputState.ts"
import { slugify } from "#utils/slugify.ts"
import {
	Button,
	ButtonGroup,
	Fieldset,
	Heading,
	Input,
	Textarea,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import z from "zod"

const schema = z.object({
	title: z.string().min(1, "required."),
	slug: z.string().min(1, "required."),
	description: z.string().default(""),
})

interface Props {
	onCreate: (data: z.output<typeof schema>) => Promise<void>
}

const createFormId = "project-create-form"

export function CreateNewProjectBtn({ onCreate }: Props) {
	const [open, setOpen] = useState(false)
	const form = useForm(schema)
	const titleState = useInputState("")
	const slugState = useInputState("")

	useEffect(() => {
		slugState.setValue(slugify(titleState.value))
	}, [slugState, titleState.value])

	const handleSubmit = form.onSubmit((data) => {
		onCreate(data).then(() => setOpen(false))
	})

	return (
		<Dialog
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			trigger={<Button size="sm">Create new</Button>}
			title={<Heading>Create new project</Heading>}
			footer={
				<ButtonGroup size="sm">
					<Button
						variant="outline"
						disabled={form.isPending}
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button type="submit" form={createFormId} loading={form.isPending}>
						Save
					</Button>
				</ButtonGroup>
			}
		>
			<form id={createFormId} onSubmit={handleSubmit}>
				<Fieldset.Root disabled={form.isPending}>
					<Fieldset.Content>
						<FormField
							label="Project Name"
							requiredIndicator
							error={form.errorOf("title").at(0)}
						>
							<Input name="title" {...titleState.bind} />
						</FormField>
						<FormField label="Slug" error={form.errorOf("slug").at(0)}>
							<Input name="slug" {...slugState.bind} />
						</FormField>
						<FormField
							label="Description"
							error={form.errorOf("description").at(0)}
						>
							<Textarea name="description" />
						</FormField>
					</Fieldset.Content>
				</Fieldset.Root>
			</form>
		</Dialog>
	)
}
