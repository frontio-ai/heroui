import {tv} from "tailwind-variants";

export const titleWrapper = tv({
  base: "flex flex-col gap-2 items-start justify-center w-full",
});

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[clamp(1rem,10vw,2rem)] sm:text-[clamp(1rem,10vw,3rem)] lg:text-5xl",
      lg: "text-4xl lg:text-6xl",
      xl: "text-5xl md:text-6xl lg:text-7xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: ["violet", "yellow", "blue", "cyan", "green", "pink", "foreground"],
      class: "bg-clip-text text-transparent bg-linear-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-medium lg:text-large font-normal text-default-500 block max-w-full",
  variants: {
    fullWidth: {
      true: "w-full!",
    },
  },
});

export const sectionWrapper = tv({
  base: "relative z-10 flex flex-col gap-2 w-full",
  variants: {
    isBlurred: {
      true: [
        "bg-transparent",
        "dark:bg-transparent",
        "before:bg-background/10",
        "before:content-['']",
        "before:block",
        "before:z-[-1]",
        "before:absolute",
        "before:inset-0",
        "before:backdrop-blur-md",
        "before:backdrop-saturate-200",
      ],
    },
  },
});
