import {showcaseId} from "../../constants";

import {Avatar} from "./avatar";
import {BreadCrumbs} from "./breadcrumbs";
import {Button} from "./button";
import {Checkbox} from "./checkbox";
import {Chip} from "./chip";
import {Code} from "./code";
import {InputComponent} from "./input";
import {PopoverComponent} from "./popover";
import {SwitchComponent} from "./switch";
import {TabsComponent} from "./tabs";

export function Showcase() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full min-w-6xl pb-20" id={showcaseId}>
      <div className="text-3xl text-default-800 font-bold">Theme Generator</div>
      <Avatar />
      <BreadCrumbs />
      <Button />
      <Checkbox />
      <Chip />
      <Code />
      <InputComponent />
      <PopoverComponent />
      <SwitchComponent />
      <TabsComponent />
    </div>
  );
}
