import "@testing-library/jest-dom";
import * as React from "react";
import {within, render, renderHook, act} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";
import {useForm} from "react-hook-form";
import {Form} from "@heroui/form";

import {Autocomplete, AutocompleteItem, AutocompleteProps, AutocompleteSection} from "../src";
import {Modal, ModalContent, ModalBody, ModalHeader, ModalFooter} from "../../modal/src";

type Item = {
  label: string;
  value: string;
};

const itemsData: Item[] = [
  {label: "Cat", value: "cat"},
  {label: "Dog", value: "dog"},
  {label: "Elephant", value: "elephant"},
  {label: "Lion", value: "lion"},
  {label: "Tiger", value: "tiger"},
  {label: "Giraffe", value: "giraffe"},
  {label: "Dolphin", value: "dolphin"},
  {label: "Penguin", value: "penguin"},
  {label: "Zebra", value: "zebra"},
  {label: "Shark", value: "shark"},
  {label: "Whale", value: "whale"},
  {label: "Otter", value: "otter"},
  {label: "Crocodile", value: "crocodile"},
];

const itemsSectionData = [
  {
    key: "mammals",
    title: "Mammals",
    children: [
      {key: "lion", label: "Lion", value: "lion"},
      {key: "tiger", label: "Tiger", value: "tiger"},
      {key: "elephant", label: "Elephant", value: "elephant"},
    ],
  },
  {
    key: "birds",
    title: "Birds",
    children: [
      {key: "penguin", label: "Penguin", value: "penguin"},
      {key: "ostrich", label: "Ostrich", value: "ostrich"},
      {key: "peacock", label: "Peacock", value: "peacock"},
    ],
  },
];

const ControlledAutocomplete = <T extends object>(props: AutocompleteProps<T>) => {
  const [selectedKey, setSelectedKey] = React.useState<React.Key | null>("cat");

  return (
    <Autocomplete
      {...props}
      aria-label="Favorite Animal"
      label="Favorite Animal"
      selectedKey={selectedKey}
      onSelectionChange={setSelectedKey}
    />
  );
};

const AutocompleteExample = (props: Partial<AutocompleteProps> = {}) => (
  <Autocomplete label="Favorite Animal" {...props}>
    <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
    <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
    <AutocompleteItem key="shark">Shark</AutocompleteItem>
  </Autocomplete>
);

