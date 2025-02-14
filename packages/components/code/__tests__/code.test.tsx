import * as React from "react";
import {render} from "@testing-library/react";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Code} from "../src";

describe("Code", () => {
  it("should render correctly", () => {
    const wrapper = render(<Code />);

    expect(() => wrapper.unmount()).not.toThrow();

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Code ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should include the code", () => {
    const wrapper = render(<Code data-testid="code-test">npm install @heroui/react</Code>);

    expect(wrapper.getByTestId("code-test")).toHaveTextContent("npm install @heroui/react");
  });
});
