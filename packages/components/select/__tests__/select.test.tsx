import type {SelectProps} from "../src";

import "@testing-library/jest-dom";
import * as React from "react";
import {render, renderHook, waitFor, act} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";
import {useForm} from "react-hook-form";
import {Form} from "@heroui/form";

import {Select, SelectItem, SelectSection} from "../src";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "../../modal/src";

type Item = {
  label: string;
  id: string;
};

const itemsData: Item[] = [
  {label: "Cat", id: "cat"},
  {label: "Dog", id: "dog"},
  {label: "Elephant", id: "elephant"},
  {label: "Lion", id: "lion"},
  {label: "Tiger", id: "tiger"},
  {label: "Giraffe", id: "giraffe"},
  {label: "Dolphin", id: "dolphin"},
  {label: "Penguin", id: "penguin"},
  {label: "Zebra", id: "zebra"},
  {label: "Shark", id: "shark"},
  {label: "Whale", id: "whale"},
  {label: "Otter", id: "otter"},
  {label: "Crocodile", id: "crocodile"},
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

describe("Select", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Select disableAnimation aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLSelectElement>();

    render(
      <Select ref={ref} disableAnimation aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly (dynamic)", () => {
    const wrapper = render(
      <Select
        disableAnimation
        aria-label="Favorite Animal"
        items={itemsData}
        label="Favorite Animal"
      >
        {(item) => <SelectItem key={item.id}>{item.label}</SelectItem>}
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Select disableAnimation aria-label="Favorite Animal" label="Favorite Animal">
        <SelectSection title="Birds">
          <SelectItem key="penguin">Penguin</SelectItem>
        </SelectSection>
        <SelectSection title="Mammals">
          <SelectItem key="zebra">Zebra</SelectItem>
          <SelectItem key="shark">Shark</SelectItem>
        </SelectSection>
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const wrapper = render(
      <Select
        disableAnimation
        aria-label="Favorite Animal"
        items={itemsSectionData}
        label="Favorite Animal"
      >
        {(section) => (
          <SelectSection<(typeof itemsSectionData)[0]["children"][0]>
            aria-label={section.title}
            items={section.children}
            title={section.title}
          >
            {/* @ts-ignore TODO: fix section children types*/}
            {(item: Item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </SelectSection>
        )}
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with single selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        disableAnimation
        disallowEmptySelection
        isOpen
        aria-label="Favorite Animal"
        label="Favorite Animal"
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(3);

    await user.click(listboxItems[1]);

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
  });

  it("should work with multiple selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        disableAnimation
        disallowEmptySelection
        isOpen
        aria-label="Favorite Animal"
        label="Favorite Animal"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(3);

    await act(async () => {
      await user.click(listboxItems[1]);
      await user.click(listboxItems[2]);
    });

    expect(onSelectionChange).toHaveBeenCalledTimes(2);
  });

  it("should work with dynamic placeholder and renderValue", async () => {
    const SelectWrapper = (props: {
      placeholder?: SelectProps["placeholder"];
      renderValue?: SelectProps["renderValue"];
    }) => {
      const {placeholder, renderValue} = props;

      return (
        <Select
          disableAnimation
          aria-label="Favorite Animal"
          data-testid="render-selected-item-test"
          label="Favorite Animal"
          placeholder={placeholder}
          renderValue={renderValue}
        >
          <SelectItem key="penguin">Penguin</SelectItem>
          <SelectItem key="zebra">Zebra</SelectItem>
          <SelectItem key="shark">Shark</SelectItem>
        </Select>
      );
    };

    const wrapper = render(<SelectWrapper placeholder="Select an animal" />);

    expect(wrapper.getByText("Select an animal")).toBeInTheDocument();

    wrapper.rerender(<SelectWrapper placeholder="Select an favorite animal" />);

    expect(wrapper.getByText("Select an favorite animal")).toBeInTheDocument();

    const select = wrapper.getByTestId("render-selected-item-test");

    await act(async () => {
      await user.click(select);
    });

    const listboxItems = wrapper.getAllByRole("option");

    await act(async () => {
      await user.click(listboxItems[0]);
    });

    expect(select).toHaveTextContent("Penguin");
    expect(wrapper.queryByText("Select an favorite animal")).toBe(null);

    wrapper.rerender(
      <SelectWrapper
        placeholder="Select an favorite animal"
        renderValue={(item) => `next ${item[0].textValue}`}
      />,
    );

    expect(wrapper.getByText("next Penguin")).toBeInTheDocument();
    expect(wrapper.queryByText("Select an favorite animal")).toBe(null);
  });

  it("should close dropdown when clicking outside select", async () => {
    const wrapper = render(
      <Select
        disableAnimation
        aria-label="Favorite Animal"
        data-testid="close-when-clicking-outside-test"
        label="Favorite Animal"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    const select = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select dropdown
    await user.click(select);

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // click outside the select component
    await user.click(document.body);

    // assert that the select is closed
    expect(select).toHaveAttribute("aria-expanded", "false");
  });

  it("should close dropdown when clicking outside select with modal open", async () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
            <Select
              disableAnimation
              aria-label="Favorite Animal"
              data-testid="close-when-clicking-outside-test"
              label="Favorite Animal"
            >
              <SelectItem key="penguin">Penguin</SelectItem>
              <SelectItem key="zebra">Zebra</SelectItem>
              <SelectItem key="shark">Shark</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const select = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select dropdown
    await user.click(select);

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // click outside the select component
    await user.click(document.body);

    // assert that the select is closed
    expect(select).toHaveAttribute("aria-expanded", "false");
  });

  it("disabled select shouldn't update by keyboard", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        disableAnimation
        isDisabled
        aria-label="Favorite Animal"
        data-testid="test-select"
        label="Favorite Animal"
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );
    const select = wrapper.getByTestId("test-select");

    await user.click(document.body);
    await user.tab();
    await user.type(select, "z", {skipClick: true});

    expect(onSelectionChange).toHaveBeenCalledTimes(0);
  });

  it("should pre-select items based on defaultSelectedKeys (numeric keys)", () => {
    const items = [
      {key: 1, value: "Penguin"},
      {key: 2, value: "Zebra"},
      {key: 3, value: "Shark"},
    ];

    const wrapper = render(
      <Select
        disableAnimation
        isOpen
        defaultSelectedKeys={[1, 2]} // Numeric keys for selection
        items={items}
        label="Test Default Selected Keys"
        selectionMode="multiple"
      >
        {(item) => <SelectItem>{item.value}</SelectItem>}
      </Select>,
    );

    const selectedOptions = wrapper.getAllByRole("option", {selected: true});

    expect(selectedOptions.length).toBe(2);
    expect(selectedOptions.map((opt) => opt.textContent)).toEqual(["Penguin", "Zebra"]);
  });

  it("should pre-select items based on defaultSelectedKeys (numeric ids)", () => {
    const items = [
      {id: 1, value: "Penguin"},
      {id: 2, value: "Zebra"},
      {id: 3, value: "Shark"},
    ];

    const wrapper = render(
      <Select
        disableAnimation
        isOpen
        defaultSelectedKeys={[1, 2]} // Numeric ids for selection
        items={items}
        label="Test Default Selected IDs"
        selectionMode="multiple"
      >
        {(item) => <SelectItem>{item.value}</SelectItem>}
      </Select>,
    );

    const selectedOptions = wrapper.getAllByRole("option", {selected: true});

    expect(selectedOptions.length).toBe(2);
    expect(selectedOptions.map((opt) => opt.textContent)).toEqual(["Penguin", "Zebra"]);
  });

  it("onSelectionChange should be called with a Set of item ids upon selection", async () => {
    const itemsWithId = [
      {id: 1, value: "penguin"},
      {id: 2, value: "zebra"},
      {id: 3, value: "shark"},
    ];

    const onSelectionChangeId = jest.fn();
    const wrapperWithId = render(
      <Select
        disableAnimation
        isOpen
        items={itemsWithId}
        label="Test with ID"
        onSelectionChange={onSelectionChangeId}
      >
        {(item) => <SelectItem>{item.value}</SelectItem>}
      </Select>,
    );

    const listbox = wrapperWithId.getByRole("listbox");

    expect(listbox).toBeInTheDocument();

    // Select item and check the correct ID is passed to the callback
    await user.click(wrapperWithId.getByRole("option", {name: itemsWithId[0].value}));

    expect(onSelectionChangeId).toHaveBeenCalled();
    let selectionArg = onSelectionChangeId.mock.calls[0][0];

    expect([...selectionArg]).toEqual([itemsWithId[0].id]);

    await user.click(wrapperWithId.getByRole("option", {name: itemsWithId[1].value}));

    expect(onSelectionChangeId).toHaveBeenCalledTimes(2);
    selectionArg = onSelectionChangeId.mock.calls[1][0];
    expect([...selectionArg]).toEqual([itemsWithId[1].id]);
  });

  it("onSelectionChange should be called with a Set of item keys upon selection", async () => {
    const itemsWithKey = [
      {key: 1, value: "penguin"},
      {key: 2, value: "zebra"},
      {key: 3, value: "shark"},
    ];

    const onSelectionChangeKey = jest.fn();
    const wrapperWithKey = render(
      <Select
        disableAnimation
        isOpen
        items={itemsWithKey}
        label="Test with Key"
        onSelectionChange={onSelectionChangeKey}
      >
        {(item) => <SelectItem>{item.value}</SelectItem>}
      </Select>,
    );

    const listbox = wrapperWithKey.getByRole("listbox");

    expect(listbox).toBeInTheDocument();

    // Select item and check the correct key is passed to the callback
    await user.click(wrapperWithKey.getByRole("option", {name: itemsWithKey[0].value}));

    expect(onSelectionChangeKey).toHaveBeenCalled();
    let selectionArg = onSelectionChangeKey.mock.calls[0][0];

    expect([...selectionArg]).toEqual([itemsWithKey[0].key]);

    await user.click(wrapperWithKey.getByRole("option", {name: itemsWithKey[1].value}));

    expect(onSelectionChangeKey).toHaveBeenCalledTimes(2);
    selectionArg = onSelectionChangeKey.mock.calls[1][0];
    expect([...selectionArg]).toEqual([itemsWithKey[1].key]);
  });

  it("should display selected items as comma-separated string inside the select", async () => {
    const wrapper = render(
      <Select
        disableAnimation
        isDisabled
        aria-label="Favorite Animal"
        data-testid="test-select"
        selectedKeys={["penguin", "zebra"]}
        selectionMode="multiple"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );
    const select = wrapper.getByTestId("test-select");
    const displayedText = select?.textContent?.trim();

    expect(displayedText).toBe("Penguin, Zebra");
  });

  it("should close listbox by clicking another select", async () => {
    const wrapper = render(
      <>
        <Select
          disableAnimation
          aria-label="Favorite Animal"
          data-testid="select"
          label="Favorite Animal"
        >
          <SelectItem key="penguin">Penguin</SelectItem>
          <SelectItem key="zebra">Zebra</SelectItem>
          <SelectItem key="shark">Shark</SelectItem>
        </Select>
        <Select
          disableAnimation
          aria-label="Favorite Animal"
          data-testid="select2"
          label="Favorite Animal"
        >
          <SelectItem key="penguin">Penguin</SelectItem>
          <SelectItem key="zebra">Zebra</SelectItem>
          <SelectItem key="shark">Shark</SelectItem>
        </Select>
      </>,
    );

    const select = wrapper.getByTestId("select");

    const select2 = wrapper.getByTestId("select2");

    expect(select).not.toBeNull();

    expect(select2).not.toBeNull();

    // open the select listbox by clicking selector button in the first select
    await user.click(select);

    // assert that the first select listbox is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // assert that the second select listbox is close
    expect(select2).toHaveAttribute("aria-expanded", "false");

    // close the select listbox by clicking the second select
    await user.click(select2);

    // assert that the first select listbox is closed
    expect(select).toHaveAttribute("aria-expanded", "false");

    // assert that the second select listbox is open
    expect(select2).toHaveAttribute("aria-expanded", "true");
  });

  it("should display placeholder text when unselected", async () => {
    const wrapper = render(
      <Select
        disableAnimation
        aria-label="Favorite Animal"
        data-testid="test-select"
        label="Favorite Animal"
        placeholder="Select an animal"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    const select = wrapper.getByTestId("test-select");

    expect(select).toHaveTextContent("Select an animal");
  });

  it("should display placeholder text when unselected (controlled)", async () => {
    const onSelectionChange = jest.fn();
    const wrapper = render(
      <Select
        disableAnimation
        isOpen
        aria-label="Favorite Animal"
        data-testid="test-select"
        placeholder="Select an animal"
        selectedKeys={[]}
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    const select = wrapper.getByTestId("test-select");

    expect(select).toHaveTextContent("Select an animal");
  });

  it("should unset form value", async () => {
    const logSpy = jest.spyOn(console, "log");

    const wrapper = render(
      <form
        className="w-full max-w-xs items-end flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);

          /* eslint-disable no-console */
          // @ts-ignore
          console.log(JSON.stringify(Object.fromEntries(formData)));
        }}
      >
        <Select
          disableAnimation
          data-testid="select"
          defaultSelectedKeys={["foo"]}
          label="test select"
          name="select"
        >
          <SelectItem key="foo">foo</SelectItem>
          <SelectItem key="bar">bar</SelectItem>
        </Select>
        <button data-testid="submit-button" type="submit">
          Submit
        </button>
      </form>,
    );

    const submitButton = wrapper.getByTestId("submit-button");

    await user.click(submitButton);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({select: "foo"}));

    const select = wrapper.getByTestId("select");

    expect(select).not.toBeNull();

    await user.click(select);
    const listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    const listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(2);

    await user.click(listboxItems[0]);
    await user.click(submitButton);

    expect(logSpy).toHaveBeenCalledWith(JSON.stringify({select: ""}));
  });

  it("should close listbox by clicking selector button again", async () => {
    const wrapper = render(
      <Select
        disableAnimation
        aria-label="Favorite Animal"
        data-testid="select"
        label="Favorite Animal"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    const select = await wrapper.findByTestId("select");

    expect(select).not.toBeNull();

    // open the select listbox by clicking selector button
    await user.click(select);

    // assert that the select listbox is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // open the select listbox by clicking selector button
    await user.click(select);

    // assert that the select listbox is closed
    expect(select).toHaveAttribute("aria-expanded", "false");
  });

  it("should work with onChange (< 300 select items)", async () => {
    const onChange = jest.fn();

    let options = new Array(10).fill("");

    options = options.map((_, i) => {
      return `option ${i}`;
    });

    const wrapper = render(
      <Select
        disableAnimation
        isOpen
        aria-label="Favorite Animal"
        isVirtualized={false}
        label="Favorite Animal"
        onChange={onChange}
      >
        {options.map((o) => (
          <SelectItem key={o}>{o}</SelectItem>
        ))}
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(10);

    await user.click(listboxItems[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should work with onChange (>= 300 select items)", async () => {
    let onChange = jest.fn();

    let options = new Array(300).fill("");

    options = options.map((_, i) => {
      return `option ${i}`;
    });

    const wrapper = render(
      <Select
        disableAnimation
        isOpen
        aria-label="Favorite Animal"
        isVirtualized={false}
        label="Favorite Animal"
        onChange={onChange}
      >
        {options.map((o) => (
          <SelectItem key={o}>{o}</SelectItem>
        ))}
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(300);

    await user.click(listboxItems[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should place the label outside when labelPlacement is outside and isMultiline enabled", () => {
    const labelContent = "Favorite Animal Label";

    render(
      <Select
        disableAnimation
        isMultiline
        aria-label="Favorite Animal"
        data-testid="select"
        label={labelContent}
        labelPlacement="outside"
        placeholder="placeholder"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    const base = document.querySelector("[data-slot=base]");
    const trigger = document.querySelector("[data-slot=trigger]");

    expect(base).toHaveTextContent(labelContent);
    expect(trigger).not.toHaveTextContent(labelContent);
  });

  it("should place the label inside when labelPlacement prop is not passed", () => {
    const labelContent = "Favorite Animal Label";

    render(
      <Select
        disableAnimation
        aria-label="Favorite Animal"
        data-testid="select"
        label={labelContent}
        placeholder="placeholder"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    const trigger = document.querySelector("[data-slot=trigger]");

    expect(trigger).toHaveTextContent(labelContent);
  });

  it("should support controlled isInvalid prop", async () => {
    function Test() {
      const [isInvalid, setInvalid] = React.useState(false);

      return (
        <>
          <Select
            disableAnimation
            data-testid="select"
            errorMessage="Invalid value"
            isInvalid={isInvalid}
            label="Test"
            name="select"
          >
            <SelectItem key="one">One</SelectItem>
            <SelectItem key="two">Two</SelectItem>
            <SelectItem key="three">Three</SelectItem>
          </Select>
          <button data-testid="button" onClick={() => setInvalid((isInvalid) => !isInvalid)}>
            Click Me
          </button>
        </>
      );
    }

    const {getByTestId} = render(<Test />);
    const select = getByTestId("select");

    expect(select).not.toHaveAttribute("aria-describedby");

    await user.click(getByTestId("button"));

    expect(select).toHaveAttribute("aria-describedby");
    expect(document.getElementById(select.getAttribute("aria-describedby")!)).toHaveTextContent(
      "Invalid value",
    );
  });

  it("should not open dropdown when hideEmptyContent is true", async () => {
    const wrapper = render(
      <Select
        disableAnimation
        hideEmptyContent
        aria-label="Favorite Animal"
        data-testid="hide-empty-content-true-test"
        label="Favorite Animal"
      >
        {[]}
      </Select>,
    );

    const select = wrapper.getByTestId("hide-empty-content-true-test");

    // open the select dropdown
    await user.click(select);

    // assert that the select is not open
    expect(select).not.toHaveAttribute("aria-expanded", "true");
    // assert that the listbox is not rendered
    expect(wrapper.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should open dropdown when hideEmptyContent is false", async () => {
    const wrapper = render(
      <Select
        disableAnimation
        aria-label="Favorite Animal"
        data-testid="hide-empty-content-false-test"
        hideEmptyContent={false}
        label="Favorite Animal"
      >
        {[]}
      </Select>,
    );

    const select = wrapper.getByTestId("hide-empty-content-false-test");

    // open the select dropdown
    await user.click(select);

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    const listbox = wrapper.getByRole("listbox");

    // assert that the listbox is rendered
    expect(listbox).toBeInTheDocument();
    // assert that the listbox items are not rendered
    expect(wrapper.queryByRole("option")).not.toBeInTheDocument();
  });
});

describe("Select virtualization tests", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: jest.fn(),
    });
  });

  it("should work with onChange (< virtualization threshold items)", async () => {
    const onChange = jest.fn();

    let options = Array.from({length: 10}, (_, i) => `option ${i}`);

    const wrapper = render(
      <div style={{height: "200px", overflow: "auto"}}>
        <Select
          disableAnimation
          isOpen
          aria-label="Favorite Animal"
          label="Favorite Animal"
          onChange={onChange}
        >
          {options.map((o) => (
            <SelectItem key={o}>{o}</SelectItem>
          ))}
        </Select>
      </div>,
    );

    const listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    const listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(10);

    await user.click(listboxItems[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should work with onChange (at virtualization threshold items)", async () => {
    const onChange = jest.fn();

    let options = Array.from({length: 50}, (_, i) => `option ${i}`);

    const wrapper = render(
      <div style={{height: "200px", overflow: "auto"}}>
        <Select
          disableAnimation
          isOpen
          aria-label="Favorite Animal"
          label="Favorite Animal"
          onChange={onChange}
        >
          {options.map((o) => (
            <SelectItem key={o}>{o}</SelectItem>
          ))}
        </Select>
      </div>,
    );

    const listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    const listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(50);

    await user.click(listboxItems[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should work with onChange (> virtualization threshold items)", async () => {
    const onChange = jest.fn();

    let options = Array.from({length: 100}, (_, i) => `option ${i}`);

    /* Mock dimensions */
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {configurable: true, value: 200});
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {configurable: true, value: 2000});
    Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        top: 0,
        bottom: 200,
        height: 200,
        left: 0,
        right: 100,
        width: 100,
      }),
    });

    const wrapper = render(
      <div style={{height: "200px", overflow: "auto"}}>
        <Select
          disableAnimation
          isOpen
          isVirtualized
          aria-label="Favorite Animal"
          itemHeight={20}
          label="Favorite Animal"
          maxListboxHeight={200}
          onChange={onChange}
        >
          {options.map((o) => (
            <SelectItem key={o}>{o}</SelectItem>
          ))}
        </Select>
      </div>,
    );

    const listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    /* Scroll to ensure visibility of the target item */
    const scrollableContainer = wrapper.container.querySelector("div");

    act(() => {
      scrollableContainer?.scrollTo({top: 60});
    });

    await waitFor(() => {
      const visibleItems = wrapper.getAllByRole("option");

      expect(visibleItems.length).toBeGreaterThan(0);
      /* Virtualized list will have listitems less than 100 */
      expect(visibleItems.length).toBeLessThan(100);
    });

    const visibleItems = wrapper.getAllByRole("option");

    await user.click(visibleItems[3]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should work with onChange (large number of items)", async () => {
    const onChange = jest.fn();

    let options = Array.from({length: 300}, (_, i) => `option ${i}`);

    /* Mock dimensions */
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {configurable: true, value: 200});
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {configurable: true, value: 6000});

    const wrapper = render(
      <div style={{height: "200px", overflow: "auto"}}>
        <Select
          disableAnimation
          isOpen
          isVirtualized
          aria-label="Favorite Animal"
          itemHeight={20}
          label="Favorite Animal"
          maxListboxHeight={200}
          onChange={onChange}
        >
          {options.map((o) => (
            <SelectItem key={o}>{o}</SelectItem>
          ))}
        </Select>
      </div>,
    );

    const listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    /* Simulate scrolling to make the target item visible */
    const scrollableContainer = wrapper.container.querySelector("div");

    act(() => {
      scrollableContainer?.scrollTo({top: 1200});
    });

    await waitFor(() => {
      const visibleItems = wrapper.getAllByRole("option");

      expect(visibleItems.length).toBeGreaterThan(0);
      /* Virtualized list will have listitems less than 300 */
      expect(visibleItems.length).toBeLessThan(300);
    });

    const visibleItems = wrapper.getAllByRole("option");

    await user.click(visibleItems[3]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe("Select with React Hook Form", () => {
  let select1: HTMLElement;
  let select2: HTMLElement;
  let select3: HTMLElement;
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
      register,
      formState: {errors},
      handleSubmit,
    } = result.current;

    onSubmit = jest.fn();

    wrapper = render(
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Select
          disableAnimation
          data-testid="select-1"
          items={itemsData}
          {...register("withDefaultValue")}
          aria-label="select-1"
        >
          {(item) => <SelectItem key={item.id}>{item.label}</SelectItem>}
        </Select>

        <Select
          disableAnimation
          data-testid="select-2"
          items={itemsData}
          {...register("withoutDefaultValue")}
          aria-label="select-2"
        >
          {(item) => <SelectItem key={item.id}>{item.label}</SelectItem>}
        </Select>

        <Select
          disableAnimation
          data-testid="select-3"
          items={itemsData}
          {...register("requiredField", {required: true})}
          aria-label="select-3"
        >
          {(item) => <SelectItem key={item.id}>{item.label}</SelectItem>}
        </Select>

        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button data-testid="submit-button" type="submit">
          Submit
        </button>
      </form>,
    );

    select1 = wrapper.getByTestId("select-1");
    select2 = wrapper.getByTestId("select-2");
    select3 = wrapper.getByTestId("select-3");
    submitButton = wrapper.getByTestId("submit-button");
  });

  it("should work with defaultValues", () => {
    expect(select1).toHaveTextContent("Cat");
    expect(select2).toHaveTextContent("");
    expect(select3).toHaveTextContent("");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    const user = userEvent.setup();

    await user.click(select3);

    expect(select3).toHaveAttribute("aria-expanded", "true");

    let listboxItems = wrapper.getAllByRole("option");

    await user.click(listboxItems[1]);

    expect(select3).toHaveTextContent("Dog");

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

describe("validation", () => {
  let user;

  beforeAll(() => {
    user = userEvent.setup();
  });

  describe("validationBehavior=aria", () => {
    it("supports validate function", async () => {
      const onSubmit = jest.fn((e) => e.preventDefault());

      const {getByTestId} = render(
        <Form data-testid="form" validationBehavior="aria" onSubmit={onSubmit}>
          <Select
            aria-label="Favorite Animal"
            data-testid="trigger"
            defaultSelectedKeys={["penguin"]}
            label="Favorite Animal"
            validate={(v) => (v.includes("penguin") ? "Invalid value" : null)}
          >
            <SelectItem key="penguin">Penguin</SelectItem>
            <SelectItem key="zebra">Zebra</SelectItem>
            <SelectItem key="shark">Shark</SelectItem>
          </Select>
          <button data-testid="submit-button" type="submit">
            Submit
          </button>
        </Form>,
      );

      const trigger = getByTestId("trigger") as HTMLButtonElement;
      const select = document.querySelector("select");
      const submit = getByTestId("submit-button");

      // aria validation is always valid
      expect(select?.validity.valid).toBe(true);
      // aria validation validates on initial render
      expect(trigger).toHaveAttribute("aria-describedby");
      expect(select).toHaveAttribute("aria-invalid", "true");
      expect(document.getElementById(trigger.getAttribute("aria-describedby")!)).toHaveTextContent(
        "Invalid value",
      );

      await user.click(trigger);

      let listboxItems = document.querySelectorAll("[role='option']");

      await user.click(listboxItems[1]); // zebra

      await user.click(submit);

      expect(select?.validity.valid).toBe(true);
      expect(trigger).not.toHaveAttribute("aria-describedby");
      expect(select).not.toHaveAttribute("aria-invalid");
    });

    it("supports server validation", async () => {
      function FormRender() {
        const [serverErrors, setServerErrors] = React.useState({animal: "initial error"});

        const onSubmit = (e) => {
          e.preventDefault();

          setServerErrors({
            animal: "new error",
          });
        };

        return (
          <Form
            data-testid="form"
            validationBehavior="aria"
            validationErrors={serverErrors}
            onSubmit={onSubmit}
          >
            <Select
              aria-label="Favorite Animal"
              data-testid="trigger"
              label="Favorite Animal"
              name="animal"
            >
              <SelectItem key="penguin">Penguin</SelectItem>
              <SelectItem key="zebra">Zebra</SelectItem>
              <SelectItem key="shark">Shark</SelectItem>
            </Select>
            <button data-testid="submit-button" type="submit">
              Submit
            </button>
          </Form>
        );
      }

      const {getByTestId} = render(<FormRender />);

      const trigger = getByTestId("trigger") as HTMLButtonElement;
      const select = document.querySelector("select");
      const submit = getByTestId("submit-button");

      // aria validation is always valid
      expect(select?.validity.valid).toBe(true);
      expect(trigger).toHaveAttribute("aria-describedby");
      expect(select).toHaveAttribute("aria-invalid", "true");
      expect(document.getElementById(trigger.getAttribute("aria-describedby")!)).toHaveTextContent(
        "initial error",
      );

      await user.click(trigger);

      let listboxItems = document.querySelectorAll("[role='option']");

      await user.click(listboxItems[1]); // zebra

      expect(select?.validity.valid).toBe(true);
      expect(trigger).not.toHaveAttribute("aria-describedby");
      expect(select).not.toHaveAttribute("aria-invalid");

      await user.click(submit);

      expect(select?.validity.valid).toBe(true);
      expect(trigger).toHaveAttribute("aria-describedby");
      expect(select).toHaveAttribute("aria-invalid");
      expect(document.getElementById(trigger.getAttribute("aria-describedby")!)).toHaveTextContent(
        "new error",
      );
    });
  });

  describe("validationBehavior=native", () => {
    it("supports isRequired", async () => {
      function FormRender() {
        const onSubmit = jest.fn((e) => e.preventDefault());

        return (
          <Form data-testid="form" validationBehavior="native" onSubmit={onSubmit}>
            <Select
              disableAnimation
              isRequired
              aria-label="Favorite Animal"
              data-testid="trigger"
              label="Favorite Animal"
              name="animal"
            >
              <SelectItem key="cat">Cat</SelectItem>
              <SelectItem key="dog">Dog</SelectItem>
              <SelectItem key="penguin">Penguin</SelectItem>
              <SelectItem key="zebra">Zebra</SelectItem>
              <SelectItem key="shark">Shark</SelectItem>
            </Select>
            <button data-testid="submit-button" type="submit">
              Submit
            </button>
          </Form>
        );
      }

      const {getByTestId} = render(<FormRender />);

      const trigger = getByTestId("trigger") as HTMLButtonElement;
      const select = document.querySelector("select");
      const submit = getByTestId("submit-button");

      expect(select?.validity.valid).toBe(false);
      expect(select?.validity.valueMissing).toBe(true);
      // native validation does not validate until submit
      expect(select).toHaveAttribute("required");
      expect(trigger).not.toHaveAttribute("aria-describedby");

      await user.click(submit);

      expect(select?.validity.valid).toBe(false);
      expect(select?.validity.valueMissing).toBe(true);
      expect(trigger).toHaveAttribute("aria-describedby");

      await user.click(trigger);

      let listboxItems = document.querySelectorAll("[role='option']");

      await user.click(listboxItems[0]);

      await user.click(submit);

      expect(select?.validity.valid).toBe(true);
      expect(trigger).not.toHaveAttribute("aria-describedby");
    });

    it("supports validate function", async () => {
      const onSubmit = jest.fn((e) => e.preventDefault());

      const {getByTestId} = render(
        <Form data-testid="form" validationBehavior="native" onSubmit={onSubmit}>
          <Select
            disableAnimation
            aria-label="Favorite Animal"
            data-testid="trigger"
            defaultSelectedKeys={["penguin"]}
            label="Favorite Animal"
            validate={(v) => (v.includes("penguin") ? "Invalid value" : null)}
          >
            <SelectItem key="penguin">Penguin</SelectItem>
            <SelectItem key="zebra">Zebra</SelectItem>
            <SelectItem key="shark">Shark</SelectItem>
          </Select>
          <button data-testid="submit-button" type="submit">
            Submit
          </button>
        </Form>,
      );

      const trigger = getByTestId("trigger") as HTMLButtonElement;
      const select = document.querySelector("select");
      const submit = getByTestId("submit-button");

      expect(select?.validity.valid).toBe(false);
      expect(select?.validity.customError).toBe(true);
      // native validation does not validate until submit
      expect(trigger).not.toHaveAttribute("aria-describedby");
      expect(select).not.toHaveAttribute("aria-invalid", "true");

      await user.click(submit);

      expect(select?.validity.valid).toBe(false);
      expect(select?.validity.customError).toBe(true);
      expect(trigger).toHaveAttribute("aria-describedby");
      expect(select).toHaveAttribute("aria-invalid", "true");
      expect(document.getElementById(trigger.getAttribute("aria-describedby")!)).toHaveTextContent(
        "Invalid value",
      );

      await user.click(trigger);

      let listboxItems = document.querySelectorAll("[role='option']");

      await user.click(listboxItems[1]); // zebra

      await user.click(submit);

      expect(select?.validity.valid).toBe(true);
      expect(trigger).not.toHaveAttribute("aria-describedby");
      expect(select).not.toHaveAttribute("aria-invalid");
    });

    it("supports server validation", async () => {
      function FormRender() {
        const [serverErrors, setServerErrors] = React.useState({animal: "initial error"});

        const onSubmit = (e) => {
          e.preventDefault();

          setServerErrors({
            animal: "new error",
          });
        };

        return (
          <Form
            data-testid="form"
            validationBehavior="native"
            validationErrors={serverErrors}
            onSubmit={onSubmit}
          >
            <Select
              aria-label="Favorite Animal"
              data-testid="trigger"
              label="Favorite Animal"
              name="animal"
            >
              <SelectItem key="penguin">Penguin</SelectItem>
              <SelectItem key="zebra">Zebra</SelectItem>
              <SelectItem key="shark">Shark</SelectItem>
            </Select>
            <button data-testid="submit-button" type="submit">
              Submit
            </button>
          </Form>
        );
      }

      const {getByTestId} = render(<FormRender />);

      const trigger = getByTestId("trigger") as HTMLButtonElement;
      const select = document.querySelector("select");
      const submit = getByTestId("submit-button");

      expect(select?.validity.valid).toBe(false);
      expect(select?.validity.customError).toBe(true);
      expect(trigger).toHaveAttribute("aria-describedby");
      expect(select).toHaveAttribute("aria-invalid", "true");
      expect(document.getElementById(trigger.getAttribute("aria-describedby")!)).toHaveTextContent(
        "initial error",
      );

      await user.click(trigger);

      let listboxItems = document.querySelectorAll("[role='option']");

      await user.click(listboxItems[1]); // zebra

      expect(select?.validity.valid).toBe(true);
      expect(trigger).not.toHaveAttribute("aria-describedby");
      expect(select).not.toHaveAttribute("aria-invalid");

      await user.click(submit);

      expect(select?.validity.valid).toBe(false);
      expect(select?.validity.customError).toBe(true);
      expect(trigger).toHaveAttribute("aria-describedby");
      expect(select).toHaveAttribute("aria-invalid");
      expect(document.getElementById(trigger.getAttribute("aria-describedby")!)).toHaveTextContent(
        "new error",
      );
    });
  });
});
