import { useModel } from "#hooks/useModel.ts"
import { storageKey } from "../constants"
import type { Task } from "../types"

export const useTasksModel = () => useModel<Task>(storageKey)
