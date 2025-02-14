import {defaultColorsId} from "../../constants";
import {setCssColor} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {templates} from "../../templates";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";

import {PaletteRound} from "@/components/icons";

interface DefaultColorsProp {
  config: Config;
  theme: ThemeType;
}

export function DefaultColors({config, theme}: DefaultColorsProp) {
  const {setDefaultColor} = useThemeBuilder();

  return (
    <ConfigSection
      icon={<PaletteRound className="h-4 w-4" />}
      id={defaultColorsId}
      title="Default Color"
    >
      <ColorPicker
        hexColor={config[theme].defaultColor.default}
        type="default"
        onChange={(hexColor) =>
          setCssColor("default", hexColor, templates[0].value[theme].defaultColor.default, theme)
        }
        onClose={(hexColor) => setDefaultColor({default: hexColor}, theme, false)}
      />
    </ConfigSection>
  );
}
