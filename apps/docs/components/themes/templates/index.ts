import {Template} from "../types";

import {coffee} from "./coffee";
import {emerald} from "./emerald";
import {heroui} from "./heroui";
import {elegant} from "./elegant";
import {modern} from "./modern";
// import {retro} from "./retro";

export const templates: Template[] = [
  {label: "HeroUI", name: "heroui", value: heroui},
  {label: "Modern", name: "modern", value: modern},
  {label: "Elegant", name: "elegant", value: elegant},
  // TODO: Improve colors
  // {label: "Retro", name: "retro", value: retro},
  {label: "Coffee", name: "coffee", value: coffee},
  {label: "Emerald", name: "emerald", value: emerald},
];
