import type z from "zod"
import type { statusSchema, taskSchema } from "./constants"

export type Task = z.output<typeof taskSchema>
export type Status = z.output<typeof statusSchema>
