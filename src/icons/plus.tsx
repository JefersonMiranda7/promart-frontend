export default function PlusIcon({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return (
    <svg
      className={'icon icon-tabler icon-tabler-plus'}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 5l0 14' />
      <path d='M5 12l14 0' />
    </svg>
  )
}
