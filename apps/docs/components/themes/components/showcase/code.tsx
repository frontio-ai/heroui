import {CodeProps, Code as HeroUICode} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {HeroUIScaling} from "../../types";

type Color = CodeProps["color"];
type Radius = CodeProps["radius"];

const SectionBase = ({
  color,
  radius,
  className,
}: {
  color?: Color;
  radius?: Radius;
  className?: string;
}) => {
  return (
    <HeroUICode key={radius} className={className} color={color} radius={radius}>
      npm install @heroui/react
    </HeroUICode>
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
  let className = "p-0 px-3 text-tiny";

  switch (scaling) {
    case 90: {
      className = "p-2 px-3 text-tiny";
      break;
    }
    case 95: {
      className = "p-2 px-4 text-tiny";
      break;
    }
    case 100: {
      className = "p-2 px-4 text-medium";
      break;
    }
    case 105: {
      className = "p-3 px-5 text-medium";
      break;
    }
    case 110: {
      className = "p-2 px-8 text-medium";
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      <SectionBase className={className} color={color} radius={radius} />
    </div>
  );
};

export const Code = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Code">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
