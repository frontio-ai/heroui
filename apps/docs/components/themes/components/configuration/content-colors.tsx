import {Tooltip} from "@heroui/react";

import {baseColorsId} from "../../constants";
import {setCssContentColor} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config, ThemeType} from "../../types";
import {templates} from "../../templates";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";

import {PaletteRound} from "@/components/icons";

interface BaseColorsProps {
  config: Config;
  theme: ThemeType;
}

export function ContentColors({config, theme}: BaseColorsProps) {
  const {setContentColor} = useThemeBuilder();

  return (
    <ConfigSection
      icon={<PaletteRound className="w-4 h-4" />}
      id={baseColorsId}
      title="Content colors"
    >
      <Tooltip content={"content-1"}>
        <div>
          <ColorPicker
            hexColor={config[theme].contentColor.content1}
            type="content1"
            onChange={(hexColor) =>
              setCssContentColor(1, hexColor, templates[0].value[theme].contentColor.content1)
            }
            onClose={(hexColor) => setContentColor({content1: hexColor}, theme)}
          />
        </div>
      </Tooltip>
      <Tooltip content={"content-2"}>
        <div>
          <ColorPicker
            hexColor={config[theme].contentColor.content2}
            type="content2"
            onChange={(hexColor) =>
              setCssContentColor(2, hexColor, templates[0].value[theme].contentColor.content2)
            }
            onClose={(hexColor) => setContentColor({content2: hexColor}, theme)}
          />
        </div>
      </Tooltip>
      <Tooltip content={"content-3"}>
        <div>
          <ColorPicker
            hexColor={config[theme].contentColor.content3}
            type="content3"
            onChange={(hexColor) =>
              setCssContentColor(3, hexColor, templates[0].value[theme].contentColor.content3)
            }
            onClose={(hexColor) => setContentColor({content3: hexColor}, theme)}
          />
        </div>
      </Tooltip>
      <Tooltip content={"content-4"}>
        <div>
          <ColorPicker
            hexColor={config[theme].contentColor.content4}
            type="content4"
            onChange={(hexColor) =>
              setCssContentColor(4, hexColor, templates[0].value[theme].contentColor.content4)
            }
            onClose={(hexColor) => setContentColor({content4: hexColor}, theme)}
          />
        </div>
      </Tooltip>
    </ConfigSection>
  );
}
