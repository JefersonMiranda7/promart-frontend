import LoaderIcon from '../icons/loader'
import TrashIcon from '../icons/trash'
import { Modal } from 'antd'

export default function DeleteModal ({
  entityName,
  isDeleteModalOpen,
  confirmLoading,
  onDelete,
  closeDeleteModal
}: {
  entityName: string
  isDeleteModalOpen: boolean
  confirmLoading: boolean
  onDelete: () => void
  closeDeleteModal: () => void
}) {
  return (
    <Modal
      title={'ELIMINAR ' + entityName.toUpperCase()}
      open={isDeleteModalOpen}
      onCancel={() => closeDeleteModal()}
      centered
      footer={null}
    >
      <p className='text-sm mt-5'>Si realiza esta acción, no la podrá revertir, ¿desea eliminarlo?</p>
      <div className='flex justify-between text-base mt-5'>
        <button
          key='cancel'
          type='button'
          className='rounded-md px-5 py-1 border text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:ring-2 focus:ring-white'
          onClick={() => closeDeleteModal()}
        >
          Cancelar
        </button>
        <button
          key='delete'
          type='button'
          className='flex rounded-md items-center px-3 py-1 text-red-600 bg-red-100 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-white'
          onClick={onDelete}
        >
          { confirmLoading ?
            <div className='animate-spin mr-2'>
              <LoaderIcon width={20} height={20} />
            </div>
            :
            <div className='mr-2'>
              <TrashIcon width={20} height={20} />
            </div>
          }
          <span>Eliminar</span>
        </button>
      </div>
    </Modal>
  )
}