import PencilIcon from '../icons/pencil'
import TrashIcon from '../icons/trash'
import { useEffect, useState } from 'react'

export default function DataTable ({
  className, columns, data, showEditModal, showDeleteModal
}: {
  className: string
  columns: {key: string, label: string}[]
  data: any[]
  showEditModal: (item: any) => void
  showDeleteModal: (item: any) => void
}) {
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const handleSelectAllChange = () => {
    setSelectedRows(selectAll ? [] : [...data])
    setSelectAll(!selectAll)
  }
  
  const isSelected = (row: any) => selectedRows.some((r) => r.id === row.id)

  const handleCheckboxChange = (item: any) => {
    if (isSelected(item)) {
      setSelectedRows(selectedRows.filter((r) => r.id !== item.id))
    } else {
      setSelectedRows([...selectedRows, item])
    }
  }

  useEffect(() => {
    const allSelected = data.every((item) => isSelected(item))
    setSelectAll(allSelected)
  }, [selectedRows])

  return (
    <div className={className}>
        {data.length > 0 ?
          <div className='overflow-x-auto'>
            <table className='table-auto w-full text-gray-900'>
              <thead className='text-left'>
                <tr>
                  <th key={'checkbox'} className='pb-2 px-5'>
                    <input
                      type='checkbox'
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  { columns?.map((column) => (
                    <th key={column.key} scope='col' className='text-base text-myGreen font-medium pb-2 px-5'>
                      {column.label}
                    </th>
                  ))}
                  <th scope='col' className='text-base text-myGreen font-medium pb-2 px-5 sticky right-0 bg-myLightGreen'>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                { data?.map((item) => (
                  <tr
                    key={item.id}
                    className='w-full border-b text-sm [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 px-5'>
                      <input
                        type='checkbox'
                        checked={isSelected(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </td>
                    { columns.map((column) => (
                      <td key={column.key} className='whitespace-nowrap py-3 px-5'>
                        {item[column.key] ? item[column.key] : '-'}
                      </td>
                    ))}
                    <td className='whitespace-nowrap py-1 px-5 sticky bg-white right-0'>
                      <div className='flex gap-2'>
                        <div className='border-l p-1' />
                        <button
                          className='text-myOrange hover:bg-orange-100 rounded-full p-1'
                          onClick={() => showEditModal(item)}
                        >
                          <PencilIcon width={25} height={25} />
                        </button>
                        <button
                          className='text-red-700 hover:bg-red-100 rounded-full p-1'
                          onClick={() => showDeleteModal(item)}
                        >
                          <TrashIcon width={25} height={25} />
                        </button>
                      </div>
                    </td>
                  </tr>
                
                ))}
              </tbody>
            </table>
          </div>
          :
          <p className='text-myGreen text-center'>
            No hay datos registrados. Agregue uno nuevo.
          </p>
        }
      </div>
  )
}