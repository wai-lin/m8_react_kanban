import z from "zod"

export const storageKey = "ktasks"

export const taskSchema = z.object({
	id: z.number().min(0),
	title: z.string().min(1, "required."),
	description: z.string().default(""),
	status: z.string().default("todo"),
	createdAt: z.union([z.date(), z.string()]).pipe(z.coerce.date()),
	updatedAt: z.union([z.date(), z.string()]).pipe(z.coerce.date()),
	projectId: z.number().min(0),
})
