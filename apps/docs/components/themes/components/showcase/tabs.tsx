import {cloneElement} from "react";
import {TabsProps, Tabs, Tab} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {Border, HeroUIScaling} from "../../types";

type Color = TabsProps["color"];
type Radius = TabsProps["radius"];
type Variant = TabsProps["variant"];

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
    <Tabs
      key={color}
      aria-label="Tabs colors"
      classNames={classNames}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
    >
      <Tab key="photos" title="Photos" />
      <Tab key="music" title="Music" />
      <Tab key="videos" title="Videos" />
    </Tabs>
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
  const variants = ["solid", "bordered", "light", "underlined"];

  let borderClass = "border-medium";

  if (borderWidthValue === "thin") {
    borderClass = "border-small";
  } else if (borderWidthValue === "thick") {
    borderClass = "border-large";
  }

  let classNames = {tab: "text-tiny px-2 h-6"};

  switch (scaling) {
    case 90: {
      classNames = {tab: "text-tiny px-2 h-6"};
      break;
    }
    case 95: {
      classNames = {tab: "text-tiny px-2 h-7"};
      break;
    }
    case 100: {
      classNames = {tab: "text-tiny px-3 h-7"};
      break;
    }
    case 105: {
      classNames = {tab: "text-medium px-3 h-8"};
      break;
    }
    case 110: {
      classNames = {tab: "text-medium px-4 h-9"};
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {
          color,
          variant,
          classNames: {
            ...classNames,
            tabList: variant === "bordered" ? borderClass : "",
          },
          isDisabled: false,
          radius,
        }),
      )}
      {cloneElement(<SectionBase />, {
        color,
        classNames,
        variant: "solid",
        isDisabled: true,
        radius,
      })}
    </div>
  );
};

export const TabsComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling, borderWidthValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Tabs">
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
