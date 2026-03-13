import { Dialog, FormField } from "#components"
import { slugify } from "#src/shared/utils/slugify.ts"
import {
	Button,
	ButtonGroup,
	Fieldset,
	Heading,
	Input,
	Textarea,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import z from "zod"
import { projectSchema } from "../constants"

const schema = projectSchema.pick({
	title: true,
	slug: true,
	description: true,
})

interface Props {
	onCreate: (data: z.output<typeof schema>) => Promise<void>
}

const createFormId = "project-create-form"

export function CreateNewProjectBtn({ onCreate }: Props) {
	const [open, setOpen] = useState(false)

	const { register, control, reset, handleSubmit, setValue, formState } =
		useForm({
			resolver: zodResolver(schema),
		})

	const onSubmit = handleSubmit(async (data) => {
		await onCreate(data)
		setOpen(false)
		reset()
	})

	const watchTitle = useWatch({ control, name: "title", defaultValue: "" })
	useEffect(() => setValue("slug", slugify(watchTitle)), [setValue, watchTitle])

	return (
		<Dialog
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			trigger={
				<Button size="sm" colorPalette="brand">
					Create new
				</Button>
			}
			title={<Heading>Create new project</Heading>}
			footer={
				<ButtonGroup size="sm">
					<Button
						variant="outline"
						disabled={formState.isSubmitting}
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form={createFormId}
						loading={formState.isSubmitting}
						colorPalette="brand"
					>
						Save
					</Button>
				</ButtonGroup>
			}
		>
			<form id={createFormId} onSubmit={onSubmit}>
				<Fieldset.Root disabled={formState.isSubmitting}>
					<Fieldset.Content>
						<FormField
							label="Project Name"
							requiredIndicator
							error={formState.errors.title?.message}
						>
							<Input {...register("title")} />
						</FormField>
						<FormField
							label="Slug"
							requiredIndicator
							error={formState.errors.slug?.message}
						>
							<Input {...register("slug")} />
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
