import {IconSvgProps} from "./types";

export const CloseIcon = (
  props: IconSvgProps & {
    // checkbox icon props
    "data-checked"?: string;
    isSelected?: boolean;
    isIndeterminate?: boolean;
    disableAnimation?: boolean;
    className?: string;
  },
) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // avoid passing non-DOM attributes to svg
  const {isSelected, isIndeterminate, disableAnimation, ...otherProps} = props;

  return (
    <svg
      aria-hidden="true"
      className="fill-current"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};
