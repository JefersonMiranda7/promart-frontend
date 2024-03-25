import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchIcon from '../icons/search'

export default function Search ({
  className,
  placeholder
}: {
  className: string
  placeholder: string
}) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    if (term) params.set('query', term)
    else params.delete('query')

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={className}>
      <input
        className='flex grow py-1 font-normal rounded-l-full text-base text-black px-4 justify-center'
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button
        type='button'
        disabled
        className='flex rounded-r-full px-4 items-center text-myOrange bg-myYellow'
      >
        <SearchIcon width={25} height={25} />
      </button>
    </div>
  )
}