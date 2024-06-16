import { EditForm } from '@components/edit/EditForm'
import { useEditStore } from '@hooks/.'
import Modal from '@mui/material/Modal'
import { observer } from 'mobx-react-lite'

const EditFormModal = observer(() => {
  const editStore = useEditStore()

  return (
    <Modal open={editStore.isEdit} onClose={() => editStore.stopEditing()}>
      <EditForm />
    </Modal>
  )
})

export { EditFormModal }
