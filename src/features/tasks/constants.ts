import z from "zod"

export const storageKeys = {
	tasks: "ktasks",
	status: "kstatus",
}

export const taskSchema = z.object({
	id: z.number().min(0),
	title: z.string().min(1, "required."),
	description: z.string().default(""),
	status: z.string().default("todo"),
	createdAt: z.union([z.date(), z.string()]).pipe(z.coerce.date()),
	updatedAt: z.union([z.date(), z.string()]).pipe(z.coerce.date()),
	projectId: z.number().min(0),
})

export const statusSchema = z.object({
	id: z.number().min(0),
	title: z.string().min(1, "required."),
	value: z.string().min(1, "required."),
	createdAt: z.union([z.date(), z.string()]).pipe(z.coerce.date()),
	updatedAt: z.union([z.date(), z.string()]).pipe(z.coerce.date()),
})
