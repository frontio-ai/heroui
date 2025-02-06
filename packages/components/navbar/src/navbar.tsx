import {forwardRef} from "@heroui/system";
import {pickChildren} from "@heroui/react-utils";
import {LazyMotion, m} from "@heroui/motion";
import {mergeProps} from "@react-aria/utils";

import {hideOnScrollVariants} from "./navbar-transitions";
import {UseNavbarProps, useNavbar} from "./use-navbar";
import {NavbarProvider} from "./navbar-context";
import NavbarMenu from "./navbar-menu";

export interface NavbarProps extends Omit<UseNavbarProps, "hideOnScroll"> {
  children?: React.ReactNode | React.ReactNode[];
}

const domAnimation = () => import("@heroui/dom-animation").then((res) => res.default);

const Navbar = forwardRef<"div", NavbarProps>((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbar({...otherProps, ref});

  const Component = context.Component;

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu);

  const content = (
    <>
      <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
      {menu}
    </>
  );

  return (
    <NavbarProvider value={context}>
      {context.shouldHideOnScroll ? (
        <LazyMotion features={domAnimation}>
          <m.nav
            animate={context.isHidden ? "hidden" : "visible"}
            initial={false}
            variants={hideOnScrollVariants}
            {...mergeProps(context.getBaseProps(), context.motionProps)}
          >
            {content}
          </m.nav>
        </LazyMotion>
      ) : (
        <Component {...context.getBaseProps()}>{content}</Component>
      )}
    </NavbarProvider>
  );
});

Navbar.displayName = "HeroUI.Navbar";

export default Navbar;
