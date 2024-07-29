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
    id="about"
    >
        <SectionHeading>About me</SectionHeading>
        <p className="mb-3">
                My name is{" "}
                <span className="  font-semibold">Moiz Saleem</span>,
                I am a proactive and driven{" "}
                <span className="  font-semibold">
                  Mathematics and Computer Science
                </span>{" "}
                undergraduate student at the
                <span className=" font-semibold">
                  {" "}
                  University of Bristol
                </span>{" "}
                with a passion for mathematics, finance and technology. I have
                cultivated valuable experience in these fields through a
                multitude of extracurricular engagements and personal projects,
                and my primary interests centre on, AI & machine learning,
                financial technology and probability and statistics. I'm excited
                to connect with like-minded individuals and explore the
                limitless potential in the worlds of mathematics and technology.
              </p>

    </motion.section>
  )
}
