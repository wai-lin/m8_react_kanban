import { useModel } from "#hooks/useModel.ts"
import { storageKeys } from "../constants"
import type { Task } from "../types"

export const useTasksModel = () => useModel<Task>(storageKeys.tasks)
