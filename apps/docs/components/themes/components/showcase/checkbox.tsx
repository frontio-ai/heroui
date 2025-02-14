import {cloneElement} from "react";
import {CheckboxProps, Checkbox as HeroUICheckbox} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {HeroUIScaling} from "../../types";

type Color = CheckboxProps["color"];
type Radius = CheckboxProps["radius"];

const SectionBase = ({
  color,
  isDisabled,
  radius,
  classNames,
}: {
  color?: Color;
  isDisabled?: boolean;
  radius?: Radius;
  classNames?: any;
}) => {
  return (
    <HeroUICheckbox
      key={radius}
      defaultSelected
      className="capitalize"
      classNames={classNames}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
    >
      {color}
    </HeroUICheckbox>
  );
};

const Section = ({
  color,
  radius,
  scaling,
}: {
  color: Color;
  radius: Radius;
  scaling: HeroUIScaling;
}) => {
  let classNames = {
    wrapper: "h-6 w-6",
    icon: "w-5 h-4",
    label: "text-medium",
  };

  switch (scaling) {
    case 90: {
      classNames = {
        wrapper: "h-5 w-5",
        icon: "w-4 h-3",
        label: "text-small",
      };
      break;
    }
    case 95: {
      classNames = {
        wrapper: "h-5 w-5",
        icon: "w-4 h-3",
        label: "text-medium",
      };
      break;
    }
    case 100: {
      classNames = {
        wrapper: "h-6 w-6",
        icon: "w-4 h-3",
        label: "text-medium",
      };
      break;
    }
    case 105: {
      classNames = {
        wrapper: "h-6 w-6",
        icon: "w-4 h-3",
        label: "text-large",
      };
      break;
    }
    case 110: {
      classNames = {
        wrapper: "h-7 w-7",
        icon: "w-5 h-4",
        label: "text-large",
      };
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, radius, classNames, isDisabled: false})}
      {cloneElement(<SectionBase />, {color, radius, classNames, isDisabled: true})}
    </div>
  );
};

export const Checkbox = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Checkbox">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
