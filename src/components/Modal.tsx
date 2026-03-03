import {
	Dialog as CDialog,
	Portal,
	type DialogRootProps,
} from "@chakra-ui/react"

export interface DialogProps extends DialogRootProps {
	title?: React.ReactNode
	footer?: React.ReactNode
	trigger?: React.ReactNode
	closeTrigger?: React.ReactNode
}

export function Dialog({
	title,
	footer,
	trigger,
	closeTrigger,
	children,
	...rest
}: React.PropsWithChildren<DialogProps>) {
	return (
		<CDialog.Root {...rest}>
			<CDialog.Trigger asChild>{trigger}</CDialog.Trigger>

			<Portal>
				<CDialog.Backdrop />
				<CDialog.Positioner>
					<CDialog.Content>
						<CDialog.Header>
							{title && <CDialog.Title asChild>{title}</CDialog.Title>}
							{closeTrigger && (
								<CDialog.CloseTrigger asChild>
									{closeTrigger}
								</CDialog.CloseTrigger>
							)}
						</CDialog.Header>
						<CDialog.Body>{children}</CDialog.Body>
						{footer && <CDialog.Footer>{footer}</CDialog.Footer>}
					</CDialog.Content>
				</CDialog.Positioner>
			</Portal>
		</CDialog.Root>
	)
}
