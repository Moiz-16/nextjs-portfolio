"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import { useTheme } from "@/context/theme-context";
import { FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.2);
  const { theme } = useTheme();

  return (
    <section ref={ref} id="projects" className="mb-28 scroll-mt-28">
      <SectionHeading>My projects</SectionHeading>

      <div className="flex flex-wrap justify-center gap-8 px-4 max-w-[90rem] mx-auto">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl overflow-hidden flex flex-col w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.34rem)] ${
              theme === "light"
                ? "bg-white shadow-lg border border-gray-100"
                : "bg-gray-800 border border-gray-700"
            } hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300 group`}
          >
            {/* Project Image */}
            <div className="h-60 w-full relative overflow-hidden px-4 pt-4 pb-2">
              <div className="w-full h-full relative rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover object-top "
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={95}
                  priority={index < 3}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-200 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                {/* Tags Overlay */}
                {/* <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-blue-600/90 text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-800/80 text-white backdrop-blur-sm">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div> */}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow pt-2 p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors flex items-center">
                {project.title}
                {project.link && (
                  <FiExternalLink
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    size={16}
                  />
                )}
              </h3>

              <p
                className={`mb-5 text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {project.description}
              </p>

              {/* All Tags (visible on larger screens) */}
              <div className="mt-auto hidden md:flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`text-xs py-1 px-3 rounded-full ${
                      theme === "light"
                        ? "bg-blue-500 text-gray-50 hover:bg-blue-400"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    } transition-colors`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link Button */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium py-2 px-4 rounded-lg transition-all ${
                    theme === "light"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } hover:translate-y-[-2px]`}
                >
                  View Project <FiExternalLink />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
