import type {ModalProviderProps} from "@react-aria/overlays";
import type {ProviderContextProps} from "./provider-context";
import type {Href, RouterOptions} from "@react-types/shared";

import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {RouterProvider} from "@react-aria/utils";
import {OverlayProvider} from "@react-aria/overlays";
import {useMemo} from "react";
import {MotionConfig, MotionGlobalConfig} from "framer-motion";

import {ProviderContext} from "./provider-context";

export interface HeroUIProviderProps
  extends Omit<ModalProviderProps, "children">,
    ProviderContextProps {
  children: React.ReactNode;
  /**
   * Controls whether `framer-motion` animations are skipped within the application.
   * This property is automatically enabled (`true`) when the `disableAnimation` prop is set to `true`,
   * effectively skipping all `framer-motion` animations. To retain `framer-motion` animations while
   * using the `disableAnimation` prop for other purposes, set this to `false`. However, note that
   * animations in HeroUI Components are still omitted if the `disableAnimation` prop is `true`.
   */
  skipFramerMotionAnimations?: boolean;
  /**
   * Defines a new default transition for the entire tree.
   * @default "never"
   * See: https://www.framer.com/motion/motion-config/#props
   */
  reducedMotion?: "user" | "always" | "never";
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: I18nProviderProps["locale"];
  /**
   * Provides a client side router to all nested components such as
   * Link, Menu, Tabs, Table, etc.
   */
  navigate?: (path: Href, routerOptions: RouterOptions | undefined) => void;
  /**
   * Convert an `href` provided to a link component to a native `href`
   * For example, a router might accept hrefs relative to a base path,
   * or offer additional custom ways of specifying link destinations.
   * The original href specified on the link is passed to the navigate function of the RouterProvider,
   * and useHref is used to generate the full native href to put on the actual DOM element.
   */
  useHref?: (href: Href) => string;
}

export const HeroUIProvider: React.FC<HeroUIProviderProps> = ({
  children,
  navigate,
  disableAnimation,
  useHref,
  disableRipple = false,
  skipFramerMotionAnimations = disableAnimation,
  reducedMotion = "never",
  validationBehavior,
  locale = "en-US",
  labelPlacement,
  // if minDate / maxDate are not specified in `defaultDates`
  // then they will be set in `use-date-input.ts` or `use-calendar-base.ts`
  defaultDates,
  createCalendar,
  spinnerVariant,
  ...otherProps
}) => {
  let contents = children;

  if (navigate) {
    contents = (
      <RouterProvider navigate={navigate} useHref={useHref}>
        {contents}
      </RouterProvider>
    );
  }

  const context = useMemo<ProviderContextProps>(() => {
    if (disableAnimation && skipFramerMotionAnimations) {
      MotionGlobalConfig.skipAnimations = true;
    }

    return {
      createCalendar,
      defaultDates,
      disableAnimation,
      disableRipple,
      validationBehavior,
      labelPlacement,
      spinnerVariant,
    };
  }, [
    createCalendar,
    defaultDates?.maxDate,
    defaultDates?.minDate,
    disableAnimation,
    disableRipple,
    validationBehavior,
    labelPlacement,
    spinnerVariant,
  ]);

  return (
    <ProviderContext value={context}>
      <I18nProvider locale={locale}>
        <MotionConfig reducedMotion={reducedMotion}>
          <OverlayProvider {...otherProps}>{contents}</OverlayProvider>
        </MotionConfig>
      </I18nProvider>
    </ProviderContext>
  );
};
