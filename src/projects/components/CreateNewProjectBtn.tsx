import { Icon, Modal } from "#components"
import { useModal } from "#hooks/useModal.ts"

export function CreateNewProjectBtn() {
	const modal = useModal()

	return (
		<>
			<button className="btn btn-sm" onClick={() => modal.show()}>
				<Icon name="plus-solid" />
				Create new
			</button>

			<Modal {...modal.props}>
				<h2>Hello Modal</h2>
			</Modal>
		</>
	)
}
