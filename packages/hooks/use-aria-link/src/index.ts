import {AriaLinkProps} from "@react-types/link";
import {DOMAttributes, FocusableElement, PressEvent} from "@react-types/shared";
import {
  filterDOMProps,
  mergeProps,
  useRouter,
  shouldClientNavigate,
  useLinkProps,
  isAndroid,
  isIOS,
} from "@react-aria/utils";
import {RefObject} from "react";
import {warn} from "@heroui/shared-utils";
import {useFocusable} from "@react-aria/focus";
import {usePress} from "@react-aria/interactions";

export interface AriaLinkOptions extends AriaLinkProps {
  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?: DOMAttributes["aria-current"];
  /** Whether the link is disabled. */
  isDisabled?: boolean;
  /** The role of the element */
  role?: string;
  /** The type of the element, e.g. 'button' */
  type?: string;
  /**
   * The HTML element used to render the link, e.g. 'a', or 'span'.
   * @default 'a'
   */
  elementType?: string;
}

export interface LinkAria {
  /** Props for the link element. */
  linkProps: DOMAttributes;
  /** Whether the link is currently pressed. */
  isPressed: boolean;
}

/**
 * Provides the behavior and accessibility implementation for a link component.
 * A link allows a user to navigate to another page or resource within a web page
 * or application.
 */
export function useAriaLink(props: AriaLinkOptions, ref: RefObject<FocusableElement>): LinkAria {
  let {
    elementType = "a",
    onPress,
    onPressStart,
    onPressEnd,
    // @ts-ignore
    onClick: deprecatedOnClick,
    role,
    isDisabled,
    type,
    ...otherProps
  } = props;

  let linkProps: DOMAttributes = {};

  if (elementType !== "a") {
    linkProps = {
      role: "link",
      tabIndex: !isDisabled ? 0 : undefined,
    };
  }

  let isMobile = isIOS() || isAndroid();

  if (
    deprecatedOnClick &&
    typeof deprecatedOnClick === "function" &&
    // bypass since onClick is passed from <Link as="button" /> internally
    type !== "button" &&
    // bypass since onClick is passed from <Button as={Link} /> internally
    role !== "button"
  ) {
    warn(
      "onClick is deprecated, please use onPress instead. See: https://github.com/heroui-inc/heroui/issues/4292",
      "useLink",
    );
  }

  const handlePress = (e: PressEvent) => {
    // On mobile devices, we need to call onClick directly since react-aria's usePress hook
    // only supports onPress events as of https://github.com/adobe/react-spectrum/commit/1d5def8a
    // This ensures backwards compatibility for onClick handlers on mobile
    // See: https://github.com/heroui-inc/heroui/issues/4292
    if (isMobile) {
      deprecatedOnClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>);
    }
    onPress?.(e);
  };

  let {focusableProps} = useFocusable(props, ref);
  let {pressProps, isPressed} = usePress({
    onPress: handlePress,
    onPressStart,
    onPressEnd,
    isDisabled,
    ref,
  });
  let domProps = filterDOMProps(otherProps, {labelable: true, isLink: elementType === "a"});
  let interactionHandlers = mergeProps(focusableProps, pressProps);
  let router = useRouter();
  let routerLinkProps = useLinkProps(props);

  return {
    isPressed, // Used to indicate press state for visual
    linkProps: mergeProps(domProps, routerLinkProps, {
      ...interactionHandlers,
      ...linkProps,
      "aria-disabled": isDisabled || undefined,
      "aria-current": props["aria-current"],
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        pressProps.onClick?.(e);

        // The `isMobile` check is to avoid firing onClick event twice since it's handled in handlePress
        if (!isMobile && deprecatedOnClick) {
          deprecatedOnClick(e);
        }

        // If a custom router is provided, prevent default and forward if this link should client navigate.
        if (
          !router.isNative &&
          e.currentTarget instanceof HTMLAnchorElement &&
          e.currentTarget.href &&
          // If props are applied to a router Link component, it may have already prevented default.
          !e.isDefaultPrevented() &&
          shouldClientNavigate(e.currentTarget, e) &&
          props.href
        ) {
          e.preventDefault();
          router.open(e.currentTarget, e, props.href, props.routerOptions);
        }
      },
    }),
  };
}
