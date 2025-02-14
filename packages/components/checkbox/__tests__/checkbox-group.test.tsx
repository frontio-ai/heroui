import * as React from "react";
import {act, render} from "@testing-library/react";
import {Form} from "@heroui/form";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {CheckboxGroup, Checkbox} from "../src";

describe("Checkbox.Group", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <CheckboxGroup defaultValue={[]} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </CheckboxGroup>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <CheckboxGroup ref={ref} defaultValue={[]} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </CheckboxGroup>,
    );

    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with initial value", () => {
    const {container} = render(
      <CheckboxGroup defaultValue={["sydney"]} label="Select cities">
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    // check if the first checkbox is checked
    expect(container.querySelector("[data-testid=first-checkbox] input")).toBeChecked();

    // second checkbox should not be checked
    expect(container.querySelector("[data-testid=second-checkbox] input")).not.toBeChecked();
  });

  it("should change value after click", async () => {
    let value = ["sydney"];
    const wrapper = render(
      <CheckboxGroup
        defaultValue={["sydney"]}
        label="Select cities"
        onChange={(val) => act(() => (value = val as string[]))}
      >
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    const secondCheckbox = wrapper.getByTestId("second-checkbox");

    await user.click(secondCheckbox);

    expect(value).toEqual(["sydney", "buenos-aires"]);
  });

  it("should ignore events when disabled", () => {
    const {container} = render(
      <CheckboxGroup isDisabled defaultValue={["sydney"]} label="Select cities">
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    const firstCheckbox = container.querySelector("[data-testid=first-checkbox] input");
    const secondCheckbox = container.querySelector("[data-testid=second-checkbox] input");

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).not.toBeChecked();

    secondCheckbox && userEvent.click(secondCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).not.toBeChecked();
  });

  it("should work correctly with controlled value", async () => {
    let checked = ["sydney"];
    const onChange = jest.fn((value) => {
      checked = value;
    });

    const wrapper = render(
      <CheckboxGroup
        label="Select cities"
        value={checked}
        onChange={(checked) => {
          act(() => {
            onChange(checked);
          });
        }}
      >
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    const secondCheckbox = wrapper.getByTestId("second-checkbox");

    await user.click(secondCheckbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checked).toEqual(["sydney", "buenos-aires"]);
  });

  describe("validation", () => {
    describe("validationBehavior=native", () => {
      it("supports group level isRequired", async () => {
        let {getAllByRole, getByRole, getByTestId} = render(
          <form data-testid="form">
            <CheckboxGroup isRequired label="Agree to the following" validationBehavior="native">
              <Checkbox value="terms">Terms and conditions</Checkbox>
              <Checkbox value="cookies">Cookies</Checkbox>
              <Checkbox value="privacy">Privacy policy</Checkbox>
            </CheckboxGroup>
          </form>,
        );

        let group = getByRole("group");

        expect(group).not.toHaveAttribute("aria-describedby");

        let checkboxes = getAllByRole("checkbox") as HTMLInputElement[];

        for (let input of checkboxes) {
          expect(input).toHaveAttribute("required");
          expect(input).not.toHaveAttribute("aria-required");
          expect(input.validity.valid).toBe(false);
        }

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(group).toHaveAttribute("aria-describedby");
        expect(document.getElementById(group.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Constraints not satisfied",
        );

        await user.click(checkboxes[0]);
        for (let input of checkboxes) {
          expect(input).not.toHaveAttribute("required");
          expect(input).not.toHaveAttribute("aria-required");
          expect(input.validity.valid).toBe(true);
        }

        expect(group).not.toHaveAttribute("aria-describedby");
      });

      it("supports checkbox level isRequired", async () => {
        let {getAllByRole, getByRole, getByTestId} = render(
          <form data-testid="form">
            <CheckboxGroup label="Agree to the following" validationBehavior="native">
              <Checkbox isRequired value="terms">
                Terms and conditions
              </Checkbox>
              <Checkbox isRequired value="cookies">
                Cookies
              </Checkbox>
              <Checkbox value="privacy">Privacy policy</Checkbox>
            </CheckboxGroup>
          </form>,
        );

        let group = getByRole("group");

        expect(group).not.toHaveAttribute("aria-describedby");

        let checkboxes = getAllByRole("checkbox") as HTMLInputElement[];

        for (let input of checkboxes.slice(0, 2)) {
          expect(input).toHaveAttribute("required");
          expect(input).not.toHaveAttribute("aria-required");
          expect(input.validity.valid).toBe(false);
        }
        expect(checkboxes[2]).not.toHaveAttribute("required");
        expect(checkboxes[2]).not.toHaveAttribute("aria-required");
        expect(checkboxes[2].validity.valid).toBe(true);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(group).toHaveAttribute("aria-describedby");
        expect(document.getElementById(group.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Constraints not satisfied",
        );
        expect(document.activeElement).toBe(checkboxes[0]);

        await user.click(checkboxes[0]);
        await user.click(checkboxes[1]);
        expect(checkboxes[0].validity.valid).toBe(true);
        expect(checkboxes[1].validity.valid).toBe(true);
        expect(group).not.toHaveAttribute("aria-describedby");
      });

      it("supports group level validate function", async () => {
        let {getAllByRole, getByRole, getByTestId} = render(
          <form data-testid="form">
            <CheckboxGroup
              label="Agree to the following"
              validate={(v) => (v.length < 3 ? "You must accept all terms" : null)}
              validationBehavior="native"
            >
              <Checkbox value="terms">Terms and conditions</Checkbox>
              <Checkbox value="cookies">Cookies</Checkbox>
              <Checkbox value="privacy">Privacy policy</Checkbox>
            </CheckboxGroup>
          </form>,
        );

        let group = getByRole("group");

        expect(group).not.toHaveAttribute("aria-describedby");

        let checkboxes = getAllByRole("checkbox") as HTMLInputElement[];

        for (let input of checkboxes) {
          expect(input).not.toHaveAttribute("required");
          expect(input).not.toHaveAttribute("aria-required");
          expect(input.validity.valid).toBe(false);
        }

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(group).toHaveAttribute("aria-describedby");
        expect(document.getElementById(group.getAttribute("aria-describedby")!)).toHaveTextContent(
          "You must accept all terms",
        );
        expect(document.activeElement).toBe(checkboxes[0]);

        await user.click(checkboxes[0]);
        expect(group).toHaveAttribute("aria-describedby");
        for (let input of checkboxes) {
          expect(input.validity.valid).toBe(false);
        }

        await user.click(checkboxes[1]);
        expect(group).toHaveAttribute("aria-describedby");
        for (let input of checkboxes) {
          expect(input.validity.valid).toBe(false);
        }

        await user.click(checkboxes[2]);
        expect(group).not.toHaveAttribute("aria-describedby");
        for (let input of checkboxes) {
          expect(input.validity.valid).toBe(true);
        }
      });

      it("supports server validation", async () => {
        function Test() {
          const [serverErrors, setServerErrors] = React.useState({});
          const onSubmit = (e) => {
            e.preventDefault();
            setServerErrors({
              terms: "You must accept the terms.",
            });
          };

          return (
            <Form validationBehavior="native" validationErrors={serverErrors} onSubmit={onSubmit}>
              <CheckboxGroup label="Agree to the following" name="terms">
                <Checkbox value="terms">Terms and conditions</Checkbox>
                <Checkbox value="cookies">Cookies</Checkbox>
                <Checkbox value="privacy">Privacy policy</Checkbox>
              </CheckboxGroup>
              <button type="submit">Submit</button>
            </Form>
          );
        }

        const {getAllByRole, getByRole} = render(<Test />);

        const group = getByRole("group");

        expect(group).not.toHaveAttribute("aria-describedby");
        const button = getByRole("button");

        expect(button).toBeVisible();
        await user.click(button);

        expect(group).toHaveAttribute("aria-describedby");
        expect(document.getElementById(group.getAttribute("aria-describedby")!)).toHaveTextContent(
          "You must accept the terms.",
        );

        const checkboxes = getAllByRole("checkbox") as HTMLInputElement[];

        for (let input of checkboxes) {
          expect(input.validity.valid).toBe(false);
        }

        await user.click(checkboxes[0]);
        expect(group).not.toHaveAttribute("aria-describedby");
        for (let input of checkboxes) {
          expect(input.validity.valid).toBe(true);
        }
      });
    });

    describe("validationBehavior=aria", () => {
      it("supports group level validate function", async () => {
        let {getAllByRole, getByRole} = render(
          <CheckboxGroup
            label="Agree to the following"
            validate={(v) => (v.length < 3 ? "You must accept all terms" : null)}
            validationBehavior="aria"
          >
            <Checkbox value="terms">Terms and conditions</Checkbox>
            <Checkbox value="cookies">Cookies</Checkbox>
            <Checkbox value="privacy">Privacy policy</Checkbox>
          </CheckboxGroup>,
        );

        let group = getByRole("group");

        expect(group).toHaveAttribute("aria-describedby");
        expect(document.getElementById(group.getAttribute("aria-describedby")!)).toHaveTextContent(
          "You must accept all terms",
        );

        let checkboxes = getAllByRole("checkbox") as HTMLInputElement[];

        for (let input of checkboxes) {
          expect(input).toHaveAttribute("aria-invalid", "true");
          expect(input.validity.valid).toBe(true);
        }

        await user.click(checkboxes[0]);
        expect(group).toHaveAttribute("aria-describedby");

        await user.click(checkboxes[1]);
        expect(group).toHaveAttribute("aria-describedby");

        await user.click(checkboxes[2]);
        expect(group).toHaveAttribute("aria-describedby");
      });

      it("supports server validation", async () => {
        const {getAllByRole, getByRole} = render(
          <Form validationBehavior="aria" validationErrors={{terms: "You must accept the terms"}}>
            <CheckboxGroup label="Agree to the following" name="terms">
              <Checkbox value="terms">Terms and conditions</Checkbox>
              <Checkbox value="cookies">Cookies</Checkbox>
              <Checkbox value="privacy">Privacy policy</Checkbox>
            </CheckboxGroup>
          </Form>,
        );

        const group = getByRole("group");

        expect(group).toHaveAttribute("aria-describedby");
        expect(document.getElementById(group.getAttribute("aria-describedby")!)).toHaveTextContent(
          "You must accept the terms",
        );

        const checkboxes = getAllByRole("checkbox");

        for (let input of checkboxes) {
          expect(input).toHaveAttribute("aria-invalid", "true");
        }

        // TODO: Fix the following functions to work
        // await user.click(checkboxes[0]);
        // expect(group).not.toHaveAttribute("aria-describedby");
      });
    });
  });
});
