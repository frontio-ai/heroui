import {createContext} from "@heroui/react-utils";
import {DisclosureGroupState} from "@react-stately/disclosure";

import {ValuesType} from "./use-accordion";

export const [AccordianContext, useAccordianContext] = createContext<{
  state: DisclosureGroupState;
  values: ValuesType;
}>({
  name: "AccordianContext",
  strict: true,
  errorMessage:
    "useAccordianContext: `context` is undefined. Seems you forgot to wrap component within <Accordian />",
});
