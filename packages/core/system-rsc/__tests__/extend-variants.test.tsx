import React from "react";
import {render, screen} from "@testing-library/react";

import {extendVariants, ExtendVariantProps} from "../src/extend-variants";
import {Button} from "../test-utils/extend-components";
import {Card} from "../test-utils/slots-component";

const createExtendNoSlotsComponent = (styles: ExtendVariantProps = {}) =>
  extendVariants(Button, {
    variants: {
      isScalable: {
        true: "scale-125",
        false: "",
      },
      size: {
        xl: "size--xl",
        "2xl": "size--2xl",
      },
      mySize: {
        lg: "px-12 py-6 text-lg",
        xl: "px-12 py-6 text-xl",
      },
      ...styles?.variants,
    },
    defaultVariants: {
      size: "xl",
      ...styles?.defaultVariants,
    },
    compoundVariants: styles?.compoundVariants ?? [
      {
        isScalable: true,
        size: "2xl",
        class: "scale-150",
      },
    ],
  });

const createExtendSlotsComponent = () =>
  extendVariants(Card, {
    variants: {
      shadow: {
        none: {
          base: "shadow-xs",
        },
        sm: {
          base: "shadow-xs",
        },
        xl: {
          base: "shadow-xl",
        },
      },
      radius: {
        none: {
          base: "rounded-xs",
          header: "rounded-xs",
          footer: "rounded-xs",
        },
        sm: {
          base: "rounded-sm",
          header: "rounded-t-sm",
          footer: "rounded-b-sm",
        },
        xl: {
          base: "rounded-xl",
          header: "rounded-t-xl",
          footer: "rounded-b-xl",
        },
      },
    },
    defaultVariants: {
      shadow: "xl",
      radius: "xl",
    },
  });

describe("extendVariants function - no slots", () => {
  it("should render correctly", () => {
    const Button2 = createExtendNoSlotsComponent();
    const wrapper = render(<Button2 disableRipple />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLButtonElement>();
    const Button2 = createExtendNoSlotsComponent();

    render(<Button2 ref={ref} disableRipple />);
    expect(ref.current).not.toBeNull();
  });

  test("should render with given text", () => {
    const Button2 = createExtendNoSlotsComponent();

    render(<Button2>Press me</Button2>);

    expect(screen.getByText("Press me")).toBeInTheDocument();
  });

  test("should override the base styles", () => {
    const Button2 = createExtendNoSlotsComponent();
    const {container} = render(
      <Button2 className="px-3 py-2 rounded-medium hover:opacity-80">Press me</Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("px-3 py-2 rounded-medium hover:opacity-80");
  });

  test("should have the default variant styles - extended", () => {
    const Button2 = createExtendNoSlotsComponent();
    const {container} = render(<Button2>Press me</Button2>);

    const button = container.querySelector("button");

    expect(button).toHaveClass("size--xl");
  });

  test("should have the default variant styles - original", () => {
    const Button2 = createExtendNoSlotsComponent({
      defaultVariants: {
        size: "sm",
      },
    });

    const {container} = render(<Button2>Press me</Button2>);

    const button = container.querySelector("button");

    expect(button).toHaveClass("px-3 min-w-16 h-8 text-tiny gap-2 rounded-small");
  });

  test("should include the compound variant styles - extended", () => {
    const Button2 = createExtendNoSlotsComponent();
    const {container} = render(
      <Button2 isScalable size="2xl">
        Press me
      </Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("scale-150");
  });

  test("should include the compound variant styles - original", () => {
    const Button2 = createExtendNoSlotsComponent({
      compoundVariants: [
        {
          isScalable: true,
          size: "lg",
          class: "scale-150",
        },
      ],
    });

    const {container} = render(
      <Button2 isScalable size="lg">
        Press me
      </Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("scale-150");
  });
});

describe("extendVariants function - with slots", () => {
  it("should render correctly", () => {
    const Card2 = createExtendSlotsComponent();
    const wrapper = render(<Card2 />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();
    const Card2 = createExtendSlotsComponent();

    render(<Card2 ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  test("should render with given text", () => {
    const Card2 = createExtendSlotsComponent();

    render(<Card2>Card Content</Card2>);

    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  test("should override the base styles", () => {
    const Card2 = createExtendSlotsComponent();
    const {container} = render(
      <Card2 className="px-3 py-2 rounded-medium hover:opacity-80">Card Content</Card2>,
    );

    const card = container.querySelector("div");

    expect(card).toHaveClass("px-3 py-2 rounded-medium hover:opacity-80");
  });

  test("should have the default variant styles - (base slot) extended", () => {
    const Card2 = createExtendSlotsComponent();
    const {getByTestId} = render(<Card2>Card Content</Card2>);

    const baseEl = getByTestId("base");

    expect(baseEl).toHaveClass("shadow-xl");
  });

  test("should have all slots styles", () => {
    const Card2 = createExtendSlotsComponent();
    const {getByTestId} = render(<Card2>Card Content</Card2>);

    const baseEl = getByTestId("base");
    const headerEl = getByTestId("header");
    const footerEl = getByTestId("footer");

    // shadow
    expect(baseEl).toHaveClass("shadow-xl");
    expect(headerEl).toHaveClass("rounded-t-xl");
    expect(footerEl).toHaveClass("rounded-b-xl");

    // radius
    expect(baseEl).toHaveClass("rounded-xl");
    expect(headerEl).toHaveClass("rounded-t-xl");
    expect(footerEl).toHaveClass("rounded-b-xl");
  });

  test("should override the slots styles", () => {
    const Card2 = createExtendSlotsComponent();
    const {getByTestId} = render(<Card2 classNames={{base: "shadow-xs"}}>Card Content</Card2>);

    const baseEl = getByTestId("base");

    expect(baseEl).toHaveClass("shadow-xs");
  });

  test("should override all slots styles", () => {
    const Card2 = createExtendSlotsComponent();
    const {getByTestId} = render(
      <Card2 classNames={{base: "shadow-xs", header: "rounded-none"}}>Card Content</Card2>,
    );

    const baseEl = getByTestId("base");
    const headerEl = getByTestId("header");

    expect(baseEl).toHaveClass("shadow-xs");
    expect(headerEl).toHaveClass("rounded-none");
  });
});
