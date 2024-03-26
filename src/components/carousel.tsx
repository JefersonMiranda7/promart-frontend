import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className='flex justify-center mx-24 my-5 rounded-lg'>
      {images.slice(index, index + 3).map((image, i) => (
        <Image
          key={i}
          className='w-4/12 transition ease transform'
          src={image}
          style={{ display: i === index ? 'block' : 'none' }}
          width={400}
          height={400}
          alt={`Slide ${i}`}
        />
      ))}
    </div>
  )
}
