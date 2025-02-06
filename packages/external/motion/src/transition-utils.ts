import type {Target, TargetAndTransition, Transition} from "motion/react";

type WithMotionState<P> = Partial<Record<"enter" | "exit", P>>;

export type TransitionConfig = WithMotionState<Transition>;

export type TransitionEndConfig = WithMotionState<Target>;

export type TransitionProperties = {
  /**
   * Custom `transition` definition for `enter` and `exit`
   */
  transition?: TransitionConfig;
  /**
   * Custom `transitionEnd` definition for `enter` and `exit`
   */
  transitionEnd?: TransitionEndConfig;
};

type TargetResolver<P = {}> = (props: P & TransitionProperties) => TargetAndTransition;

type Variant<P = {}> = TargetAndTransition | TargetResolver<P>;

type Variants<P = {}> = Record<
  string,
  {
    enter: Variant<P>;
    exit: Variant<P>;
    initial?: Variant<P>;
  }
>;

export const TRANSITION_EASINGS = {
  ease: [0.36, 0.66, 0.4, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.155, 1.105, 0.295, 1.12],
  springOut: [0.57, -0.15, 0.62, 0.07],
  softSpring: [0.16, 1.11, 0.3, 1.02],
} as const;

export const TRANSITION_DEFAULTS = {
  enter: {
    duration: 0.2,
    ease: TRANSITION_EASINGS.easeOut,
  },
  exit: {
    duration: 0.1,
    ease: TRANSITION_EASINGS.easeIn,
  },
} as const;

export const TRANSITION_VARIANTS: Variants = {
  scaleSpring: {
    enter: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.2,
      },
    },
    exit: {
      transform: "scale(0.85)",
      opacity: 0,
      transition: {
        type: "easeOut",
        duration: 0.15,
      },
    },
  },
  scaleSpringOpacity: {
    initial: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transform: "scale(0.96)",
      transition: {
        type: "easeOut",
        bounce: 0,
        duration: 0.15,
      },
    },
  },
  scale: {
    enter: {scale: 1},
    exit: {scale: 0.95},
  },
  scaleFadeIn: {
    enter: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: TRANSITION_EASINGS.easeIn,
      },
    },
    exit: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: TRANSITION_EASINGS.easeOut,
      },
    },
  },
  scaleInOut: {
    enter: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
    },
    exit: {
      transform: "scale(1.03)",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: TRANSITION_EASINGS.ease,
      },
    },
  },
  fade: {
    enter: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: TRANSITION_EASINGS.ease,
      },
    },
  },
  collapse: {
    enter: {
      opacity: 1,
      height: "auto",
      transition: {
        height: {
          type: "spring",
          bounce: 0,
          duration: 0.3,
        },
        opacity: {
          easings: "ease",
          duration: 0.4,
        },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        easings: "ease",
        duration: 0.3,
      },
    },
  },
};
