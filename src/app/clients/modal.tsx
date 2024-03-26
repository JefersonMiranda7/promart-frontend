import SaveIcon from '../../icons/save'
import LoaderIcon from '../../icons/loader'
import { Modal, message } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IClient } from '../../interfaces/client'
import axios from 'axios'
import { REACT_APP_SERVER_URL } from '../../config'

const initialData: IClient = {
  id: 0,
  name: '',
  surname: '',
  mothers_surname: '',
  email: '',
  birthdate: '',
  age: '',
  active: true,
}

export default function ClientModal({
  isAddEditModalOpen,
  isEditMode,
  selectedClient,
  closeModal,
}: {
  isAddEditModalOpen: boolean
  isEditMode: boolean
  selectedClient?: IClient
  closeModal: () => void
}) {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<IClient>({
    defaultValues: isEditMode ? selectedClient : initialData,
  })

  const handleOk = async (data: IClient) => {
    setConfirmLoading(true)

    setTimeout(async () => {
      if (isEditMode) {
        await axios
          .put(`${REACT_APP_SERVER_URL}clients/${selectedClient?.id}`, data)
          .then((response) => {
            console.log(response.data)
            message.success(
              <span className='text-sm'>Editado correctamente</span>
            )
          })
          .catch((error) => {
            console.log(error)
            message.error(
              <span className='text-sm'>Ha surgido un error al editar</span>
            )
          })
      } else {
        await axios
          .post(`${REACT_APP_SERVER_URL}clients`, data)
          .then((response) => {
            console.log(response.data)
            message.success(
              <span className='text-sm'>Agregado correctamente</span>
            )
          })
          .catch((error) => {
            console.log(data)
            console.log(error)
            message.error(
              <span className='text-sm'>Ha surgido un error al agregar</span>
            )
          })
      }
      setConfirmLoading(false)
      reset()
      closeModal()
    }, 500)
  }

  const handleCancel = () => {
    reset()
    closeModal()
  }

  return (
    <Modal
      title={isEditMode ? 'EDITAR CLIENTE' : 'AGREGAR CLIENTE'}
      width={700}
      open={isAddEditModalOpen}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit((data) => handleOk(data))}>
        <div className='flex text-sm mt-5'>
          <div className='flex w-full flex-col px-32'>
            <span className='text-myGreen'>Nombre</span>
            <input
              {...register('name')}
              className='px-3 py-1 mb-2 border rounded-md bg-gray-50 text-gray-700'
            />

            <span className='text-myGreen'>Apellido Paterno</span>
            <input
              {...register('surname')}
              className='px-3 py-1 mb-2 border rounded-md bg-gray-50 text-gray-700'
            />

            <span className='text-myGreen'>Apellido Materno (opcional)</span>
            <input
              {...register('mothers_surname')}
              className='px-3 py-1 mb-2 border rounded-md bg-gray-50 text-gray-700'
            />

            <span className='text-myGreen'>Correo Electrónico</span>
            <input
              {...register('email')}
              className='px-3 py-1 mb-2 border rounded-md bg-gray-50 text-gray-700'
            />

            <span className='text-myGreen'>Fecha de Nacimiento</span>
            <input
              {...register('birthdate' /*, { valueAsDate: true }*/)}
              type='date'
              className='px-3 py-1 mb-2 border rounded-md bg-gray-50 text-gray-700'
            />

            <span className='text-myGreen'>Edad</span>
            <input
              {...register('age')}
              className='px-3 py-1 mb-2 border rounded-md bg-gray-200 text-gray-700'
              readOnly
            />
          </div>
        </div>
        <div className='flex justify-between text-base mt-5'>
          <button
            key='cancel'
            type='button'
            className='rounded-md px-5 py-1 border text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-white'
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            key='save'
            type='submit'
            className='flex rounded-md items-center px-3 py-1 text-myOrange bg-myYellow hover:bg-myOrangeBg hover:text-white focus:ring-2 focus:ring-white'
          >
            {confirmLoading ? (
              <div className='animate-spin mr-2'>
                <LoaderIcon width={20} height={20} />
              </div>
            ) : (
              <div className='mr-2'>
                <SaveIcon width={20} height={20} />
              </div>
            )}
            <span>Confirmar</span>
          </button>
        </div>
      </form>
    </Modal>
  )
}
