import * as React from "react";
import {render, renderHook, fireEvent, act} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {useForm} from "react-hook-form";
import {Form} from "@heroui/form";

import {Input} from "../src";

describe("Input", () => {
  it("should render correctly", () => {
    const wrapper = render(<Input label="test input" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} label="test input" />);
    expect(ref.current).not.toBeNull();
  });

  it("should have aria-invalid when invalid", () => {
    const {container} = render(<Input isInvalid={true} label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
  });

  it("should have aria-readonly when isReadOnly", () => {
    const {container} = render(<Input isReadOnly label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-readonly", "true");
  });

  it("should have disabled attribute when isDisabled", () => {
    const {container} = render(<Input isDisabled label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("disabled");
  });

  it("should disable the clear button when isDisabled", () => {
    const {getByRole} = render(<Input isClearable isDisabled label="test input" />);

    const clearButton = getByRole("button");

    expect(clearButton).toBeDisabled();
  });

  it("should not allow clear button to be focusable", () => {
    const {getByRole} = render(<Input isClearable label="test input" />);

    const clearButton = getByRole("button");

    expect(clearButton).toHaveAttribute("tabIndex", "-1");
  });

  it("should have required attribute when isRequired with native validationBehavior", () => {
    const {container} = render(<Input isRequired label="test input" validationBehavior="native" />);

    expect(container.querySelector("input")).toHaveAttribute("required");
    expect(container.querySelector("input")).not.toHaveAttribute("aria-required");
  });

  it("should have aria-required attribute when isRequired with aria validationBehavior", () => {
    const {container} = render(<Input isRequired label="test input" validationBehavior="aria" />);

    expect(container.querySelector("input")).not.toHaveAttribute("required");
    expect(container.querySelector("input")).toHaveAttribute("aria-required", "true");
  });

  it("should have aria-describedby when description is provided", () => {
    const {container} = render(<Input description="help text" label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have aria-describedby when errorMessage is provided", () => {
    const {container} = render(<Input isInvalid errorMessage="error text" label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have the same aria-labelledby as label id", () => {
    const {container} = render(<Input label="test input" />);

    const labelId = container.querySelector("label")?.id;
    const labelledBy = container.querySelector("input")?.getAttribute("aria-labelledby");

    expect(labelledBy?.includes(labelId as string)).toBeTruthy();
  });

  it("should have the correct type attribute", () => {
    const {container} = render(<Input label="test input" type="email" />);

    expect(container.querySelector("input")).toHaveAttribute("type", "email");

    const {container: container2} = render(<Input label="test input" type="number" />);

    expect(container2.querySelector("input")).toHaveAttribute("type", "number");

    const {container: container3} = render(<Input label="test input" type="password" />);

    expect(container3.querySelector("input")).toHaveAttribute("type", "password");

    const {container: container4} = render(<Input label="test input" type="search" />);

    expect(container4.querySelector("input")).toHaveAttribute("type", "search");

    const {container: container5} = render(<Input label="test input" type="tel" />);

    expect(container5.querySelector("input")).toHaveAttribute("type", "tel");

    const {container: container6} = render(<Input label="test input" type="text" />);

    expect(container6.querySelector("input")).toHaveAttribute("type", "text");
  });

  it("should call dom event handlers only once", () => {
    const onFocus = jest.fn();

    const {container} = render(<Input label="test input" onFocus={onFocus} />);

    act(() => {
      container.querySelector("input")?.focus();
    });
    act(() => {
      container.querySelector("input")?.blur();
    });

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("should work with keyboard input", async () => {
    const {getByTestId} = render(<Input data-testid="input" />);

    const input = getByTestId("input") as HTMLInputElement;

    const user = userEvent.setup();

    act(() => {
      input.focus();
    });
    expect(input.value).toBe("");

    await user.keyboard("Hello World!");
    expect(input.value).toBe("Hello World!");

    await user.keyboard("[Backspace][Backspace]");
    expect(input.value).toBe("Hello Worl");

    await user.keyboard("[ArrowLeft][Delete]");
    expect(input.value).toBe("Hello Wor");
  });

  it("should highlight text with user multi-clicks", async () => {
    const {getByTestId} = render(<Input data-testid="input" defaultValue="Hello World!" />);

    const input = getByTestId("input") as HTMLInputElement;

    const user = userEvent.setup();

    expect(input.value).toBe("Hello World!");

    // in react testing library, input dblClick selects the word/symbol, tripleClick selects the entire text
    await user.tripleClick(input);
    await user.keyboard("Goodbye World!");
    expect(input.value).toBe("Goodbye World!");

    await user.tripleClick(input);
    await user.keyboard("[Delete]");
    expect(input.value).toBe("");
  });

  it("should focus input on click", async () => {
    const {getByTestId} = render(<Input data-testid="input" />);

    const input = getByTestId("input") as HTMLInputElement;
    const innerWrapper = document.querySelector("[data-slot='inner-wrapper']") as HTMLDivElement;
    const inputWrapper = document.querySelector("[data-slot='input-wrapper']") as HTMLDivElement;

    const user = userEvent.setup();

    expect(document.activeElement).not.toBe(input);

    await user.click(input);
    expect(document.activeElement).toBe(input);
    act(() => {
      input.blur();
    });
    expect(document.activeElement).not.toBe(input);

    await user.click(innerWrapper);
    expect(document.activeElement).toBe(input);
    act(() => {
      input.blur();
    });
    expect(document.activeElement).not.toBe(input);

    await user.click(inputWrapper);
    expect(document.activeElement).toBe(input);
    act(() => {
      input.blur();
    });
    expect(document.activeElement).not.toBe(input);
  });

  it("ref should update the value", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} type="text" />);

    if (!ref.current) {
      throw new Error("ref is null");
    }
    const value = "value";

    ref.current!.value = value;

    expect(ref.current?.value)?.toBe(value);
  });

  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <Input
        ref={ref}
        isClearable
        defaultValue="junior@heroui.com"
        label="test input"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(ref.current?.value)?.toBe("");

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("should not display input with hidden type", async () => {
    const wrapper = render(
      <>
        <Input data-testid="input-1" type="hidden" />
        <Input data-testid="input-2" />
      </>,
    );

    const {container} = wrapper;

    const inputBaseWrappers = container.querySelectorAll("[data-slot='base']");

    expect(inputBaseWrappers).toHaveLength(2);

    const inputs = container.querySelectorAll("input");

    expect(inputs).toHaveLength(2);

    expect(inputBaseWrappers[0]).toHaveAttribute("data-hidden");

    expect(inputBaseWrappers[1]).not.toHaveAttribute("data-hidden");

    expect(inputs[0]).not.toBeVisible();

    expect(inputs[1]).toBeVisible();
  });

  it("should disable clear button when isReadOnly is true", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <Input
        ref={ref}
        isClearable
        isReadOnly
        defaultValue="readOnly test for clear button"
        label="test input"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(onClear).toHaveBeenCalledTimes(0);
  });
});

describe("Input with React Hook Form", () => {
  let input1: HTMLInputElement;
  let input2: HTMLInputElement;
  let input3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: "wkw",
          withoutDefaultValue: "",
          requiredField: "",
        },
      }),
    );

    const {
      handleSubmit,
      register,
      formState: {errors},
    } = result.current;

    onSubmit = jest.fn();

    render(
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input isClearable label="With default value" {...register("withDefaultValue")} />
        <Input
          data-testid="input-2"
          label="Without default value"
          {...register("withoutDefaultValue")}
        />
        <Input
          data-testid="input-3"
          label="Required"
          {...register("requiredField", {required: true})}
        />
        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button type="submit">Submit</button>
      </form>,
    );

    input1 = document.querySelector("input[name=withDefaultValue]")!;
    input2 = document.querySelector("input[name=withoutDefaultValue]")!;
    input3 = document.querySelector("input[name=requiredField]")!;
    submitButton = document.querySelector('button[type="submit"]')!;
  });

  it("should work with defaultValues", () => {
    expect(input1).toHaveValue("wkw");
    expect(input2).toHaveValue("");
    expect(input3).toHaveValue("");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    fireEvent.change(input3, {target: {value: "updated"}});

    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  describe("validation", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
    });

    describe("validationBehavior=native", () => {
      it("supports isRequired", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="native">
            <Input isRequired data-testid="input" label="Name" />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).toHaveAttribute("required");
        expect(input).not.toHaveAttribute("aria-required");
        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Constraints not satisfied",
        );

        await user.keyboard("hello");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);

        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="native">
            <Input
              data-testid="input"
              defaultValue="Foo"
              label="Name"
              validate={(v) => (v === "Foo" ? "Invalid name" : null)}
            />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid name",
        );

        await user.keyboard("hello");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);

        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports server validation", async () => {
        function Test() {
          let [serverErrors, setServerErrors] = React.useState({});
          let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setServerErrors({
              name: "Invalid name.",
            });
          };

          return (
            <Form
              data-testid="form"
              validationBehavior="native"
              validationErrors={serverErrors}
              onSubmit={onSubmit}
            >
              <Input data-testid="input" label="Name" name="name" />
              <button data-testid="submit" type="submit">
                Submit
              </button>
            </Form>
          );
        }

        const {getByTestId} = render(<Test />);

        const input = getByTestId("input") as HTMLInputElement;
        const submitButton = getByTestId("submit");

        expect(input).not.toHaveAttribute("aria-describedby");

        await user.click(submitButton);
        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid name.",
        );
        expect(input.validity.valid).toBe(false);

        // Clicking twice doesn't clear server errors.
        await user.click(submitButton);
        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid name.",
        );
        expect(input.validity.valid).toBe(false);

        await user.keyboard("hello");
        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);
      });
    });

    describe('validationBehavior="aria"', () => {
      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="aria">
            <Input
              data-testid="input"
              defaultValue="Foo"
              label="Name"
              validate={(v) => (v === "Foo" ? "Invalid name" : null)}
            />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid name",
        );
        expect(input.validity.valid).toBe(true);

        await user.tab();
        await user.keyboard("hello");
        // TODO: fix this
        // expect(input).not.toHaveAttribute("aria-describedby");
        // expect(input).not.toHaveAttribute("aria-invalid");
      });

      it("supports server validation", async () => {
        const {getByTestId} = render(
          <Form validationBehavior="aria" validationErrors={{name: "Invalid name"}}>
            <Input data-testid="input" label="Name" name="name" />
          </Form>,
        );

        const input = getByTestId("input");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid name",
        );

        await user.tab();
        await user.keyboard("hello");
        await user.tab();

        // TODO: fix this
        // expect(input).not.toHaveAttribute("aria-describedby");
        // expect(input).not.toHaveAttribute("aria-invalid");
      });
    });
  });
});
