"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { TypeAnimation } from "react-type-animation";
import { BsArrowRight, BsGithub, BsLinkedin } from 'react-icons/bs'
import { FaGithubSquare } from 'react-icons/fa';
import { useInView} from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context'
import { useSectionInView } from '@/lib/hooks';


export default function Intro() {
    const { ref } = useSectionInView("Home", 0.5)
    const {setActiveSection, setTimeOfLastClick} = useActiveSectionContext();


  return (
    <section ref={ref} id='home' className='scroll-mt-[100rem]'>
        <motion.div className='flex flex-col items-center justify-center'
        initial={{opacity: 0, scale: 0 }}
        animate={{opacity: 1, scale: 1 }}
        transition={{type: "tween", delay: 0.1, duration: 0.3}}
        >
        <h1 className="md:text-7xl sm:text-4xl text-4xl font-bold text-black">
            Hi! I am Moiz Saleem
        </h1>
        <h1 className="md:text-9xl sm:text-6xl text-7xl font-bold md:py-6 py-3">
            <TypeAnimation
              
              sequence={["Student", 1500, "Developer", 1500]}
              wrapper="span"
              speed={65}
              repeat={Infinity}
            />
        </h1>
        
        </motion.div>
        <motion.div className='flex flex-col sm:flex-row items-center justify-center gap-5 
        px-4 py-8 text-lg font-medium' 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{delay: 0.2}}
        >
            <Link href="#contact" className='group bg-gray-900 text-white px-7 py-3 flex 
            items-center  gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 
            hover:bg-gray-950 active:scale-105 transition'
            onClick={() => {
                setActiveSection("Contact")
                setTimeOfLastClick(Date.now());
            }}
            >
                Contact me here <BsArrowRight className='group-hover:opacity-60 group-hover:translate-x-2 transition '/>

            </Link>
            <a className='bg-white p-4 flex items-center gap-2 text-gray-700 rounded-full
            focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border
            dark:text-white/60 dark:bg-white/10 border-black/10'
            href='https://linkedin.com' target="_blank">
                <BsLinkedin/>
            </a>
            <a className='bg-white p-4 flex items-center gap-2 text-gray-700 rounded-full text-[1.25rem]
            focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border
            dark:text-white/60 dark:bg-white/10 border-black/10'
            href='https://github.com' target="_blank">
                <FaGithubSquare/>
            </a>


        </motion.div>

    </section>
  )
}
