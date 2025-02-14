import * as React from "react";
import {render} from "@testing-library/react";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Spacer} from "../src";

describe("Spacer", () => {
  it("should render correctly", () => {
    const wrapper = render(<Spacer />);

    expect(() => wrapper.unmount()).not.toThrow();

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Spacer ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
