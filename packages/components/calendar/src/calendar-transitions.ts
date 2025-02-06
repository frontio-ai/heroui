import {Variants} from "@heroui/motion";

export const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
};

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: `${direction * 100}%`,
  }),
  center: {
    x: "0%",
  },
  exit: (direction: number) => ({
    x: `${direction * -100}%`,
  }),
};
