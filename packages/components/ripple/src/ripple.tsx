import type {RippleType} from "./use-ripple";
import type {FC} from "react";
import type {HTMLHeroUIProps} from "@heroui/system";
import type {HTMLMotionProps} from "@heroui/motion";

import {AnimatePresence, m, LazyMotion} from "@heroui/motion";
import {clamp} from "@heroui/shared-utils";

export interface RippleProps extends HTMLHeroUIProps<"span"> {
  ripples: RippleType[];
  color?: string;
  motionProps?: Omit<HTMLMotionProps<"span">, "ref">;
  style?: React.CSSProperties;
  onClear: (key: React.Key) => void;
}

const domAnimation = () => import("@heroui/dom-animation").then((res) => res.default);

const Ripple: FC<RippleProps> = (props) => {
  const {ripples = [], motionProps, color = "currentColor", style, onClear} = props;

  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);

        return (
          <LazyMotion key={ripple.key} features={domAnimation}>
            <AnimatePresence mode="popLayout">
              <m.span
                animate={{transform: "scale(2)", opacity: 0}}
                className="heroui-ripple"
                exit={{opacity: 0}}
                initial={{transform: "scale(0)", opacity: 0.35}}
                style={{
                  position: "absolute",
                  backgroundColor: color,
                  borderRadius: "100%",
                  transformOrigin: "center",
                  pointerEvents: "none",
                  overflow: "hidden",
                  inset: 0,
                  zIndex: 0,
                  top: ripple.y,
                  left: ripple.x,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  ...style,
                }}
                transition={{duration}}
                onAnimationComplete={() => {
                  onClear(ripple.key);
                }}
                {...motionProps}
              />
            </AnimatePresence>
          </LazyMotion>
        );
      })}
    </>
  );
};

Ripple.displayName = "HeroUI.Ripple";

export default Ripple;
