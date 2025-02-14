"use client";

import {usePostHog} from "posthog-js/react";
import NextLink from "next/link";

export const HeroUIProCallout = () => {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("HeroUI Pro Banner", {
      action: "click",
      category: "heroui-callout",
    });
  };

  return (
    <div className="relative w-full max-w-[12rem] flex flex-col items-center border border-default/60 hover:border-default/90 rounded-xl py-6 px-2 cursor-pointer">
      <div>
        <p className="leading-[1.025] tracking-tight text-center text-large font-semibold">
          Ship&nbsp;
          <span className="bg-clip-text text-transparent bg-linear-to-b from-[#5EA2EF] to-[#0072F5]">
            faster
          </span>
          <br />
          with beautiful
          <br />
          components
        </p>
        <p className="text-center text-xs mt-2 px-3 font-medium text-default-500 dark:text-default-400 leading-tight">
          Discover 210+ stunning components by HeroUI
        </p>
      </div>
      <div className="mt-3 w-fit flex group items-center text-foreground hover:shadow-sm relative overflow-hidden rounded-full p-[2px]">
        <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#338EF7_0%,#F54180_50%,#338EF7_100%)]" />
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background transition-background p-2.5 text-xs font-medium hover:font-semibold text-foreground backdrop-blur-3xl">
          Explore Components
        </div>
      </div>
      <NextLink
        className="absolute inset-0 z-1"
        href="https://heroui.pro/components?utm_source=heroui.com&utm_medium=callout"
        onClick={handleClick}
      />
    </div>
  );
};
