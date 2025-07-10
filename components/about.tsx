"use client";

import React, { useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About", 0.8);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40
    scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-5">
        My name is <span className="  font-semibold">Moiz Saleem</span>, I am
        currently pursuing a Bachelor&apos;s degree in{" "}
        <span className="  font-semibold">
          Mathematics and Computer Science
        </span>{" "}
        at the
        <span className=" font-semibold"> University of Bristol</span> ,and I
        have a particular interest in quantitative finance and its potential to
        drive innovation across financial markets.
      </p>
      <p className="mb-5">
        My academic background has given me a strong foundation in both pure and
        applied mathematics, alongside practical experience in programming and
        data analysis. I’m especially passionate about developing and optimising
        algorithmic trading strategies, and I’m fascinated by how mathematical
        modelling, probability, statistics, and machine learning can be used to
        solve real-world problems in finance and beyond.
      </p>
      <p>
        I’m always eager to learn, collaborate, and contribute to projects at
        the intersection of technology and finance. Feel free to get in touch
        via LinkedIn or email.
      </p>
    </motion.section>
  );
}
