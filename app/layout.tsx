import Header from '@/components/header'
import './globals.css'
import ActiveSectionContextProvider from '@/context/active-section-context'
import ThemeContextProvider from '@/context/theme-context'
import ElasticCursor from '@/components/elastic-cursor'
import ScrollProgress from '@/components/scroll-progress'
import { Space_Grotesk, Unbounded } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
})

export const metadata = {
  title: 'Moiz | Personal Portfolio',
  description: '...',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${unbounded.variable} !scroll-smooth`}
    >
      <body>
        {/* <div className=' bg-[#1e96fc] absolute top[-6rem] -z-10 right-[11rem] h-[29.25rem]
         w-[31.25rem] rounded-full blur-[9rem] sm:w-[68.75rem]'></div>
        <div className='  bg-[#072ac8] absolute top[-1rem] -z-10 left-[-35rem] h-[26.25rem]
         w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem]
         lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div> */}


        <ThemeContextProvider>
          <div className="relative z-10">
            <ActiveSectionContextProvider>
              <ScrollProgress/>
              <Header/>
              {children}
              <ElasticCursor/>
            </ActiveSectionContextProvider>
          </div>
        </ThemeContextProvider>
        
        
      </body>
    </html>
  )
}
