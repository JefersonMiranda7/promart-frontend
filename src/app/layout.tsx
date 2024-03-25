import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MyClients App',
  description: 'Developed by Jeferson Miranda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <head>
        <meta name='robots' content='index, follow' />
      </head>
      <body className={poppins.className}>
        <main className='p-32'>{children}</main>
      </body>
    </html>
  )
}
