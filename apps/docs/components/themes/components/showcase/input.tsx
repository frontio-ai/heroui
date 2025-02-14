import {InputProps, Input} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {Border, HeroUIScaling} from "../../types";

type Color = InputProps["color"];
type Radius = InputProps["radius"];
type Variant = InputProps["variant"];

const SectionBase = ({
  color,
  isDisabled,
  radius,
  variant,
  classNames,
}: {
  color?: Color;
  isDisabled?: boolean;
  radius?: Radius;
  variant?: Variant;
  classNames?: any;
}) => {
  return (
    <Input
      classNames={classNames}
      color={color}
      isDisabled={isDisabled}
      label="Input"
      radius={radius}
      variant={variant}
    />
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
  const variants = ["flat", "bordered", "faded", "underlined"];
  let classNames = {base: "h-10 w-[340px]", label: "text-small"};

  let borderClass = "border-medium";

  if (borderWidthValue === "thin") {
    borderClass = "border-small";
  } else if (borderWidthValue === "thick") {
    borderClass = "border-large";
  }

  switch (scaling) {
    case 90: {
      classNames = {base: "h-8 min-w-0 w-[190px]", label: "text-tiny"};
      break;
    }
    case 95: {
      classNames = {base: "h-8 min-w-0 w-[210px]", label: "text-tiny"};
      break;
    }
    case 100: {
      classNames = {base: "h-10 min-w-0 w-[230px]", label: "text-small"};
      break;
    }
    case 105: {
      classNames = {base: "h-12 min-w-0 w-[250px]", label: "text-medium"};
      break;
    }
    case 110: {
      classNames = {base: "h-12 min-w-0 w-[270px]", label: "text-medium"};
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4 w-auto h-auto">
      {variants.map((variant, idx) => (
        <SectionBase
          key={idx}
          classNames={{
            ...classNames,
            inputWrapper: clsx(clsx(variant === "bordered" && borderClass)),
          }}
          color={color}
          isDisabled={false}
          radius={radius}
          variant={variant as Variant}
        />
      ))}
      <SectionBase
        classNames={classNames}
        color={color}
        isDisabled={true}
        radius={radius}
        variant="flat"
      />
    </div>
  );
};

export const InputComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling, borderWidthValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Input">
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
