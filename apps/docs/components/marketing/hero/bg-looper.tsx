"use client";

import {clsx} from "@heroui/shared-utils";

import {useIsMounted} from "@/hooks/use-is-mounted";

export const BgLooper = () => {
  const isMounted = useIsMounted();

  return (
    <div
      className={clsx(
        "absolute -top-20 lg:top-10 w-screen h-screen z-0 opacity-0 overflow-hidden",
        "data-[mounted=true]:opacity-100 transition-opacity",
        "bg-left bg-no-repeat bg-[url('/gradients/looper-pattern.svg')]",
        "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-[-1]",
        "after:bg-linear-to-r after:from-transparent after:to-background dark:after:to-black after:z-[-1]",
      )}
      data-mounted={isMounted}
    />
  );
};
