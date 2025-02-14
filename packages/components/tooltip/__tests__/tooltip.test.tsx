import * as React from "react";
import {render, fireEvent, act} from "@testing-library/react";
import {Button} from "@heroui/button";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Tooltip} from "../src";

describe("Tooltip", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if no children is passed", () => {
    const spy = jest.spyOn(console, "warn").mockImplementation(() => {});

    render(<Tooltip content="tooltip" />);

    expect(spy).toHaveBeenCalled();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Tooltip content="tooltip">
        <Button>Trigger</Button>
      </Tooltip>,
    );

    expect(() => wrapper.unmount()).not.toThrow();

    if (!shouldIgnoreReactWarning(spy)) {
      expect(spy).toHaveBeenCalledTimes(0);
    }
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Tooltip ref={ref} defaultOpen content="tooltip">
        <Button>Trigger</Button>
      </Tooltip>,
    );

    expect(ref.current).not.toBeNull();
  });

  it("should hide the tooltip when pressing the escape key", async () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Tooltip defaultOpen content={<p data-testid="content-test">tooltip</p>} onClose={onClose}>
        <Button>Trigger</Button>
      </Tooltip>,
    );

    const content = wrapper.getByTestId("content-test");

    await act(async () => {
      await fireEvent.keyDown(content, {key: "Escape"});
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("should still hide the tooltip when pressing the escape key if isDismissable is false", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Tooltip
        defaultOpen
        content={<p data-testid="content-test">tooltip</p>}
        isDismissable={false}
        onClose={onClose}
      >
        <Button>Trigger</Button>
      </Tooltip>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.keyDown(content, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
