import { atom } from "jotai"

export const compactViewAtom = atom(false)
export const colorModeAtom = atom<"light" | "dark">("light")
