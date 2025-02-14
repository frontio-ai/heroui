import {setOtherCssParams} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface OtherProps {
  config: Config;
}

export function Other({config}: OtherProps) {
  const {setOtherParams} = useThemeBuilder();

  const handleChange = (key: keyof Config["layout"]["otherParams"], value: string) => {
    setOtherParams({[key]: value});
    setOtherCssParams(key, value);
  };

  return (
    <ConfigSection title="Other">
      <NumberInput
        label="Disabled opacity (0-1)"
        value={config.layout.otherParams.disabledOpacity}
        onChange={(value) => handleChange("disabledOpacity", value)}
      />
      <NumberInput
        label="Divider weight (px)"
        value={config.layout.otherParams.dividerWeight}
        onChange={(value) => handleChange("dividerWeight", value)}
      />
      <NumberInput
        label="Hover opacity (0-1)"
        value={config.layout.otherParams.hoverOpacity}
        onChange={(value) => handleChange("hoverOpacity", value)}
      />
    </ConfigSection>
  );
}
