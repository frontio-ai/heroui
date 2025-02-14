"use client";

import {useRef} from "react";
import {Button} from "@heroui/react";
import {usePostHog} from "posthog-js/react";

export const CustomButton = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const posthog = usePostHog();

  const handleConfetti = async () => {
    const {clientWidth, clientHeight} = document.documentElement;
    const boundingBox = buttonRef.current?.getBoundingClientRect?.();

    const targetY = boundingBox?.y ?? 0;
    const targetX = boundingBox?.x ?? 0;
    const targetWidth = boundingBox?.width ?? 0;

    const targetCenterX = targetX + targetWidth / 2;
    const confetti = (await import("canvas-confetti")).default;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 70,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    });

    posthog.capture("LandingPage - Confetti Button", {
      action: "press",
      category: "landing-page",
    });
  };

  return (
    <Button
      ref={buttonRef}
      disableRipple
      className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:duration-500! hover:after:scale-150 hover:after:opacity-0"
      size="lg"
      onPress={handleConfetti}
    >
      Press me
    </Button>
  );
};
