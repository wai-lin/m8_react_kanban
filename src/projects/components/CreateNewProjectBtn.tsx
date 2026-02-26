import { FormField, Icon, Modal } from "#components"
import { useForm } from "#hooks/useForm.ts"
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
	const form = useForm(schema, {
		title: "",
		slug: "",
		description: "",
	})

	useEffect(() => {
		form.setField("slug", slugify(form.state.title ?? ""))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.state.title])

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
					<FormField label="Project Name">
						{(id) => (
							<input
								id={id}
								name="title"
								value={form.state.title}
								onChange={form.onChange}
							/>
						)}
					</FormField>
					<FormField label="Slug">
						{(id) => (
							<input
								id={id}
								name="slug"
								value={form.state.slug}
								onChange={form.onChange}
							/>
						)}
					</FormField>
					<FormField label="Description">
						{(id) => (
							<textarea
								id={id}
								name="description"
								value={form.state.description}
								onChange={form.onChange}
							></textarea>
						)}
					</FormField>
					<button>Create</button>
				</form>
			</Modal>
		</>
	)
}
