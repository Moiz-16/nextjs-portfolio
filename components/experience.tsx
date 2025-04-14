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
  const [activeExperience, setActiveExperience] = useState(0);

  // Function to scroll to selected experience
  const scrollToExperience = (index: number) => {
    setActiveExperience(index);

    // Add a small delay to ensure DOM is updated
    setTimeout(() => {
      const element = document.getElementById(`experience-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <section
      ref={ref}
      id="experience"
      className="mb-28 scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My experience</SectionHeading>

      {/* Experience Navigation */}
      <div className="flex justify-center mb-12 flex-wrap gap-3">
        {experiencesData.map((item, index) => (
          <motion.button
            key={index}
            className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all ${
              activeExperience === index
                ? theme === "light"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
                : theme === "light"
                ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            onClick={() => scrollToExperience(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.title}
          </motion.button>
        ))}
      </div>

      {/* Experience Cards - Vertical List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {experiencesData.map((item, index) => (
          <motion.div
            key={index}
            id={`experience-${index}`}
            className={`w-full p-8 rounded-2xl shadow-lg ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            } ${activeExperience === index ? "border-2 border-blue-500" : ""}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
