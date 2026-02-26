export type ModalProps = React.DetailedHTMLProps<
	React.DialogHTMLAttributes<HTMLDialogElement>,
	HTMLDialogElement
>

export function Modal({
	ref,
	children,
	...rest
}: React.PropsWithChildren<ModalProps>) {
	return (
		<dialog ref={ref} {...rest}>
			<div className="modal-cover">{children}</div>
		</dialog>
	)
}
