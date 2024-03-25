import Image from 'next/image'
import ClientsIcon from '../icons/clients'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <span className='text-2xl'>Promart - Ejercicio Técnico</span>
      <Link href={'/clients'} className='flex flex-col'>
        <div
          className='flex rounded-full items-center p-2 text-myOrange bg-myYellow hover:bg-myOrangeBg hover:text-white focus:ring-2 focus:ring-white transition duration-200 ease-in-out transform hover:scale-110 mt-5'
        >
          <ClientsIcon width={100} height={100} />
        </div>
        <span className='flex justify-center text-myYellow mt-2'>Clientes</span>
      </Link>
    </main>
  )
}
