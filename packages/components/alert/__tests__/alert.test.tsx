import * as React from "react";
import {act, render} from "@testing-library/react";

import {Alert} from "../src";

const title = "Testing Title";
const description = "Testing Description";

describe("Alert", () => {
  it("should render correctly", () => {
    const wrapper = render(<Alert description={description} title={title} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Alert ref={ref} description={description} title={title} />);
    expect(ref.current).not.toBeNull();
  });

  it("should display title and description when component is rendered", () => {
    const wrapper = render(<Alert description={description} title={title} />);

    const titleElement = wrapper.getByText(title);
    const descriptionElement = wrapper.getByText(description);

    expect(titleElement).toContainHTML(title);
    expect(descriptionElement).toContainHTML(description);
  });

  it("should show close button when is Closeable", () => {
    const {getByRole} = render(<Alert description={description} title={title} />);
    const button = getByRole("button");

    expect(button).toBeVisible();
  });

  it("should not show close button when not is Closeable", () => {
    const wrapper = render(<Alert description={description} isCloseable={false} title={title} />);
    const button = wrapper.queryByRole("button");

    expect(button).toBeNull();
  });

  it("should call the onClose function when clicking on close button", async () => {
    const onClose = jest.fn();

    const wrapper = render(<Alert description={description} title={title} onClose={onClose} />);
    const button = wrapper.getByRole("button");

    act(() => {
      button.click();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
