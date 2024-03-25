export default function SearchIcon({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return (
    <svg
      className={'icon icon-tabler icon-tabler-search'}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
      <path d='M21 21l-6 -6' />
    </svg>
  )
}
