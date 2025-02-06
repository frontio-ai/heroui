import type {HTMLMotionProps} from "@heroui/motion";

import {forwardRef, HTMLHeroUIProps} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";
import {clsx, dataAttr} from "@heroui/shared-utils";
import {AnimatePresence, LazyMotion, m} from "@heroui/motion";
import {mergeProps} from "@react-aria/utils";
import {Overlay} from "@react-aria/overlays";
import React from "react";

import {menuVariants} from "./navbar-menu-transitions";
import {useNavbarContext} from "./navbar-context";

export interface NavbarMenuProps extends HTMLHeroUIProps<"ul"> {
  children?: React.ReactNode;
  /**
   * The container element in which the navbar menu overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: Omit<HTMLMotionProps<"ul">, "ref">;
}

const domAnimation = () => import("@heroui/dom-animation").then((res) => res.default);

const NavbarMenu = forwardRef<"ul", NavbarMenuProps>((props, ref) => {
  const {className, children, portalContainer, motionProps, style, ...otherProps} = props;
  const domRef = useDOMRef(ref);

  const {slots, isMenuOpen, height, disableAnimation, classNames} = useNavbarContext();

  const styles = clsx(classNames?.menu, className);

  if (disableAnimation) {
    if (!isMenuOpen) return null;

    return (
      <Overlay portalContainer={portalContainer}>
        <ul
          ref={domRef}
          className={slots.menu?.({class: styles})}
          data-open={dataAttr(isMenuOpen)}
          style={{
            // @ts-expect-error
            "--navbar-height": typeof height === "number" ? `${height}px` : height,
          }}
          {...otherProps}
        >
          {children}
        </ul>
      </Overlay>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isMenuOpen ? (
        <Overlay portalContainer={portalContainer}>
          <LazyMotion features={domAnimation}>
            <m.ul
              ref={domRef}
              layoutScroll
              animate="enter"
              className={slots.menu?.({class: styles})}
              data-open={dataAttr(isMenuOpen)}
              exit="exit"
              initial="exit"
              style={{
                // @ts-expect-error
                "--navbar-height": typeof height === "number" ? `${height}px` : height,
                ...style,
              }}
              variants={menuVariants}
              {...mergeProps(motionProps, otherProps)}
            >
              {children}
            </m.ul>
          </LazyMotion>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
});

NavbarMenu.displayName = "HeroUI.NavbarMenu";

export default NavbarMenu;
