import "@testing-library/jest-dom";
import * as React from "react";
import {act, render} from "@testing-library/react";
import {focus, shouldIgnoreReactWarning, spy} from "@heroui/test-utils";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {Input} from "@heroui/input";

import {Accordion, AccordionItem} from "../src";

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
        <AccordionItem>Accordion Item</AccordionItem>
      </Accordion>,
    );

    expect(() => wrapper.unmount()).not.toThrow();

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Accordion ref={ref}>
        <AccordionItem>Accordion Item</AccordionItem>
      </Accordion>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should display the correct number of items", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1">Accordion Item</AccordionItem>
        <AccordionItem key="2">Accordion Item</AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")).toHaveLength(2);
  });

  it("should be opened when defaultExpandedKeys is set", () => {
    const wrapper = render(
      <Accordion defaultExpandedKeys={["1"]}>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getByTestId("item-1")).toHaveAttribute("data-open", "true");
  });

  it("should be disabled when disabledKeys is set", () => {
    const wrapper = render(
      <Accordion disabledKeys={["1"]}>
        <AccordionItem key="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")[0]).toBeDisabled();
  });

  it("should hide the accordion item when the hidden prop is set", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" hidden title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
        <AccordionItem key="3" title="Accordion Item 3">
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
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const base = wrapper.getByTestId("item-1");
    const button = base.querySelector("button") as HTMLElement;

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should support startIndicator", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem
          key="1"
          data-testid="item-1"
          startContent={<div data-testid="start-content" />}
          title="Accordion Item 1"
        >
          Accordion Item 1 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getByTestId("start-content")).toBeInTheDocument();
  });

  it("arrow up & down moves focus to next/previous accordion item", async () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const first = wrapper.getByTestId("item-1");
    const firstButton = first.querySelector("button") as HTMLElement;

    const second = wrapper.getByTestId("item-2");
    const secondButton = second.querySelector("button") as HTMLElement;

    await focus(firstButton);
    await user.keyboard("[ArrowDown]");
    expect(secondButton).toHaveFocus();

    await user.keyboard("[ArrowUp]");

    expect(firstButton).toHaveFocus();
  });

  it("home & end keys moves focus to first/last accordion", async () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const first = wrapper.getByTestId("item-1");
    const firstButton = first.querySelector("button") as HTMLElement;

    const second = wrapper.getByTestId("item-2");
    const secondButton = second.querySelector("button") as HTMLElement;

    act(() => {
      focus(secondButton);
    });

    await user.keyboard("[Home]");
    expect(firstButton).toHaveFocus();

    await user.keyboard("[End]");
    expect(secondButton).toHaveFocus();
  });

  it("tab moves focus to the next focusable element", async () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const first = wrapper.getByTestId("item-1");
    const firstButton = first.querySelector("button") as HTMLElement;

    const second = wrapper.getByTestId("item-2");
    const secondButton = second.querySelector("button") as HTMLElement;

    act(() => {
      focus(firstButton);
    });

    await user.keyboard("[Tab]");
    expect(secondButton).toHaveFocus();
  });

  it("aria-controls for button is same as id for region", async () => {
    const wrapper = render(
      <Accordion defaultExpandedKeys={["1"]}>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const base = wrapper.getByTestId("item-1");
    const button = base.querySelector("button") as HTMLElement;

    const region = base.querySelector("[role='region']") as HTMLElement;

    expect(button).toHaveAttribute("aria-controls", region.id);
  });

  it("aria-expanded is true/false when accordion is open/closed", async () => {
    const wrapper = render(
      <Accordion disableAnimation>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const base = wrapper.getByTestId("item-1");
    const button = base.querySelector("button") as HTMLElement;

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should support keepContentMounted", async () => {
    const wrapper = render(
      <Accordion keepContentMounted>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const item1 = wrapper.getByTestId("item-1");
    const button = item1.querySelector("button") as HTMLElement;

    expect(item1.querySelector("[role='region']")).toBeInTheDocument();

    await user.click(button);
    const item2 = wrapper.getByTestId("item-2");
    const button2 = item2.querySelector("button") as HTMLElement;

    await user.click(button2);
    expect(item1.querySelector("[role='region']")).toBeInTheDocument();
    expect(item2.querySelector("[role='region']")).toBeInTheDocument();
  });

  it("should handle arrow key navigation within Input inside AccordionItem", async () => {
    const wrapper = render(
      <Accordion defaultExpandedKeys={["1"]}>
        <AccordionItem key="1" title="Accordion Item 1">
          <Input label="name" type="text" />
        </AccordionItem>
        <AccordionItem key="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const input = wrapper.getByLabelText("name");

    const firstButton = await wrapper.getByRole("button", {name: "Accordion Item 1"});

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
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(getByRole("separator")).toHaveClass("bg-rose-500");
  });
});
