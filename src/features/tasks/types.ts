import type z from "zod"
import type { taskSchema } from "./constants"

export type Task = z.output<typeof taskSchema>
