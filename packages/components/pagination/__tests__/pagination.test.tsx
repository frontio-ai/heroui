import * as React from "react";
import {render} from "@testing-library/react";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Pagination} from "../src";

describe("Pagination", () => {
  it("should render correctly", () => {
    const wrapper = render(<Pagination total={10} />);

    expect(() => wrapper.unmount()).not.toThrow();

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLUListElement>();

    render(<Pagination ref={ref} total={10} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly with controls", () => {
    const wrapper = render(<Pagination showControls total={10} />);

    const nextButton = wrapper.getByLabelText("next page button");
    const prevButton = wrapper.getByLabelText("previous page button");

    expect(nextButton).not.toBeNull();
    expect(prevButton).not.toBeNull();
  });

  it("should render correctly without controls", () => {
    const wrapper = render(<Pagination total={10} />);

    const nextButton = wrapper.queryByLabelText("next page button");
    const prevButton = wrapper.queryByLabelText("previous page button");

    expect(nextButton).toBeNull();
    expect(prevButton).toBeNull();
  });

  it("should show dots when total is greater than 10", () => {
    const wrapper = render(<Pagination total={10} />);

    const dots = wrapper.queryAllByLabelText("dots element");

    expect(dots).toHaveLength(1);
  });

  it("should show 2 dots when total is greater than 10 and the initialPage is in de middle", () => {
    const wrapper = render(<Pagination initialPage={6} total={10} />);

    const dots = wrapper.queryAllByLabelText("dots element");

    expect(dots).toHaveLength(2);
  });

  it("the pagination cursor should have a aria-hidden attribute", () => {
    const {container} = render(<Pagination total={10} />);

    const cursor = container.querySelector("span[aria-hidden]");

    expect(cursor).toHaveAttribute("aria-hidden", "true");
  });

  it("the pagination cursor should not have data-moving attribute before intersection", () => {
    const originalIntersectionObserver = window.IntersectionObserver;

    // save callback and options to later emulate intersection event
    let intersectCallback: IntersectionObserverCallback | undefined;
    let intersectOptions: IntersectionObserverInit | undefined;

    // defined here as we need the closure
    class MockIntersectionObserver implements IntersectionObserver {
      root: Element | null = null;
      rootMargin: string = "";
      thresholds: number[] = [];
      disconnect: () => void = () => {};
      observe: (target: Element) => void = () => {};
      unobserve: (target: Element) => void = () => {};
      takeRecords: () => IntersectionObserverEntry[] = () => [];

      constructor(
        private readonly callback: IntersectionObserverCallback,
        private readonly options?: IntersectionObserverInit,
      ) {
        this.root = (this.options?.root ?? null) as Element | null;
        this.rootMargin = this.options?.rootMargin ?? "";
        this.thresholds = Array.isArray(this.options?.threshold)
          ? this.options.threshold
          : this.options?.threshold != null
          ? [this.options.threshold]
          : [0];
        this.disconnect = jest.fn();
        this.observe = jest.fn();
        this.unobserve = jest.fn();
        this.takeRecords = jest.fn();

        // save to closure
        intersectCallback = this.callback;
        intersectOptions = this.options;
      }
    }

    // hijack the IntersectionObserver implementation so useIntersectionObserver returns our mock
    window.IntersectionObserver = MockIntersectionObserver;

    const {container, rerender} = render(<Pagination total={10} />);

    const cursor = container.querySelector("span[data-slot='cursor']");

    // on first render, the cursor should not have the data-moving attribute until the observer is triggered
    expect(cursor).not.toHaveAttribute("data-moving");

    // trigger the observer with a full intersection
    intersectCallback?.(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target: container,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: {} as DOMRectReadOnly,
          time: 0,
        },
      ],
      new MockIntersectionObserver(intersectCallback, intersectOptions),
    );

    // rerender the component to update cursor state after intersection
    rerender(<Pagination total={10} />);

    // on rerender, the cursor should have the data-moving attribute
    expect(cursor).toHaveAttribute("data-moving");

    window.IntersectionObserver = originalIntersectionObserver;
  });
});
