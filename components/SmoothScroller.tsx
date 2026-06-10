"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    // Scroll to top on every page load / reload
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Also reset document scroll in case browser restores position
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

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

  // Skip Lenis on admin pages — it intercepts all scroll events and
  // breaks overflow-y-auto inside the fixed-height dashboard layout
  if (isAdmin) {
    return <>{children}</>;
  }

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
