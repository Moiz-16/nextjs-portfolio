"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.3);
  const { theme } = useTheme();

  return (
    <section
      ref={ref}
      id="experience"
      className="mb-28 scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My experience</SectionHeading>

      {/* Experience Overview - Non-interactive */}
      <div className="flex justify-center mb-12 flex-wrap gap-3">
        {experiencesData.map((item, index) => (
          <div
            key={index}
            className={`px-6 py-3 rounded-full text-sm md:text-base font-medium ${
              theme === "light"
                ? "bg-gray-100 text-gray-900"
                : "bg-gray-800 text-white"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* Experience Cards - Vertical List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {experiencesData.map((item, index) => (
          <motion.div
            key={index}
            className={`w-full p-8 rounded-2xl shadow-lg ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Icon and Title Row */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center">
                <div
                  className={`p-4 rounded-full mr-4 text-3xl ${
                    theme === "light" ? "bg-gray-100" : "bg-gray-700"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  {item.subtitle && (
                    <h4 className="text-lg text-gray-600 dark:text-gray-300">
                      {item.subtitle}
                    </h4>
                  )}
                </div>
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {item.date}
              </div>
            </div>

            {/* Description */}
            <div className="text-left mt-6 whitespace-pre-line">
              <p className="text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
