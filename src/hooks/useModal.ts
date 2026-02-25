import { useRef } from "react"

export function useModal() {
	const ref = useRef<HTMLDialogElement>(null)
	const show = () => ref.current?.showModal()
	const close = () => ref.current?.close()

	const handleOnClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) close()
	}

	return {
		show,
		close,
		props: {
			ref,
			onClick: handleOnClick,
		},
	}
}
