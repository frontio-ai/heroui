import {Tooltip} from "@heroui/react";

import {otherColorsId} from "../../constants";
import {useThemeBuilder} from "../../provider";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";
import {setCssOtherColor} from "../../css-vars";

import {PaletteIcon} from "@/components/icons";

interface OtherColorsProps {
  config: Config;
  syncThemes: boolean;
  theme: ThemeType;
}

export function LayoutColors({config, syncThemes, theme}: OtherColorsProps) {
  const {setLayoutColor} = useThemeBuilder();

  return (
    <ConfigSection
      icon={<PaletteIcon className="w-4 h-4" />}
      id={otherColorsId}
      title="Layout colors"
    >
      <Tooltip content="background">
        <div>
          <ColorPicker
            hexColor={config[theme].layoutColor.background}
            type="background"
            onChange={(hexColor) => setCssOtherColor("background", hexColor)}
            onClose={(hexColor) => setLayoutColor({background: hexColor}, theme, syncThemes)}
          />
        </div>
      </Tooltip>
      <Tooltip content="foreground">
        <div>
          <ColorPicker
            hexColor={config[theme].layoutColor.foreground}
            type="foreground"
            onChange={(hexColor) => setCssOtherColor("foreground", hexColor)}
            onClose={(hexColor) => setLayoutColor({foreground: hexColor}, theme, false)}
          />
        </div>
      </Tooltip>
      <Tooltip content="focus">
        <div>
          <ColorPicker
            hexColor={config[theme].layoutColor.focus}
            type="focus"
            onChange={(hexColor) => setCssOtherColor("focus", hexColor)}
            onClose={(hexColor) => setLayoutColor({focus: hexColor}, theme, syncThemes)}
          />
        </div>
      </Tooltip>
      <Tooltip content="overlay">
        <div>
          <ColorPicker
            hexColor={config[theme].layoutColor.overlay}
            type="overlay"
            onChange={(hexColor) => setCssOtherColor("overlay", hexColor)}
            onClose={(hexColor) => setLayoutColor({overlay: hexColor}, theme, false)}
          />
        </div>
      </Tooltip>
    </ConfigSection>
  );
}
