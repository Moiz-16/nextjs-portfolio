import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Moiz | Personal Portfolio',
  description: '...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'${inter.className} bg-gray-50 text-gray-950'}>
        <div className=' bg-[#d6afff] absolute top[-6rem] -z-10 right-[11rem] h-[31.25rem]
         w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className=' bg-[#8ce4ff] absolute top[-1rem] left-[-35rem] h-[31.25rem]
         w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem]
         lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div>
        
        {children}
      </body>
    </html>
  )
}
