import {clsx} from "@heroui/shared-utils";

import {ConfigColors} from "../../types";

interface SwatchProps {
  colors: {background: string} & ConfigColors["baseColor"];
  className?: string;
  innerClassName?: string;
}

export default function Swatch({colors, className, innerClassName}: SwatchProps) {
  return (
    <div className={clsx("flex h-6", className)}>
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className={clsx("w-2 h-full", innerClassName)} style={{background: value}} />
      ))}
    </div>
  );
}
