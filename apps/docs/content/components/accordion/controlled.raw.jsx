import React from "react";
import {Accordion, AccordionItem} from "@heroui/react";

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion expandedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
      <AccordionItem aria-label="Accordion 1" id="1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 2" id="2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 3" id="3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
