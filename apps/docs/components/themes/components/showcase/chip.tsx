import {cloneElement} from "react";
import {ChipProps, Chip as HeroUIChip} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {Border, HeroUIScaling} from "../../types";

type Color = ChipProps["color"];
type Radius = ChipProps["radius"];
type Variant = ChipProps["variant"];

const SectionBase = ({
  color,
  isDisabled,
  radius,
  variant,
  className,
}: {
  color?: Color;
  isDisabled?: boolean;
  radius?: Radius;
  variant?: Variant;
  className?: string;
}) => {
  return (
    <HeroUIChip
      key={radius}
      className={clsx(className, "capitalize")}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
    >
      {color}
    </HeroUIChip>
  );
};

const Section = ({
  color,
  radius,
  scaling,
  borderWidthValue,
}: {
  color: Color;
  radius: Radius;
  scaling: HeroUIScaling;
  borderWidthValue: Border;
}) => {
  const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];

  let borderClass = "border-medium";

  if (borderWidthValue === "thin") {
    borderClass = "border-small";
  } else if (borderWidthValue === "thick") {
    borderClass = "border-large";
  }

  let className = "px-1 h-6 text-tiny";

  switch (scaling) {
    case 90: {
      className = "h-5 text-tiny";
      break;
    }
    case 95: {
      className = "h-6 text-tiny";
      break;
    }
    case 100: {
      className = "px-1 h-7 text-tiny";
      break;
    }
    case 105: {
      className = "px-2 h-8 text-medium";
      break;
    }
    case 110: {
      className = "px-3 h-8 text-medium";
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {
          color,
          className: clsx(
            className,
            variant === "bordered" || variant === "faded" ? borderClass : "",
          ),
          variant,
          isDisabled: false,
          radius,
        }),
      )}
      {cloneElement(<SectionBase />, {
        color,
        className,
        variant: "solid",
        isDisabled: true,
        radius,
      })}
    </div>
  );
};

export const Chip = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling, borderWidthValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Chip">
      {colors.map((color, idx) => (
        <Section
          key={idx}
          borderWidthValue={borderWidthValue}
          color={color}
          radius={radiusValue}
          scaling={scaling}
        />
      ))}
    </ShowcaseComponent>
  );
};
