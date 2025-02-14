"use client";

import {Button, Chip} from "@heroui/react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

import {sectionWrapper, title, titleWrapper, subtitle} from "../primitives";

import Marquee from "./marquee";

import {useIsMobile} from "@/hooks/use-media-query";

export const HeroUIProSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useIsMobile();
  const {theme} = useTheme();
  const isDarkMode = theme === "dark";

  let imgSrc: string;

  if (isDarkMode) {
    imgSrc = isMobile
      ? "/images/herouipro-section-background@mobile.webp"
      : "/images/herouipro-section-background.webp";
  } else {
    imgSrc = isMobile
      ? "/images/herouipro-section-background-light@mobile.webp"
      : "/images/herouipro-section-background-light.webp";
  }

  const mobileClassName: string = isDarkMode
    ? "h-full w-full bg-[radial-gradient(at_40%_80%,_rgba(255,255,255,_0)_5%,_rgba(0,0,0,_0.8)_50%,_rgba(0,0,0,1)_100%)]"
    : "h-full w-full bg-[radial-gradient(at_40%_80%,_rgba(0,0,0,_0)_5%,_rgba(255,255,255,_0.8)_50%,_rgba(255,255,255,1)_100%)]";

  const webClassName: string = isDarkMode
    ? "h-full w-full bg-[radial-gradient(at_80%_50%,_rgba(255,255,255,_0)_20%,_rgba(0,0,0,_0.8)_40%,_rgba(0,0,0,1)_100%)]"
    : "h-full w-full bg-[radial-gradient(at_80%_50%,_rgba(0,0,0,_0)_20%,_rgba(255,255,255,_0.9)_40%,_rgba(255,255,255,1)_100%)]";

  if (!mounted) return null;

  const CheckmarkIcon = () => (
    <svg fill="none" height="11" viewBox="0 0 13 11" width="13" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 6.4L4.14286 10L12 1"
        stroke="#006FEE"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <section className={sectionWrapper({class: "mt-16 lg:mt-44 overflow-hidden"})}>
      <div className="flex flex-col gap-8 min-h-[480px]">
        <div className="z-30 flex w-screen h-full flex-col items-start justify-center leading-8 pt-4">
          <Chip
            classNames={{
              base: "ml-0.5 transition-colors bg-linear-to-br from-cyan-600 to-blue-600",
              content: "text-tiny font-semibold",
            }}
            color="primary"
            size="sm"
          >
            PRO
          </Chip>
          <div className={titleWrapper({class: "mt-2 inline md:block"})}>
            <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
              Ship&nbsp;
            </h1>
            <h1
              className={title({
                size: "lg",
                color: "blue",
                class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]",
              })}
            >
              faster&nbsp;
            </h1>
            <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
              with&nbsp;
            </h1>
            <div className="flex flex-col sm:flex-row">
              <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
                beautiful&nbsp;
              </h1>
              <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
                components
              </h1>
            </div>
          </div>
          <p className={subtitle({class: "pr-12 text-foreground-500"})}>
            Premade templates of over 210+ beautiful and responsive components, professionally
            created by the team behind HeroUI.
          </p>
          <div className="mt-4 text-foreground-600 font-medium">
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              210+ Components
            </div>
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Lifetime Access
            </div>
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Free Updates
            </div>
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Figma Files Included
            </div>
          </div>
          <div className="mt-4">
            <Button
              as={"a"}
              className="px-6 flex items-center"
              color="primary"
              href="https://heroui.pro?utm_source=heroui.com&utm_medium=heroui-homepage-section"
              rel="noopener noreferrer"
              target="_blank"
            >
              Explore HeroUI Pro
              <svg
                fill="none"
                height="21"
                viewBox="0 0 20 21"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0254 5.44189L17.0837 10.5002L12.0254 15.5586"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M2.91602 10.5H16.941"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden">
          <Marquee
            vertical
            className="h-78 hidden md:flex w-screen mt-4 md:absolute md:top-0 md:inset-0 isolate md:max-h-dvh"
            duration={isMobile ? 240 : 60}
          >
            <img
              alt="Hero Background"
              className="w-full"
              height={3255}
              loading="lazy"
              src={imgSrc}
              width={1920}
            />
          </Marquee>
          <div className="absolute md:hidden inset-0 pointer-events-none top-0 z-20">
            <div className={mobileClassName} />
          </div>

          <div className="absolute hidden md:block md:inset-0 md:pointer-events-none md:top-0 md:z-20">
            <div className={webClassName} />
          </div>
        </div>
      </div>
    </section>
  );
};
