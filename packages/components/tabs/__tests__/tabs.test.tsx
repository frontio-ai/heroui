import * as React from "react";
import {act, render, fireEvent, within} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {focus} from "@heroui/test-utils";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Tabs, Tab, TabsProps} from "../src";

type Item = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

let defaultItems: Item[] = [
  {
    id: "item1",
    label: "Item1 ",
    content: "Content 1",
  },
  {
    id: "item2",
    label: "Item 2",
    content: "Content 2",
  },
  {
    id: "item3",
    label: "Item 3",
    content: "Content 3",
  },
];

function getPlacementTemplate(position: TabsProps["placement"]) {
  return (
    <Tabs aria-label="Tabs static test" data-testid="tabWrapper" placement={position}>
      <Tab key="item1" title="Item 1">
        <div>Content 1</div>
      </Tab>
      <Tab key="item2" title="Item 2">
        <div>Content 2</div>
      </Tab>
      <Tab key="item3" title="Item 3">
        <div>Content 3</div>
      </Tab>
    </Tabs>
  );
}

describe("Tabs", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly (static)", () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    expect(() => wrapper.unmount()).not.toThrow();

    if (!shouldIgnoreReactWarning(spy)) {
      expect(spy).toHaveBeenCalledTimes(0);
    }
  });

  it("should render correctly (dynamic)", () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" items={defaultItems}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <div>{item.content}</div>
          </Tab>
        )}
      </Tabs>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("renders property", () => {
    const wrapper = render(
      <Tabs aria-label="Tabs property test">
        {defaultItems.map((item) => (
          <Tab key={item.id} title={item.label}>
            <div>{item.content}</div>
          </Tab>
        ))}
      </Tabs>,
    );
    const tablist = wrapper.getByRole("tablist");

    expect(tablist).toBeTruthy();
    const tabs = within(tablist).getAllByRole("tab");

    expect(tabs.length).toBe(3);

    for (let tab of tabs) {
      expect(tab).toHaveAttribute("tabindex");
      expect(tab).toHaveAttribute("aria-selected");
      const isSelected = tab.getAttribute("aria-selected") === "true";

      if (isSelected) {
        expect(tab).toHaveAttribute("aria-controls");
        const tabpanel = document.getElementById(tab.getAttribute("aria-controls")!);

        expect(tabpanel).toBeTruthy();
        expect(tabpanel).toHaveAttribute("aria-labelledby", tab.id);
        expect(tabpanel).toHaveAttribute("role", "tabpanel");
        expect(tabpanel).toHaveTextContent(defaultItems[0]?.content as string);
      }
    }
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Tabs ref={ref} aria-label="Tabs static test">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );
    expect(ref.current).not.toBeNull();
  });

  test("should select the correct tab with keyboard navigation", async () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab1 = wrapper.getByRole("tab", {name: "Item 1"});
    const tab2 = wrapper.getByRole("tab", {name: "Item 2"});
    const tab3 = wrapper.getByRole("tab", {name: "Item 3"});

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");

    act(() => {
      focus(tab1);
    });

    await user.keyboard("[ArrowRight]");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("aria-selected", "false");

    await user.keyboard("[ArrowRight]");
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "true");

    await user.keyboard("[ArrowRight]");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
  });

  test("should focus the correct tab with manual keyboard navigation", async () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" keyboardActivation="manual">
        <Tab key="item1" data-testid="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" data-testid="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" data-testid="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab1 = wrapper.getByTestId("item1");
    const tab2 = wrapper.getByTestId("item2");
    const tab3 = wrapper.getByTestId("item3");

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");

    act(() => {
      focus(tab1);
    });

    await user.keyboard("[ArrowRight]");
    expect(tab2).toHaveFocus();

    await user.keyboard("[ArrowRight]");
    expect(tab3).toHaveFocus();

    await user.keyboard("[ArrowLeft]");
    expect(tab2).toHaveFocus();

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
  });

  it("it should work with defaultSelectedKey", () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" defaultSelectedKey="item2">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" data-testid="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab2 = wrapper.getByTestId("item2");

    expect(tab2).toHaveAttribute("aria-selected", "true");
  });

  it("should not select a tab when disabled", async () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" disabledKeys={["item2"]}>
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" data-testid="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab2 = wrapper.getByTestId("item2");

    await user.click(tab2);
    expect(tab2).toHaveAttribute("aria-selected", "false");
  });

  it("should change the position of the tabs", () => {
    const wrapper = render(getPlacementTemplate("top"));

    const tabWrapper = wrapper.getByTestId("tabWrapper").parentNode;

    expect(tabWrapper).toHaveAttribute("data-placement", "top");
    expect(tabWrapper).toHaveAttribute("data-vertical", "horizontal");

    // Test bottom position
    wrapper.rerender(getPlacementTemplate("bottom"));

    expect(tabWrapper).toHaveAttribute("data-placement", "bottom");
    expect(tabWrapper).toHaveAttribute("data-vertical", "horizontal");

    // Test start position
    wrapper.rerender(getPlacementTemplate("start"));

    expect(tabWrapper).toHaveAttribute("data-placement", "start");
    expect(tabWrapper).toHaveAttribute("data-vertical", "vertical");

    // Test end position
    wrapper.rerender(getPlacementTemplate("end"));

    expect(tabWrapper).toHaveAttribute("data-placement", "end");
    expect(tabWrapper).toHaveAttribute("data-vertical", "vertical");
  });

  it("should change the orientation of the tabs", () => {
    const wrapper = render(
      <Tabs isVertical aria-label="Tabs static test" data-testid="tabWrapper">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tabWrapper = wrapper.getByTestId("tabWrapper").parentNode;

    expect(tabWrapper).toHaveAttribute("data-placement", "start");
    expect(tabWrapper).toHaveAttribute("data-vertical", "vertical");

    // Test horizontal orientation
    wrapper.rerender(
      <Tabs aria-label="Tabs static test" data-testid="tabWrapper" isVertical={false}>
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    expect(tabWrapper).toHaveAttribute("data-placement", "top");
    expect(tabWrapper).toHaveAttribute("data-vertical", "horizontal");
  });

  test("should destory inactive tab panels", () => {
    const {container} = render(
      <Tabs aria-label="Tabs test (destroyInactiveTabPanel=true)">
        <Tab key="tab1" data-testid="item1" title="Tab 1">
          <input className="border-2" data-testid="input" id="firstTab" />
        </Tab>
        <Tab key="tab2" data-testid="item2" title="Tab 2">
          <p id="secondTab">second tab content</p>
        </Tab>
      </Tabs>,
    );

    expect(container.querySelectorAll("[data-slot='panel']")).toHaveLength(1);
  });

  test("should not destory inactive tab panels", async () => {
    const wrapper = render(
      <Tabs aria-label="Tabs test (destroyInactiveTabPanel=false)" destroyInactiveTabPanel={false}>
        <Tab key="tab1" data-testid="item1" title="Tab 1">
          <input className="border-2" data-testid="input" id="firstTab" />
        </Tab>
        <Tab key="tab2" data-testid="item2" title="Tab 2">
          <p id="secondTab">second tab content</p>
        </Tab>
      </Tabs>,
    );

    const {container} = wrapper;

    expect(container.querySelectorAll("[data-slot='panel']")).toHaveLength(2);

    const tab1 = wrapper.getByTestId("item1");
    const tab2 = wrapper.getByTestId("item2");
    const input = wrapper.getByTestId("input");

    fireEvent.change(input, {target: {value: "23"}});

    expect(input).toHaveValue("23");

    act(() => {
      focus(tab1);
    });

    await user.keyboard("[ArrowRight]");
    expect(tab2).toHaveFocus();

    await user.keyboard("[ArrowLeft]");
    expect(tab1).toHaveFocus();

    expect(input).toHaveValue("23");
  });

  test("should forward ref to the tab item", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <Tabs aria-label="Tabs static test">
        <Tab key="item1" tabRef={ref} title="Item 1">
          <div>Content 1</div>
        </Tab>
      </Tabs>,
    );
    expect(ref.current).not.toBeNull();
  });
});
