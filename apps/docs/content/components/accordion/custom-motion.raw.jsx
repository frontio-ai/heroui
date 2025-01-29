import {Accordion, AccordionItem} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const classNames = {
    content: "ease-soft-spring",
  };

  return (
    <Accordion>
      <AccordionItem aria-label="Accordion 1" classNames={classNames} id="1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 2" classNames={classNames} id="2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 3" classNames={classNames} id="3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
