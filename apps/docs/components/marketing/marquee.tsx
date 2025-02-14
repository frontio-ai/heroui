"use client";

import type {ReactNode} from "react";
import type {ScrollShadowProps} from "@heroui/react";

import {Children, cloneElement} from "react";
import {ScrollShadow} from "@heroui/react";
import {cn} from "@heroui/react";

interface MarqueeProps {
  className?: string;
  wrapperClassName?: string;
  reverse?: boolean;
  shadow?: boolean;
  duration?: number;
  pauseOnHover?: boolean;
  vertical?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

export const Marquee = ({
  className,
  wrapperClassName,
  reverse,
  duration = 40,
  shadow = false,
  pauseOnHover = false,
  vertical = false,
  children,
  ...props
}: MarqueeProps) => {
  const shadowProps: ScrollShadowProps = {
    isEnabled: shadow,
    offset: -20,
    size: 300,
    orientation: "vertical",
    visibility: "both",
  };

  const Wrapper = shadow ? ScrollShadow : "div";

  const componentProps = shadow ? {...props, ...shadowProps} : props;

  return (
    <Wrapper
      {...componentProps}
      className={cn(
        "flex [--gap:1rem]",
        {
          "w-full": !vertical,
          "overflow-y-hidden": vertical,
          "overflow-x-hidden": !vertical,
          "max-h-[calc(100vh_-_200px)]": vertical,
        },
        className,
      )}
      style={{
        // @ts-ignore
        "--duration": `${duration}s`,
      }}
    >
      <div
        className={cn(
          "flex w-max items-stretch gap-(--gap)",
          {
            "flex-col": vertical,
            "h-full": vertical,
            "animate-scrolling-banner": !vertical,
            "animate-scrolling-banner-vertical": vertical,
            "[animation-direction:reverse]": reverse,
            "hover:[animation-play-state:paused]": pauseOnHover,
          },
          wrapperClassName,
        )}
      >
        {Children.map(children, (child) =>
          child && typeof child === "object" && "type" in child ? cloneElement(child) : child,
        )}
      </div>
    </Wrapper>
  );
};

export default Marquee;
