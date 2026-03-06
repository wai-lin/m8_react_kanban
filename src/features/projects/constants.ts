import z from "zod"

export const storageKey = "kprojects"

export const projectSchema = z.object({
	id: z.number().min(0),
	title: z.string().min(1, "required."),
	slug: z.string().min(1, "required."),
	description: z.string().default(""),
})
