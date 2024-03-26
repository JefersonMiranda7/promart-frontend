export default function LoaderIcon({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return (
    <svg
      className={'icon icon-tabler icon-tabler-loader-2'}
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
      <path d='M12 3a9 9 0 1 0 9 9' />
    </svg>
  )
}
