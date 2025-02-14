import {
  BreadcrumbsProps,
  Breadcrumbs as HeroUIBreadcrumbs,
  BreadcrumbItem as HeroUIBreadcrumbsItem,
} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {Border, Radius} from "../../types";

type Color = BreadcrumbsProps["color"];

const SectionBase = ({
  color,
  variant,
  isDisabled,
  classNames,
  radius,
}: {
  color?: BreadcrumbsProps["color"];
  variant?: BreadcrumbsProps["variant"];
  isDisabled?: boolean;
  classNames?: any;
  radius?: Radius;
}) => {
  const items = ["Home", "Music", "Artist", "Album", "Song"];

  return (
    <HeroUIBreadcrumbs
      classNames={classNames}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
    >
      {items.map((item, index) => (
        <HeroUIBreadcrumbsItem key={index}>{item}</HeroUIBreadcrumbsItem>
      ))}
    </HeroUIBreadcrumbs>
  );
};

const Section = ({
  color,
  scaling,
  borderWidthValue,
  radiusValue,
}: {
  color: Color;
  scaling: number;
  borderWidthValue: Border;
  radiusValue: Radius;
}) => {
  const variants = ["bordered", "light", "solid", "solid"];
  const disabled = [false, false, false, true];
  let classNames = {base: "text-small"};

  let borderClass = "border-medium";

  if (borderWidthValue === "thin") {
    borderClass = "border-small";
  } else if (borderWidthValue === "thick") {
    borderClass = "border-large";
  }

  switch (scaling) {
    case 90: {
      classNames = {base: "text-[0.7rem]"};
      break;
    }
    case 95: {
      classNames = {base: "text-tiny"};
      break;
    }
    case 100: {
      classNames = {base: "text-small p-0.5"};
      break;
    }
    case 105: {
      classNames = {base: "text-medium p-1"};
      break;
    }
    case 110: {
      classNames = {base: "text-large p-1.5"};
      break;
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      {variants.map((variant, idx) => (
        <SectionBase
          key={idx}
          classNames={{
            ...classNames,
            list: variant === "bordered" && borderClass,
          }}
          color={color}
          isDisabled={disabled[idx]}
          radius={radiusValue}
          variant={variant as BreadcrumbsProps["variant"]}
        />
      ))}
    </div>
  );
};

export const BreadCrumbs = () => {
  const colors: Color[] = ["foreground", "primary", "secondary", "success", "warning", "danger"];
  const {scaling, borderWidthValue, radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="BreadCrumbs">
      {colors.map((color, idx) => (
        <Section
          key={idx}
          borderWidthValue={borderWidthValue}
          color={color}
          radiusValue={radiusValue}
          scaling={scaling}
        />
      ))}
    </ShowcaseComponent>
  );
};
