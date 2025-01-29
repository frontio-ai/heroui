import {Accordion, AccordionItem} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Light</h3>
        <Accordion variant="light">
          <AccordionItem id="1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          x
          <AccordionItem id="2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem id="3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Bordered</h3>
        <Accordion variant="bordered">
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
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Shadow</h3>
        <Accordion variant="shadow">
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
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Splitted</h3>
        <Accordion fullWidth variant="splitted">
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
      </div>
    </div>
  );
}
