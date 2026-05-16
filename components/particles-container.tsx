"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { loadBackgroundMaskPlugin } from "@tsparticles/plugin-background-mask";
import { useTheme } from "@/context/theme-context";

const particlesInit = async (engine: any) => {
  await loadFull(engine);
  await loadBackgroundMaskPlugin(engine);
};

export default function ParticlesContainer() {
  const { theme } = useTheme();

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        key={theme}
        id="tsparticles"
        className="absolute left-0 top-0 w-full h-[50rem] -z-10"
        options={{
          fullScreen: { enable: false },
          backgroundMask: {
            enable: true,
            cover: {
              color: theme === "dark" ? "#111827" : "#F9FAFB",
              opacity: 1
            }
          },
          background: {
            color: "transparent"
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "bubble"
              },
              onClick: {
                enable: true,
                mode: "push"
              }
            },
            modes: {
              bubble: {
                distance: 400,
                size: 100,
                duration: 2,
                opacity: 1
              },
              push: {
                quantity: 4
              }
            }
          },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true
              }
            },
            paint: {
              fill: {
                color: {
                  value: "#ffffff"
                },
                enable: true
              }
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 1
            },
            size: {
              value: {
                min: 1,
                max: 30
              }
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 1,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              outModes: {
                default: "bounce"
              }
            }
          },
          detectRetina: true
        }}
      />
    </ParticlesProvider>
  );
}
