import {useMemo} from "react";

import {useProviderContext} from "../provider-context";

export function useLabelPlacement(props: {
  labelPlacement?: "inside" | "outside" | "outside-left";
  label?: React.ReactNode;
}) {
  const globalContext = useProviderContext();
  const globalLabelPlacement = globalContext?.labelPlacement;

  return useMemo(() => {
    const labelPlacement = props.labelPlacement ?? globalLabelPlacement ?? "inside";

    if (labelPlacement === "inside" && !props.label) {
      return "outside";
    }

    return labelPlacement;
  }, [props.labelPlacement, globalLabelPlacement, props.label]);
}
