import * as React from "react";
import {render} from "@testing-library/react";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Kbd} from "../src";

describe("Kbd", () => {
  it("should render correctly", () => {
    const wrapper = render(<Kbd />);

    expect(() => wrapper.unmount()).not.toThrow();

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Kbd ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render children", () => {
    const wrapper = render(<Kbd>K</Kbd>);

    expect(wrapper.getByText("K")).toBeTruthy();
  });

  it("should render single key", () => {
    const wrapper = render(<Kbd keys={["command"]}>K</Kbd>);

    const abbr = wrapper.getByTitle("Command");

    expect(abbr).toBeTruthy();
  });

  it("should render multiple keys", () => {
    const wrapper = render(<Kbd keys={["command", "enter", "ctrl"]}>K</Kbd>);

    const container = wrapper.container;

    const abbr = container.querySelectorAll("abbr");

    expect(abbr).toHaveLength(3);

    expect(abbr[0]).toHaveTextContent("⌘");
    expect(abbr[1]).toHaveTextContent("↵");
    expect(abbr[2]).toHaveTextContent("⌃");

    expect(abbr[0]).toHaveAttribute("title", "Command");
    expect(abbr[1]).toHaveAttribute("title", "Enter");
    expect(abbr[2]).toHaveAttribute("title", "Control");

    expect(wrapper.getByText("K")).toBeTruthy();
  });
});
