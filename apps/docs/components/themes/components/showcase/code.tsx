import {cloneElement} from "react";
import {CodeProps, Code as HeroUICode} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = CodeProps["color"];
type Radius = CodeProps["radius"];

const SectionBase = ({color, radius}: {color?: Color; radius?: Radius}) => {
  return (
    <HeroUICode key={radius} className="px-4" color={color} radius={radius}>
      npm install @heroui/react
    </HeroUICode>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, radius})}
    </div>
  );
};

export const Code = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Code">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