describe("Autocomplete", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<AutocompleteExample />);

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <Autocomplete ref={ref} aria-label="Favorite Animal" label="Favorite Animal">
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    expect(ref.current).not.toBeNull();
  });

  it("should render correctly (dynamic)", () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" items={itemsData} label="Favorite Animal">
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" label="Favorite Animal">
        <AutocompleteSection title="Birds">
          <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        </AutocompleteSection>
        <AutocompleteSection title="Mammals">
          <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
          <AutocompleteItem key="shark">Shark</AutocompleteItem>
        </AutocompleteSection>
      </Autocomplete>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" items={itemsSectionData} label="Favorite Animal">
        {(section) => (
          <AutocompleteSection<Item>
            aria-label={section.title}
            items={section.children}
            title={section.title}
          >
            {/* @ts-ignore TODO: fix section children types*/}
            {(item: Item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
          </AutocompleteSection>
        )}
      </Autocomplete>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should focus when clicking autocomplete", async () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" data-testid="autocomplete" label="Favorite Animal">
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the select listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // assert that the autocomplete input is focused
    expect(autocomplete).toHaveFocus();
  });

  it("should clear value after clicking clear button", async () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" data-testid="autocomplete" label="Favorite Animal">
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the select listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    let options = wrapper.getAllByRole("option");

    // select the target item
    await user.click(options[0]);

    const {container} = wrapper;

    const clearButton = container.querySelector(
      "[data-slot='inner-wrapper'] button:nth-of-type(1)",
    )!;

    expect(clearButton).not.toBeNull();

    // click the clear button
    await user.click(clearButton);

    // assert that the input has empty value
    expect(autocomplete).toHaveValue("");

    // assert that input is focused
    expect(autocomplete).toHaveFocus();
  });

  it("should clear arbitrary value after clicking clear button", async () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" data-testid="autocomplete" label="Favorite Animal">
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the select listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("pe");

    const {container} = wrapper;

    const clearButton = container.querySelector(
      "[data-slot='inner-wrapper'] button:nth-of-type(1)",
    )!;

    expect(clearButton).not.toBeNull();

    // click the clear button
    await user.click(clearButton);

    // assert that the input has empty value
    expect(autocomplete).toHaveValue("");

    // assert that input is focused
    expect(autocomplete).toHaveFocus();
  });

  it("should keep the ListBox open after clicking clear button", async () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" data-testid="autocomplete" label="Favorite Animal">
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the select listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    let options = wrapper.getAllByRole("option");

    // select the target item
    await user.click(options[0]);

    const {container} = wrapper;

    const clearButton = container.querySelector(
      "[data-slot='inner-wrapper'] button:nth-of-type(1)",
    )!;

    expect(clearButton).not.toBeNull();

    // click the clear button
    await user.click(clearButton);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");
  });

  it("should clear value after clicking clear button (controlled)", async () => {
    const wrapper = render(
      <ControlledAutocomplete data-testid="autocomplete" items={itemsData}>
        {(item) => <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>}
      </ControlledAutocomplete>,
    );

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the select listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    let options = wrapper.getAllByRole("option");

    // select the target item
    await user.click(options[0]);

    const {container} = wrapper;

    const clearButton = container.querySelector(
      "[data-slot='inner-wrapper'] button:nth-of-type(1)",
    )!;

    expect(clearButton).not.toBeNull();

    /// click the clear button
    await user.click(clearButton);

    // assert that the input has empty value
    expect(autocomplete).toHaveValue("");

    // assert that input is focused
    expect(autocomplete).toHaveFocus();
  });

  it("should keep the ListBox open after clicking clear button (controlled)", async () => {
    const wrapper = render(
      <ControlledAutocomplete data-testid="autocomplete" items={itemsData}>
        {(item) => <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>}
      </ControlledAutocomplete>,
    );

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the select listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    let options = wrapper.getAllByRole("option");

    // select the target item
    await user.click(options[0]);

    const {container} = wrapper;

    const clearButton = container.querySelector(
      "[data-slot='inner-wrapper'] button:nth-of-type(1)",
    )!;

    expect(clearButton).not.toBeNull();

    // click the clear button
    await user.click(clearButton);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");
  });

  it("should open and close listbox by clicking selector button", async () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" data-testid="autocomplete" label="Favorite Animal">
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    const {container} = wrapper;

    const selectorButton = container.querySelector(
      "[data-slot='inner-wrapper'] button:nth-of-type(2)",
    )!;

    expect(selectorButton).not.toBeNull();

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the select listbox by clicking selector button
    await user.click(selectorButton);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // assert that input is focused
    expect(autocomplete).toHaveFocus();

    // close the select listbox by clicking selector button again
    await user.click(selectorButton);

    // assert that the autocomplete listbox is closed
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");

    // assert that input is still focused
    expect(autocomplete).toHaveFocus();
  });

  it("should close listbox when clicking outside autocomplete", async () => {
    const wrapper = render(
      <Autocomplete
        aria-label="Favorite Animal"
        data-testid="close-when-clicking-outside-test"
        label="Favorite Animal"
      >
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // click outside the autocomplete component
    await user.click(document.body);

    // assert that the autocomplete is closed
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");

    // assert that input is not focused
    expect(autocomplete).not.toHaveFocus();
  });

  it("should close listbox when clicking outside autocomplete with modal open", async () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
            <Autocomplete
              aria-label="Favorite Animal"
              data-testid="close-when-clicking-outside-test"
              label="Favorite Animal"
            >
              <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
              <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
              <AutocompleteItem key="shark">Shark</AutocompleteItem>
            </Autocomplete>
          </ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const autocomplete = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the autocomplete listbox

    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // click outside the autocomplete component
    await user.click(document.body);

    // assert that the autocomplete listbox is closed
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
  });

  it("should set the input after selection", async () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" data-testid="autocomplete" label="Favorite Animal">
        <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="shark">Shark</AutocompleteItem>
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("autocomplete");

    // open the listbox
    await user.click(autocomplete);

    // assert that the autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // assert that input is focused
    expect(autocomplete).toHaveFocus();

    let options = wrapper.getAllByRole("option");

    expect(options.length).toBe(3);

    // select the target item
    await user.click(options[0]);

    // assert that the input has target selection
    expect(autocomplete).toHaveValue("Penguin");
  });

  it("should close listbox by clicking another autocomplete", async () => {
    const wrapper = render(
      <>
        <Autocomplete
          aria-label="Favorite Animal"
          data-testid="autocomplete"
          label="Favorite Animal"
        >
          <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
          <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
          <AutocompleteItem key="shark">Shark</AutocompleteItem>
        </Autocomplete>
        <Autocomplete
          aria-label="Favorite Animal"
          data-testid="autocomplete2"
          label="Favorite Animal"
        >
          <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
          <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
          <AutocompleteItem key="shark">Shark</AutocompleteItem>
        </Autocomplete>
      </>,
    );

    const {container} = wrapper;

    const autocomplete = wrapper.getByTestId("autocomplete");

    const autocomplete2 = wrapper.getByTestId("autocomplete2");

    const innerWrappers = container.querySelectorAll("[data-slot='inner-wrapper']");

    const selectorButton = innerWrappers[0].querySelector("button:nth-of-type(2)")!;

    const selectorButton2 = innerWrappers[1].querySelector("button:nth-of-type(2)")!;

    expect(selectorButton).not.toBeNull();

    expect(selectorButton2).not.toBeNull();

    // open the select listbox by clicking selector button in the first autocomplete
    await user.click(selectorButton);

    // assert that the first autocomplete listbox is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // assert that input is focused
    expect(autocomplete).toHaveFocus();

    // close the select listbox by clicking the second autocomplete
    await user.click(selectorButton2);

    // assert that the first autocomplete listbox is closed
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");

    // assert that the second autocomplete listbox is open
    expect(autocomplete2).toHaveAttribute("aria-expanded", "true");

    // assert that the first autocomplete is not focused
    expect(autocomplete).not.toHaveFocus();

    // assert that the second autocomplete is focused
    expect(autocomplete2).toHaveFocus();
  });

  it("should work when key equals textValue", async () => {
    const wrapper = render(
      <Autocomplete
        aria-label="Favorite Animal"
        data-testid="when-key-equals-textValue"
        defaultSelectedKey="cat"
        items={itemsData}
        label="Favorite Animal"
      >
        {(item) => <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>}
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("when-key-equals-textValue");

    const user = userEvent.setup();

    await user.click(autocomplete);

    expect(autocomplete).toHaveValue("cat");
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    let listboxItems = wrapper.getAllByRole("option");

    await user.click(listboxItems[1]);

    expect(autocomplete).toHaveValue("dog");
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
  });

  it("should work when key equals textValue (controlled)", async () => {
    const wrapper = render(
      <ControlledAutocomplete data-testid="when-key-equals-textValue" items={itemsData}>
        {(item) => <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>}
      </ControlledAutocomplete>,
    );

    const autocomplete = wrapper.getByTestId("when-key-equals-textValue");

    const user = userEvent.setup();

    await user.click(autocomplete);

    expect(autocomplete).toHaveValue("cat");
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    let listboxItems = wrapper.getAllByRole("option");

    await user.click(listboxItems[1]);

    expect(autocomplete).toHaveValue("dog");
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
  });

  describe("validation", () => {
    let user;

    beforeAll(() => {
      user = userEvent.setup();
    });

    describe("validationBehavior=native", () => {
      it("supports isRequired", async () => {
        const {getByTestId, getByRole, findByRole} = render(
          <Form data-testid="form" validationBehavior="native">
            <AutocompleteExample isRequired />
          </Form>,
        );

        const input = getByRole("combobox") as HTMLInputElement;

        expect(input).toHaveAttribute("required");
        expect(input).not.toHaveAttribute("aria-required");
        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Constraints not satisfied",
        );

        await user.click(input);
        await user.keyboard("pe");

        const listbox = await findByRole("listbox");
        const items = within(listbox).getAllByRole("option");

        await user.click(items[0]);
        expect(input).toHaveAttribute("aria-describedby");
      });

      it("supports server validation", async () => {
        function Test() {
          const [serverErrors, setServerErrors] = React.useState({});
          const onSubmit = (e) => {
            e.preventDefault();
            setServerErrors({
              value: "Invalid value.",
            });
          };

          return (
            <Form validationBehavior="native" validationErrors={serverErrors} onSubmit={onSubmit}>
              <AutocompleteExample data-testid="input" name="value" />
              <button data-testid="submit" type="submit">
                Submit
              </button>
            </Form>
          );
        }

        const {getByTestId, getByRole} = render(<Test />);

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).not.toHaveAttribute("aria-describedby");

        await user.click(getByTestId("submit"));

        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid value.",
        );
        expect(input.validity.valid).toBe(false);

        await user.tab({shift: true});
        await user.keyboard("[ArrowRight]Ze");

        act(() => {
          jest.runAllTimers();
        });

        const listbox = getByRole("listbox");
        const items = within(listbox).getAllByRole("option");

        await user.click(items[0]);
        act(() => {
          jest.runAllTimers();
        });

        expect(input).toHaveAttribute("aria-describedby");
        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);
      });

      // this test is to cover a case where hovering over the combobox causes the validation from use-input to overwrite the validation from use-autocomplete if not handled properly
      // this causes the first form submit after initial render to always succeed even if the validate function returns an error
      it("should work with validate after hovering", async () => {
        const onSubmit = jest.fn((e) => {
          e.preventDefault();
        });

        const {getByTestId, findByRole} = render(
          <Form validationBehavior="native" onSubmit={onSubmit}>
            <AutocompleteExample
              data-testid="combobox"
              name="animal"
              validate={(value) => {
                if (!value?.selectedKey) {
                  return "Please select an animal";
                }
              }}
              validationBehavior="native"
            />
            <button data-testid="submit" type="submit">
              Submit
            </button>
          </Form>,
        );

        const combobox = getByTestId("combobox") as HTMLInputElement;
        const submit = getByTestId("submit");

        expect(combobox).not.toHaveAttribute("aria-describedby");
        expect(combobox.validity.valid).toBe(false);

        await user.hover(combobox);
        await user.click(submit);

        expect(onSubmit).toHaveBeenCalledTimes(0);
        expect(combobox).toHaveAttribute("aria-describedby");
        expect(
          document.getElementById(combobox.getAttribute("aria-describedby")!),
        ).toHaveTextContent("Please select an animal");

        await user.click(combobox);
        await user.keyboard("pe");

        const listbox = await findByRole("listbox");
        const items = within(listbox).getAllByRole("option");

        await user.click(items[0]);
        expect(combobox).toHaveAttribute("aria-describedby");

        await user.click(submit);
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(combobox).not.toHaveAttribute("aria-describedby");
      });
    });

    describe("validationBehavior=aria", () => {
      it("supports validate function", async () => {
        let {getByRole, findByRole} = render(
          <form data-testid="form">
            <AutocompleteExample
              defaultSelectedKey="penguin"
              validate={(v) => (v.selectedKey === "penguin" ? "Invalid value" : null)}
              validationBehavior="aria"
            />
          </form>,
        );

        const input = getByRole("combobox") as HTMLInputElement;

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid value",
        );
        expect(input.validity.valid).toBe(true);

        await user.tab();
        await user.click();
        // open the select dropdown
        await user.keyboard("{ArrowDown}");

        const listbox = await findByRole("listbox");
        const item = within(listbox).getByRole("option", {name: "Zebra"});

        await user.click(item);

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input).not.toHaveAttribute("aria-invalid");
      });

      it("supports server validation", async () => {
        const {getByTestId, getByRole} = render(
          <Form validationBehavior="aria" validationErrors={{value: "Invalid value"}}>
            <AutocompleteExample data-testid="input" name="value" />
          </Form>,
        );

        const input = getByTestId("input");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid value",
        );

        await user.tab();
        await user.keyboard("[ArrowRight]Ze");

        act(() => {
          jest.runAllTimers();
        });

        const listbox = getByRole("listbox");
        const items = within(listbox).getAllByRole("option");

        await user.click(items[0]);
        act(() => {
          jest.runAllTimers();
        });

        await user.tab();
        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input).not.toHaveAttribute("aria-invalid");
      });
    });
  });
});

