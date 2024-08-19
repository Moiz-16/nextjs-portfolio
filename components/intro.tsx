"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { TypeAnimation } from "react-type-animation";
import { BsArrowRight, BsGithub, BsLinkedin } from 'react-icons/bs'
import { FaGithub} from 'react-icons/fa6';
import { useInView} from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context'
import { useSectionInView } from '@/lib/hooks';
import { SocialIcon } from 'react-social-icons'
import { useTheme } from '@/context/theme-context';



export default function Intro() {
    const { ref } = useSectionInView("Home", 0.5)
    const {setActiveSection, setTimeOfLastClick} = useActiveSectionContext();
    const {theme } = useTheme();


  return (
    <section ref={ref} id='home' className='scroll-mt-[100rem] my-28'>
        <motion.div className='flex flex-col items-center justify-center'
        initial={{opacity: 0, scale: 0 }}
        animate={{opacity: 1, scale: 1 }}
        transition={{type: "tween", delay: 0.1, duration: 0.3}}
        >
        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold text-black">
            Hi! I am Moiz Saleem
        </h1>
        <h1 className="md:text-9xl sm:text-7xl text-7xl font-bold text-black md:py-6 py-3">
            <TypeAnimation
              
              sequence={["Student", 2000, "Developer", 2000]}
              wrapper="span"
              speed={65}
              repeat={Infinity}
            />
        </h1>
        
        </motion.div>
        <motion.div className='flex flex-col sm:flex-row items-center justify-center gap-5 
        px-4 py-10 text-lg font-medium' 
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
            <div className='bg-white bg-opacity-90 flex items-center gap-2 rounded-full
            focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer border
             dark:bg-gray-950 dark:bg-opacity-75 border-black/10 '
            >
                <div><SocialIcon  bgColor="transparent" fgColor="currentColor"
                style={{ color: theme === "light" ? "black" : "white", }}   url="https://www.linkedin.com/in/moiz-saleem/" /></div>
                
            </div>
            <div className='bg-white bg-opacity-90 flex items-center gap-2 rounded-full
            focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer border
             dark:bg-gray-950 border-black/10 dark:bg-opacity-75'
            >
                <div><SocialIcon  bgColor="transparent" fgColor="currentColor"
                style={{ color: theme === "light" ? "black" : "white", }}   url="https://github.com/Moiz-16" /></div>
                
            </div>
{/* 
            <a>
                <SocialIcon url="https://linkedin.com/in/" />

            </a>
            <a href="https://github.com/Moiz459">
              <img
                src={githubIcon.src}
                alt="My GitHub Profile"
                className="  sm:h-12 h-10"
                
              />
            </a>

            <a href="https://www.linkedin.com/in/moiz-saleem-144a9a1a2/">
              <img
                src={linkedinIcon.src}
                alt="My LinkedIn profile"
                className=" sm:h-12 h-10"
              />
            </a> */}


        </motion.div>

    </section>
  )
}
