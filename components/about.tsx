"use client"

import React, { useEffect } from 'react'
import SectionHeading from './section-heading'
import { motion } from 'framer-motion'
import { useInView} from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context'
import { useSectionInView } from '@/lib/hooks'

export default function About() {
  const { ref } = useSectionInView("About", 0.8)
  
  return (
    <motion.section ref={ref} className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40
    scroll-mt-28'

    initial = {{opacity:0, y: 100 }}
    animate = {{opacity:100, y: 0 }}
    transition={{ delay: 0.175 }}
    id="about"
    >
        <SectionHeading>About me</SectionHeading>
        <p className="mb-5">
                My name is{" "}
                <span className="  font-semibold">Moiz Saleem</span>,
                I am a proactive and driven student pursuing a Bachelor's degree in{" "}
                <span className="  font-semibold">
                  Mathematics and Computer Science
                </span>{" "}
                at the
                <span className=" font-semibold">
                  {" "}
                  University of Bristol
                </span>{" "}
                with aspirations to become a quantitive developer. 
              </p>
        <p className="mb-5">
        My academic journey has equipped me with a solid foundation in both theoretical 
        and applied mathematics, as well as extensive programming skills. I have a deep-seated
        passion for leveraging mathematical models and computational techniques to solve
        real-world problems, particularly in the finance industry, and I am also passionate 
        about developing and optimising algorithmic trading strategies.
        </p>
        <p >
        I am excited to connect with like-minded individuals and explore opportunities that allow me
        to apply my skills. Feel free to reach out to me on LinkedIn or email.
        </p>

    </motion.section>
  )
}
