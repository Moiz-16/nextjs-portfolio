"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useRef } from "react";

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

export default function ParticlesContainer() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      glowRef.current?.style.setProperty("--mouse-x", `${event.clientX}px`);
      glowRef.current?.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <>
        <Particles
          id="tsparticles"
          className="pointer-events-none fixed inset-0 z-0 h-screen w-full bg-transparent"
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            background: {
              color: "transparent"
            },
            interactivity: {
              detectsOn: "window",
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse"
                },
                onClick: {
                  enable: true,
                  mode: "push"
                }
              },
              modes: {
                repulse: {
                  distance: 95,
                  duration: 0.45,
                  easing: "ease-out-quad",
                  factor: 0.45,
                  maxSpeed: 1.4,
                  speed: 0.55,
                  restore: {
                    delay: 0.08,
                    enable: true,
                    follow: false,
                    speed: 0.35
                  }
                },
                push: {
                  quantity: 2
                }
              }
            },
            particles: {
              number: {
                value: 210,
                density: {
                  enable: true
                }
              },
              color: {
                value: "#101010"
              },
              shape: {
                type: "circle"
              },
              opacity: {
                value: {
                  min: 0.22,
                  max: 0.92
                },
                animation: {
                  enable: true,
                  speed: 0.35,
                  sync: false,
                  startValue: "random"
                }
              },
              size: {
                value: {
                  min: 1.2,
                  max: 3.2
                }
              },
              links: {
                enable: false
              },
              move: {
                enable: true,
                speed: {
                  min: 0.025,
                  max: 0.13
                },
                direction: "none",
                outModes: {
                  default: "out"
                }
              }
            },
            detectRetina: true
          }}
        />
        <div
          ref={glowRef}
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle 8rem at var(--mouse-x, -20rem) var(--mouse-y, -20rem), rgba(16, 16, 16, 0.055), rgba(16, 16, 16, 0.025) 34%, transparent 72%)"
          }}
        />
      </>
    </ParticlesProvider>
  );
}