describe("Autocomplete with React Hook Form", () => {
  let autocomplete1: HTMLInputElement;
  let autocomplete2: HTMLInputElement;
  let autocomplete3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let wrapper: any;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: "cat",
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

    wrapper = render(
      <form className="flex w-full max-w-xs flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          data-testid="autocomplete-1"
          {...register("withDefaultValue")}
          aria-label="Favorite Animal"
          items={itemsData}
          label="Favorite Animal"
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Autocomplete
          data-testid="autocomplete-2"
          {...register("withoutDefaultValue")}
          aria-label="Favorite Animal"
          items={itemsData}
          label="Favorite Animal"
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Autocomplete
          data-testid="autocomplete-3"
          {...register("requiredField", {required: true})}
          aria-label="Favorite Animal"
          items={itemsData}
          label="Favorite Animal"
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button data-testid="submit-button" type="submit">
          Submit
        </button>
      </form>,
    );

    autocomplete1 = wrapper.getByTestId("autocomplete-1");
    autocomplete2 = wrapper.getByTestId("autocomplete-2");
    autocomplete3 = wrapper.getByTestId("autocomplete-3");
    submitButton = wrapper.getByTestId("submit-button");
  });

  it("should work with defaultValues", () => {
    expect(autocomplete1).toHaveValue("Cat");
    expect(autocomplete2).toHaveValue("");
    expect(autocomplete3).toHaveValue("");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    const user = userEvent.setup();

    await user.click(autocomplete3);

    expect(autocomplete3).toHaveAttribute("aria-expanded", "true");

    let listboxItems = wrapper.getAllByRole("option");

    await user.click(listboxItems[1]);

    expect(autocomplete3).toHaveValue("Dog");

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
