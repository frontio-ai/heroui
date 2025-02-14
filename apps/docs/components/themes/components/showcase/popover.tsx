import {PopoverProps, Popover, PopoverTrigger, PopoverContent, Button} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {HeroUIScaling} from "../../types";

type Color = PopoverProps["color"];
type Radius = PopoverProps["radius"];

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
    <Popover color={color === "foreground" ? "default" : color} placement="right" radius={radius}>
      <PopoverTrigger>
        <Button className="capitalize" color={color === "foreground" ? "default" : color}>
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className={className}>
          <div className="font-bold">Popover Content</div>
          <div>This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
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
  let className = "text-small px-1";

  switch (scaling) {
    case 90: {
      className = "px-1 py-2 text-tiny";
      break;
    }
    case 95: {
      className = "text-tiny px-2 py-3";
      break;
    }
    case 100: {
      className = "text-small px-2 py-3";
      break;
    }
    case 105: {
      className = "text-small px-3 py-3";
      break;
    }
    case 110: {
      className = "text-medium px-3 py-3";
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      <SectionBase className={className} color={color} radius={radius} />
    </div>
  );
};

export const PopoverComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Popover">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
