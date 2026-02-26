import { FormField, Icon, Modal } from "#components"
import { useForm } from "#hooks/useForm.ts"
import { useInputState } from "#hooks/useInputState.ts"
import { useModal } from "#hooks/useModal.ts"
import { slugify } from "#utils/slugify.ts"
import { useEffect } from "react"
import z from "zod"

const schema = z.object({
	title: z.string().min(1, "required."),
	slug: z.string().min(1, "required."),
	description: z.string().default(""),
})

interface Props {
	onCreate: (data: z.output<typeof schema>) => void | Promise<void>
}

export function CreateNewProjectBtn({ onCreate }: Props) {
	const modal = useModal()
	const form = useForm(schema)
	const titleState = useInputState("")
	const slugState = useInputState("")

	useEffect(() => {
		slugState.setValue(slugify(titleState.value))
	}, [slugState, titleState.value])

	const handleSubmit = form.onSubmit((data) => {
		onCreate(data)
		modal.close()
	})

	return (
		<>
			<button className="btn-sm" onClick={() => modal.show()}>
				<Icon name="plus-solid" />
				Create new
			</button>

			<Modal {...modal.props} className="modal-top">
				<h4 style={{ marginBottom: "var(--sp-md)" }}>Create new project</h4>
				<form onSubmit={handleSubmit}>
					<FormField label="Project Name" error={form.errorOf("title").at(0)}>
						{(id) => (
							<input
								id={id}
								name="title"
								placeholder="Brrr"
								{...titleState.bind}
							/>
						)}
					</FormField>
					<FormField label="Slug" error={form.errorOf("slug").at(0)}>
						{(id) => (
							<input
								id={id}
								name="slug"
								placeholder="brrr"
								{...slugState.bind}
							/>
						)}
					</FormField>
					<FormField
						label="Description"
						error={form.errorOf("description").at(0)}
					>
						{(id) => <textarea id={id} name="description"></textarea>}
					</FormField>
					<button>Create</button>
				</form>
			</Modal>
		</>
	)
}
