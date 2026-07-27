import Header from '@/components/header'
import './globals.css'
import ActiveSectionContextProvider from '@/context/active-section-context'
import Footer from '@/components/footer'
import ThemeSwitch from '@/components/theme-switch'
import ThemeContextProvider from '@/context/theme-context'
import ParticlesContainer from '@/components/particles-container'

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
    
    <html lang="en" className='!scroll-smooth ' >
      <body>
        {/* <div className=' bg-[#1e96fc] absolute top[-6rem] -z-10 right-[11rem] h-[29.25rem]
         w-[31.25rem] rounded-full blur-[9rem] sm:w-[68.75rem]'></div>
        <div className='  bg-[#072ac8] absolute top[-1rem] -z-10 left-[-35rem] h-[26.25rem]
         w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem]
         lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div> */}


        <ThemeContextProvider>
          <ParticlesContainer />
          <div className="relative z-10">
            <ActiveSectionContextProvider>
              <Header/>
              {children}
              <Footer/>
              <ThemeSwitch/>
            </ActiveSectionContextProvider>
          </div>
        </ThemeContextProvider>
        
        
      </body>
    </html>
  )
}
