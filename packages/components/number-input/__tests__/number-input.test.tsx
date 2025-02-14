import * as React from "react";
import {render, renderHook, fireEvent, act} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {useForm} from "react-hook-form";
import {Form} from "@heroui/form";

import {NumberInput} from "../src";

describe("NumberInput", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<NumberInput label="test number input" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<NumberInput ref={ref} label="test number input" />);

    expect(ref.current).not.toBeNull();
  });

  it("should have aria-invalid when invalid", () => {
    const {container} = render(<NumberInput isInvalid={true} label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
  });

  it("should have aria-readonly when isReadOnly", () => {
    const {container} = render(<NumberInput isReadOnly label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-readonly", "true");
  });

  it("should have disabled attribute when isDisabled", () => {
    const {container} = render(<NumberInput isDisabled label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("disabled");
  });

  it("should disable the clear button when isDisabled", () => {
    const {getByRole} = render(
      <NumberInput hideStepper isClearable isDisabled label="test number input" />,
    );

    const clearButton = getByRole("button");

    expect(clearButton).toBeDisabled();
  });

  it("should not allow clear button to be focusable", () => {
    const {getByRole} = render(<NumberInput hideStepper isClearable label="test number input" />);

    const clearButton = getByRole("button");

    expect(clearButton).toHaveAttribute("tabIndex", "-1");
  });

  it("should have required attribute when isRequired with native validationBehavior", () => {
    const {container} = render(
      <NumberInput isRequired label="test number input" validationBehavior="native" />,
    );

    expect(container.querySelector("input")).toHaveAttribute("required");
    expect(container.querySelector("input")).not.toHaveAttribute("aria-required");
  });

  it("should have aria-required attribute when isRequired with aria validationBehavior", () => {
    const {container} = render(
      <NumberInput isRequired label="test number input" validationBehavior="aria" />,
    );

    expect(container.querySelector("input")).not.toHaveAttribute("required");
    expect(container.querySelector("input")).toHaveAttribute("aria-required", "true");
  });

  it("should have aria-describedby when description is provided", () => {
    const {container} = render(<NumberInput description="description" label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have aria-describedby when errorMessage is provided", () => {
    const {container} = render(
      <NumberInput isInvalid errorMessage="error text" label="test number input" />,
    );

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have the same aria-labelledby as label id", () => {
    const {container} = render(<NumberInput label="test number input" />);

    const labelId = container.querySelector("label")?.id;

    const labelledBy = container.querySelector("input")?.getAttribute("aria-labelledby");

    expect(labelledBy?.includes(labelId as string)).toBeTruthy();
  });

  it("should call dom event handlers only once", () => {
    const onFocus = jest.fn();

    const {container} = render(<NumberInput label="test number input" onFocus={onFocus} />);

    act(() => {
      container.querySelector("input")?.focus();

      container.querySelector("input")?.blur();

      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  it("ref should update the value", () => {
    const ref = React.createRef<HTMLInputElement>();

    const {container} = render(<NumberInput ref={ref} label="test number input" />);

    if (!ref.current) {
      throw new Error("ref is null");
    }
    const value = "1234";

    ref.current!.value = value;

    act(() => {
      container.querySelector("input")?.focus();

      expect(ref.current?.value)?.toBe(value);
    });
  });

  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <NumberInput
        ref={ref}
        hideStepper
        isClearable
        defaultValue={1234}
        label="test number-input"
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

  it("should disable clear button when isReadOnly is true", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <NumberInput
        ref={ref}
        hideStepper
        isClearable
        isReadOnly
        defaultValue={1234}
        label="test number-input"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(onClear).toHaveBeenCalledTimes(0);
  });

  it("should reset to max value if the value exceeds", async () => {
    const {container} = render(
      <NumberInput isInvalid={true} label="test number input" maxValue={100} />,
    );

    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.keyboard("1024");
    await user.tab();

    expect(input).toHaveValue("100");
  });

  it("should reset to min value if the value subceed", async () => {
    const {container} = render(
      <NumberInput isInvalid={true} label="test number input" minValue={100} />,
    );

    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.keyboard("50");
    await user.tab();

    expect(input).toHaveValue("100");
  });

  it("should render stepper", async () => {
    const {container} = render(<NumberInput isInvalid={true} label="test number input" />);

    const stepperButton = container.querySelector("[data-slot='stepper-wrapper'] button")!;

    expect(stepperButton).not.toBeNull();
  });

  it("should hide stepper", async () => {
    const {container} = render(
      <NumberInput hideStepper isInvalid={true} label="test number input" />,
    );

    const stepperButton = container.querySelector("[data-slot='stepper-wrapper'] button")!;

    expect(stepperButton).toBeNull();
  });
});

describe("NumberInput with React Hook Form", () => {
  let input1: HTMLInputElement;
  let input2: HTMLInputElement;
  let input3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: 1234,
          withoutDefaultValue: undefined,
          requiredField: undefined,
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
        <NumberInput isClearable label="With default value" {...register("withDefaultValue")} />
        <NumberInput
          data-testid="input-2"
          label="Without default value"
          {...register("withoutDefaultValue")}
        />
        <NumberInput
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
    expect(input1).toHaveValue("1234");
    expect(input2).not.toHaveValue();
    expect(input3).not.toHaveValue();
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    fireEvent.change(input3, {target: {value: 123}});

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
            <NumberInput isRequired data-testid="input" label="Name" />
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

        await user.keyboard("1234");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);

        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="native">
            <NumberInput
              data-testid="input"
              defaultValue={1234}
              label="Name"
              validate={(v) => (v === 1234 ? "Invalid amount" : null)}
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
          "Invalid amount",
        );

        await user.keyboard("4321");
        await user.tab();

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(input.validity.valid).toBe(true);
        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports server validation", async () => {
        function Test() {
          let [serverErrors, setServerErrors] = React.useState({});
          let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setServerErrors({
              name: "Invalid amount.",
            });
          };

          return (
            <Form
              data-testid="form"
              validationBehavior="native"
              validationErrors={serverErrors}
              onSubmit={onSubmit}
            >
              <NumberInput data-testid="input" label="Name" name="name" />
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
          "Invalid amount.",
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
          "Invalid amount.",
        );
        expect(input.validity.valid).toBe(false);

        await user.keyboard("1234");
        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);
      });
    });

    describe('validationBehavior="aria"', () => {
      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="aria">
            <NumberInput
              data-testid="input"
              defaultValue={1234}
              label="Amount"
              validate={(v) => (v === 1234 ? "Invalid amount" : null)}
            />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid amount",
        );
        expect(input.validity.valid).toBe(true);

        await user.tab();
        await user.keyboard("1234");
      });

      it("supports server validation", async () => {
        const {getByTestId} = render(
          <Form validationBehavior="aria" validationErrors={{name: "Invalid amount"}}>
            <NumberInput data-testid="input" label="Name" name="name" />
          </Form>,
        );

        const input = getByTestId("input");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid amount",
        );

        await user.tab();
        await user.keyboard("1234");
        await user.tab();
      });
    });
  });
});
