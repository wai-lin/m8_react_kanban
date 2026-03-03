import { Field, Text } from "@chakra-ui/react"

export interface FormFieldProps {
	label: string
	requiredIndicator?: boolean
	error?: string
	hint?: string
}

export function FormField({
	label,
	requiredIndicator = false,
	error,
	hint,
	children,
}: React.PropsWithChildren<FormFieldProps>) {
	return (
		<Field.Root invalid={(error?.length || 0) > 0}>
			<Field.Label>
				<Text>{label}</Text>
				{requiredIndicator && <Field.RequiredIndicator />}
			</Field.Label>
			{children}
			<Field.HelperText>{hint}</Field.HelperText>
			<Field.ErrorText>{error}</Field.ErrorText>
		</Field.Root>
	)
}
