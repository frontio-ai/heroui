import "@testing-library/jest-dom";
import * as React from "react";
import {render, fireEvent, act} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {Button} from "@heroui/button";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Popover, PopoverContent, PopoverTrigger} from "../src";
import {Select, SelectItem} from "../../select/src";

describe("Popover", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Popover>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should not throw error when clicking trigger button", async () => {
    const wrapper = render(
      <Popover>
        <PopoverTrigger>
          <button data-testid="trigger-test">Open popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );
    const trigger = wrapper.getByTestId("trigger-test");

    // open popover
    await user.click(trigger);

    if (!shouldIgnoreReactWarning(spy)) {
      expect(spy).toHaveBeenCalledTimes(0);
    }
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Popover ref={ref} defaultOpen>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should hide the popover when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onOpenChange={(isOpen) => (!isOpen ? onClose() : undefined)}>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="content-test">
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.keyDown(content, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should still hide the popover when pressing the escape key ", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onClose={onClose}>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="content-test">
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.keyDown(content, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should hide the popover on blur (shouldCloseOnBlur=true)", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen shouldCloseOnBlur onClose={onClose}>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="content-test">
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    act(() => {
      content.blur();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should work with HeroUI button", async () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover onClose={onClose}>
        <PopoverTrigger>
          <Button disableRipple data-testid="trigger-test">
            Open popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const trigger = wrapper.getByTestId("trigger-test");

    // open popover
    await user.click(trigger);
    expect(onClose).toHaveBeenCalledTimes(0);

    // close popover
    await user.click(trigger);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should close listbox by clicking another popover", async () => {
    const wrapper = render(
      <>
        <Popover>
          <PopoverTrigger>
            <button data-testid="popover">Open popover</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>This is the content of the popover.</p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <button data-testid="popover2">Open popover</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>This is the content of the popover.</p>
          </PopoverContent>
        </Popover>
      </>,
    );

    const popover = wrapper.getByTestId("popover");

    const popover2 = wrapper.getByTestId("popover2");

    expect(popover).not.toBeNull();

    expect(popover2).not.toBeNull();

    // open the popover by clicking popover in the first popover
    await user.click(popover);

    // assert that the first popover is open
    expect(popover).toHaveAttribute("aria-expanded", "true");

    // assert that the second popover is close
    expect(popover2).toHaveAttribute("aria-expanded", "false");

    // close the popover by clicking the second popover
    await user.click(popover2);

    // assert that the first popover is closed
    expect(popover).toHaveAttribute("aria-expanded", "false");

    // assert that the second popover is open
    expect(popover2).toHaveAttribute("aria-expanded", "true");
  });

  it("should focus on dialog when opened", async () => {
    const wrapper = render(
      <Popover>
        <PopoverTrigger>
          <Button disableRipple data-testid="trigger-test">
            Open popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const trigger = wrapper.getByTestId("trigger-test");

    // open popover
    await user.click(trigger);

    const {getByRole} = wrapper;

    let dialog = getByRole("dialog");

    // assert that the focus is on the dialog
    expect(dialog).toHaveFocus();
  });

  it("should restore focus on trigger when closed", async () => {
    const wrapper = render(
      <Popover>
        <PopoverTrigger>
          <Button data-testid="popover-trigger">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const trigger = wrapper.getByTestId("popover-trigger");

    await act(async () => {
      // open popover
      await user.click(trigger);
      // close popover
      await user.click(trigger);
      // assert that the focus is restored back to trigger
      expect(trigger).toHaveFocus();
    });
  });

  it("should not close popover if nested select is closed", async () => {
    const wrapper = render(
      <Popover>
        <PopoverTrigger>
          <Button data-testid="popover">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Select data-testid="select" label="Select country">
            <SelectItem key="argentina">Argentina</SelectItem>
            <SelectItem key="venezuela">Venezuela</SelectItem>
            <SelectItem key="brazil">Brazil</SelectItem>
          </Select>
        </PopoverContent>
      </Popover>,
    );

    const popover = wrapper.getByTestId("popover");

    // open popover
    await user.click(popover);

    // assert that the popover is open
    expect(popover).toHaveAttribute("aria-expanded", "true");

    const select = wrapper.getByTestId("select");

    // open select
    await user.click(select);

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    await user.click(document.body);

    // assert that the select is closed
    expect(select).toHaveAttribute("aria-expanded", "false");

    // assert that the popover is still open
    expect(popover).toHaveAttribute("aria-expanded", "true");
  });

  it("should close popover on scroll", async () => {
    const wrapper = render(
      <Popover>
        <PopoverTrigger>
          <Button data-testid="popover">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Select data-testid="select" label="Select country">
            <SelectItem key="argentina">Argentina</SelectItem>
            <SelectItem key="venezuela">Venezuela</SelectItem>
            <SelectItem key="brazil">Brazil</SelectItem>
          </Select>
        </PopoverContent>
      </Popover>,
    );

    const popover = wrapper.getByTestId("popover");

    // open popover
    await user.click(popover);

    // assert that the popover is open
    expect(popover).toHaveAttribute("aria-expanded", "true");

    // scroll it
    fireEvent.scroll(document.body);

    // assert that the popover is closed
    expect(popover).toHaveAttribute("aria-expanded", "false");
  });
});

it("should close popover on scroll when shouldCloseOnScroll is false", async () => {
  const wrapper = render(
    <Popover shouldCloseOnScroll={false}>
      <PopoverTrigger>
        <Button data-testid="popover">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Select data-testid="select" label="Select country">
          <SelectItem key="argentina">Argentina</SelectItem>
          <SelectItem key="venezuela">Venezuela</SelectItem>
          <SelectItem key="brazil">Brazil</SelectItem>
        </Select>
      </PopoverContent>
    </Popover>,
  );

  const popover = wrapper.getByTestId("popover");

  // open popover
  await act(async () => {
    await userEvent.click(popover);
  });

  // assert that the popover is open
  expect(popover).toHaveAttribute("aria-expanded", "true");

  // scroll it
  fireEvent.scroll(document.body);

  // assert that the popover is still open
  expect(popover).toHaveAttribute("aria-expanded", "true");
});
