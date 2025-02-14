import {setOtherCssParams} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";

import ValueButton from "./value-button";

import {RadialBlur} from "@/components/icons/radial-blur";

interface DisableOpacityProps {
  config: Config;
}

export function DisableOpacity({config}: DisableOpacityProps) {
  const {setOtherParams} = useThemeBuilder();

  const handleChange = (key: keyof Config["layout"]["otherParams"], value: string) => {
    setOtherParams({[key]: value});
    setOtherCssParams(key, value);
  };

  return (
    <ConfigSection icon={<RadialBlur className="h-4 w-4" />} title="Disable Opacity">
      <ValueButton
        currentValue={config.layout.otherParams.disabledOpacity}
        setValue={(value) => {
          handleChange("disabledOpacity", value);
        }}
        value={"0.2"}
      />
      <ValueButton
        currentValue={config.layout.otherParams.disabledOpacity}
        setValue={(value) => {
          handleChange("disabledOpacity", value);
        }}
        value={"0.4"}
      />
      <ValueButton
        currentValue={config.layout.otherParams.disabledOpacity}
        setValue={(value) => {
          handleChange("disabledOpacity", value);
        }}
        value={"0.6"}
      />
      <ValueButton
        currentValue={config.layout.otherParams.disabledOpacity}
        setValue={(value) => {
          handleChange("disabledOpacity", value);
        }}
        value={"0.8"}
      />
    </ConfigSection>
  );
}
