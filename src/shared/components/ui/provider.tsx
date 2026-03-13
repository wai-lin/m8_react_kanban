"use client"

import { system } from "#src/shared/theme.ts"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={system}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	)
}
