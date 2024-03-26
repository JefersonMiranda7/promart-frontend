'use client'

import Search from '../../components/search'
import DataTable from '../../components/dataTable'
import ClientModal from './modal'
import DeleteModal from '../../components/deleteModal'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IClient } from '../../interfaces/client'
import { REACT_APP_SERVER_URL } from '../../config'
import axios from 'axios'
import { message } from 'antd'
import PlusIcon from '../../icons/plus'
import Carousel from '../../components/carousel'

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'surname', label: 'Apellido Paterno' },
  { key: 'mothers_surname', label: 'Apellido Materno' },
  { key: 'email', label: 'Correo Electrónico' },
  { key: 'birthdate', label: 'Fecha de Nacimiento' },
  { key: 'age', label: 'Edad' },
]

export default function ClientsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const [arrClients, setArrClients] = useState<IClient[]>([])
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [selectedClient, setSelectedClient] = useState<IClient>({
    id: 0,
    name: '',
    surname: '',
    mothers_surname: '',
    email: '',
    birthdate: '',
    age: '',
    active: true,
  })

  const getClients = async () => {
    await axios
      .get(`${REACT_APP_SERVER_URL}clients`)
      .then((response) => {
        setArrClients(response.data.data)
      })
      .catch((error) => {
        console.log(error)
        message.error(
          <span className='text-sm'>
            Ha surgido un error al cargar la información
          </span>
        )
      })
  }

  useEffect(() => {
    getClients()
  }, [query, isAddEditModalOpen, isDeleteModalOpen])

  const showModal = () => {
    setIsAddEditModalOpen(true)
  }

  const closeModal = () => {
    setIsAddEditModalOpen(false)
    setIsEditMode(false)
  }

  const onDelete = async () => {
    setConfirmLoading(true)

    setTimeout(async () => {
      await axios
        .delete(`${REACT_APP_SERVER_URL}clients/${selectedClient.id}`)
        .then((response) => {
          console.log(response.data)
          message.success(
            <span className='text-sm'>Eliminado correctamente</span>
          )
        })
        .catch((error) => {
          console.log(error)
          message.error(
            <span className='text-sm'>Ha surgido un error al eliminar</span>
          )
        })
      setConfirmLoading(false)
      setIsDeleteModalOpen(false)
    }, 500)
  }

  const showEditModal = (item: IClient) => {
    setIsAddEditModalOpen(true)
    setIsEditMode(true)
    setSelectedClient(item)
  }

  const showDeleteModal = (item: IClient) => {
    setIsDeleteModalOpen(true)
    setSelectedClient(item)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const images: string[] = [
    '/ronaldinho.webp',
    '/messi.webp',
    '/neymar.webp'
  ]

  return (
    <div className='flex flex-col rounded-xl bg-myGreenBg'>
      <span className='flex justify-center text-2xl my-5'>CLIENTES</span>

      <Carousel images={images} />

      <div className='flex flex-row justify-between'>
        <Search
          className='flex basis-3/5 m-5'
          placeholder='Busque por nombre o apellido paterno'
        />
        <div className='flex basis-2/5 justify-end m-5'>
          <button
            type='button'
            className='flex rounded-full px-5 ml-2 items-center text-myOrange bg-myYellow hover:bg-myOrangeBg hover:text-white focus:ring-2 focus:ring-white'
            onClick={() => showModal()}
          >
            <PlusIcon width={25} height={25} />
            <span className='ml-3'>Agregar</span>
          </button>
        </div>
      </div>

      <DataTable
        className={'bg-myLightGreen rounded-xl p-3 m-5'}
        columns={columns}
        data={arrClients}
        showEditModal={showEditModal}
        showDeleteModal={showDeleteModal}
      />

      {isAddEditModalOpen && (
        <ClientModal
          isAddEditModalOpen={isAddEditModalOpen}
          isEditMode={isEditMode}
          selectedClient={selectedClient}
          closeModal={closeModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          entityName='CLIENTE'
          isDeleteModalOpen={isDeleteModalOpen}
          confirmLoading={confirmLoading}
          onDelete={onDelete}
          closeDeleteModal={closeDeleteModal}
        />
      )}
    </div>
  )
}
