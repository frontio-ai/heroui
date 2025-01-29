import * as React from "react";
import {render} from "@testing-library/react";

import {Disclosure} from "../src";

describe("Disclosure", () => {
  it("should render correctly", () => {
    const wrapper = render(<Disclosure />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Disclosure ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
