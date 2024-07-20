"use client"

import React from 'react'
import SectionHeading from './section-heading'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.section className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40
    scroll-mt-28'

    initial = {{opacity:0, y: 100 }}
    animate = {{opacity:100, y: 0 }}
    id="about"
    >
        <SectionHeading>About me</SectionHeading>
        <p className="mb-3">
                My name is{" "}
                <span className=" text-black font-semibold">Moiz Saleem</span>,
                I am a proactive and driven{" "}
                <span className=" text-black font-semibold">
                  Mathematics and Computer Science
                </span>{" "}
                undergraduate student at the
                <span className=" text-black font-semibold">
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
