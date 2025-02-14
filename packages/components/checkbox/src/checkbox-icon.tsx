import type {UseCheckboxReturn} from "./use-checkbox";

type CheckboxIconProps = Partial<ReturnType<UseCheckboxReturn["getIconProps"]>>;

function CheckIcon(props: CheckboxIconProps) {
  const {isSelected, disableAnimation, ...otherProps} = props;

  return (
    <svg
      aria-hidden="true"
      fill="none"
      role="presentation"
      stroke="currentColor"
      strokeDasharray={22}
      strokeDashoffset={isSelected ? 44 : 66}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={
        !disableAnimation && isSelected
          ? {
              transition: "stroke-dashoffset 250ms linear 0.2s",
            }
          : {}
      }
      viewBox="0 0 17 18"
      {...otherProps}
    >
      <polyline points="1 9 7 14 15 4" />
    </svg>
  );
}

function IndeterminateIcon(props: CheckboxIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {isSelected, disableAnimation, ...otherProps} = props;

  return (
    <svg stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" {...otherProps}>
      <line x1="21" x2="3" y1="12" y2="12" />
    </svg>
  );
}

/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 */
export function CheckboxIcon(props: CheckboxIconProps) {
  const {isIndeterminate, ...otherProps} = props;
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon;

  return <BaseIcon {...otherProps} />;
}
