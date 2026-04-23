"use client";

import { useEffect } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Update ScrollTrigger on every tick to sync with Lenis
    function update(time: number) {
      ScrollTrigger.update();
    }

    gsap.ticker.add(update);

    // Turn off lag smoothing in GSAP to prevent any jittering
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
