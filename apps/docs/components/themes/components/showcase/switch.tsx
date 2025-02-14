import {cloneElement} from "react";
import {SwitchProps, Switch} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {HeroUIScaling} from "../../types";

type Color = SwitchProps["color"];

const SectionBase = ({
  color,
  isDisabled,
  classNames,
}: {
  color?: Color;
  isDisabled?: boolean;
  classNames?: {
    wrapper?: string;
    thumb?: string;
  };
}) => {
  return (
    <Switch
      defaultSelected
      aria-label="Automatic updates"
      classNames={classNames}
      color={color}
      isDisabled={isDisabled}
    />
  );
};

const Section = ({color, scaling}: {color: Color; scaling: HeroUIScaling}) => {
  let classNames = {
    wrapper: "w-12 h-7",
    thumb: "w-5 h-5",
  };

  switch (scaling) {
    case 90: {
      classNames = {
        wrapper: "w-8 h-4",
        thumb: "w-2 h-2 group-data-[selected=true]:ms-4",
      };
      break;
    }
    case 95: {
      classNames = {
        wrapper: "w-10 h-6",
        thumb: "w-3 h-3",
      };
      break;
    }
    case 100: {
      classNames = {
        wrapper: "w-12 h-7",
        thumb: "w-4 h-4 group-data-[selected=true]:ms-6",
      };
      break;
    }
    case 105: {
      classNames = {
        wrapper: "w-14 h-8",
        thumb: "w-5 h-5 group-data-[selected=true]:ms-7",
      };
      break;
    }
    case 110: {
      classNames = {
        wrapper: "w-16 h-9",
        thumb: "w-6 h-6 group-data-[selected=true]:ms-8",
      };
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, classNames, isDisabled: false})}
      {cloneElement(<SectionBase />, {color, classNames, isDisabled: true})}
    </div>
  );
};

export const SwitchComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {scaling} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Switch">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
