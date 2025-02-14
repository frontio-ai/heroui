import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import FontButton from "./font-button";

import {TextSquare} from "@/components/icons/text-square";

export function Fonts() {
  const {font, setFont} = useThemeBuilder();

  return (
    <ConfigSection icon={<TextSquare className="h-4 w-4" />} title="Font Family">
      <FontButton className="rounded-tl-none" setValue={setFont} title="Inter" value={font} />
      <FontButton className="rounded-tl-sm" setValue={setFont} title="Roboto" value={font} />
      <FontButton className="rounded-tl-md" setValue={setFont} title="Outfit" value={font} />
      <FontButton className="rounded-tl-lg" setValue={setFont} title="Lora" value={font} />
    </ConfigSection>
  );
}
