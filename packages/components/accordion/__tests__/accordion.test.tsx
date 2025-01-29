import * as React from "react";
import {act, render} from "@testing-library/react";
import {focus} from "@heroui/test-utils";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {Input} from "@heroui/input";

import {Accordion, AccordionItem} from "../src";

// e.g. console.error Warning: Function components cannot be given refs.
// Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
const spy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("Accordion", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem id="1">Accordion Item</AccordionItem>
      </Accordion>,
    );

    expect(() => wrapper.unmount()).not.toThrow();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Accordion ref={ref}>
        <AccordionItem id="1">Accordion Item</AccordionItem>
      </Accordion>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should display the correct number of items", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem id="1">Accordion Item</AccordionItem>
        <AccordionItem id="2">Accordion Item</AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")).toHaveLength(2);
  });

  it("should be opened when defaultExpandedKeys is set", () => {
    const wrapper = render(
      <Accordion defaultExpandedKeys={["1"]}>
        <AccordionItem data-testid="item-1" id="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")[0]).toHaveAttribute("data-expanded", "true");
  });

  it("should be disabled when disabledKeys is set", () => {
    const wrapper = render(
      <Accordion disabledKeys={["1"]}>
        <AccordionItem id="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")[0]).toBeDisabled();
  });

  it("should hide the accordion item when the hidden prop is set", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem id="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem hidden id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
        <AccordionItem id="3" title="Accordion Item 3">
          Accordion Item 3 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")).toHaveLength(2);
    expect(wrapper.getAllByRole("separator")).toHaveLength(1);
  });

  it("should expand the accordion item when clicked", async () => {
    const wrapper = render(
      <Accordion disableAnimation>
        <AccordionItem data-testid="item-1" id="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const button = wrapper.getAllByRole("button")[0] as HTMLElement;

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should support startIndicator", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem
          data-testid="item-1"
          id="1"
          startContent={<div data-testid="start-content" />}
          title="Accordion Item 1"
        >
          Accordion Item 1 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getByTestId("start-content")).toBeInTheDocument();
  });

  it("tab moves focus to the next focusable element", async () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem data-testid="item-1" id="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem data-testid="item-2" id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const firstButton = wrapper.getAllByRole("button")[0] as HTMLElement;
    const secondButton = wrapper.getAllByRole("button")[1] as HTMLElement;

    act(() => {
      focus(firstButton);
    });

    await user.keyboard("[Tab]");
    expect(secondButton).toHaveFocus();
  });

  it("aria-expanded is true/false when accordion is open/closed", async () => {
    const wrapper = render(
      <Accordion disableAnimation>
        <AccordionItem data-testid="item-1" id="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem data-testid="item-2" id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const button = wrapper.getAllByRole("button")[0] as HTMLElement;

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should handle arrow key navigation within Input inside AccordionItem", async () => {
    const wrapper = render(
      <Accordion defaultExpandedKeys={["1"]}>
        <AccordionItem id="1" title="Accordion Item 1">
          <Input label="name" type="text" />
        </AccordionItem>
        <AccordionItem id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const input = wrapper.getByLabelText("name");

    const firstButton = wrapper.getAllByRole("button")[0] as HTMLElement;

    act(() => {
      focus(firstButton);
    });

    await user.keyboard("[Tab]");
    expect(input).toHaveFocus();

    await user.keyboard("aaa");
    expect(input).toHaveValue("aaa");

    await user.keyboard("[ArrowLeft]");
    await user.keyboard("b");
    expect(input).toHaveValue("aaba");

    await user.keyboard("[ArrowRight]");
    await user.keyboard("c");
    expect(input).toHaveValue("aabac");
  });

  it("should pass dividerProps to divider", () => {
    const {getByRole} = render(
      <Accordion
        dividerProps={{
          className: "bg-rose-500",
        }}
      >
        <AccordionItem data-testid="item-1" id="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem data-testid="item-2" id="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(getByRole("separator")).toHaveClass("bg-rose-500");
  });
});
