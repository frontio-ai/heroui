import {Accordion, AccordionItem} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion disabledKeys={["2"]}>
      <AccordionItem aria-label="Accordion 1" id="1" subtitle="Press to expand" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        aria-label="Accordion 2"
        id="2"
        subtitle={
          <span>
            Press to expand <strong>id 2</strong>
          </span>
        }
        title="Accordion 2"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 3" id="3" subtitle="Press to expand" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
