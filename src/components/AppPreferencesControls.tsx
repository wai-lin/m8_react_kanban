import { IconButton } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { LuExpand, LuMoon, LuShrink, LuSun } from "react-icons/lu"
import { colorModeAtom, compactViewAtom } from "../state/atoms"
import { useColorMode } from "./ui/color-mode-hooks"

export function AppPreferencesControls() {
	const [compactView, setCompactView] = useAtom(compactViewAtom)
	const [storedColorMode, setStoredColorMode] = useAtom(colorModeAtom)
	const { colorMode, setColorMode } = useColorMode()

	useEffect(() => {
		if (!colorMode) return
		if (colorMode !== storedColorMode) {
			setStoredColorMode(colorMode)
		}
	}, [colorMode, setStoredColorMode, storedColorMode])

	function toggleColorMode() {
		const nextMode = storedColorMode === "dark" ? "light" : "dark"
		setStoredColorMode(nextMode)
		setColorMode(nextMode)
	}

	return (
		<>
			<IconButton
				variant="ghost"
				size="sm"
				aria-label="Toggle compact view"
				onClick={() => setCompactView((prev: boolean) => !prev)}
			>
				{compactView ? <LuExpand /> : <LuShrink />}
			</IconButton>
			<IconButton
				variant="ghost"
				size="sm"
				aria-label="Toggle color mode"
				onClick={toggleColorMode}
			>
				{storedColorMode === "dark" ? <LuMoon /> : <LuSun />}
			</IconButton>
		</>
	)
}
