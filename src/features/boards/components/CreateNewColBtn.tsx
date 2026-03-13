import { Dialog, FormField } from "#components"
import { statusSchema } from "#src/features/tasks/constants.ts"
import { slugify } from "#utils/slugify.ts"
import { Button, ButtonGroup, Fieldset, Heading, Input } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import type z from "zod"

interface Props {
	onCreate: (data: z.output<typeof schema>) => Promise<void>
}

const schema = statusSchema.pick({
	title: true,
	value: true,
})

const createFormId = "status-create-form"

export function CreateNewColBtn({ onCreate }: Props) {
	const [open, setOpen] = useState(false)

	const { register, control, reset, handleSubmit, setValue, formState } =
		useForm({
			resolver: zodResolver(schema),
		})

	const onSubmit = handleSubmit(async (data) => {
		await onCreate({ ...data })
		setOpen(false)
		reset()
	})

	const watchTitle = useWatch({ control, name: "title", defaultValue: "" })
	useEffect(
		() => setValue("value", slugify(watchTitle)),
		[setValue, watchTitle],
	)

	return (
		<Dialog
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			trigger={
				<Button size="sm" w="300px">
					<LuPlus /> Create new
				</Button>
			}
			title={<Heading>Create new column</Heading>}
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
							label="Title"
							requiredIndicator
							error={formState.errors.title?.message}
						>
							<Input {...register("title")} />
						</FormField>
						<FormField
							label="Value"
							requiredIndicator
							error={formState.errors.value?.message}
						>
							<Input {...register("value")} readOnly />
						</FormField>
					</Fieldset.Content>
				</Fieldset.Root>
			</form>
		</Dialog>
	)
}
