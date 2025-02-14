import * as React from "react";
import {act, render, fireEvent} from "@testing-library/react";
import {Button} from "@heroui/button";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {keyCodes, shouldIgnoreReactWarning, spy} from "@heroui/test-utils";
import {User} from "@heroui/user";
import {Image} from "@heroui/image";
import {Avatar} from "@heroui/avatar";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection} from "../src";

describe("Dropdown", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly (static)", () => {
    const wrapper = render(
      <Dropdown disableAnimation>
        <DropdownTrigger>
          <Button>Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" onAction={alert}>
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly (dynamic)", () => {
    const menuItems = [
      {key: "new", name: "New File"},
      {key: "copy", name: "Copy Link"},
      {key: "edit", name: "Edit File"},
      {key: "delete", name: "Delete File"},
    ];

    const wrapper = render(
      <Dropdown disableAnimation>
        <DropdownTrigger>
          <Button>Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" items={menuItems}>
          {(item: any) => <DropdownItem key={item.key}>{item.name}</DropdownItem>}
        </DropdownMenu>
      </Dropdown>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Dropdown disableAnimation>
        <DropdownTrigger>
          <Button>Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" onAction={alert}>
          <DropdownSection title="Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger Zone">
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" color="danger">
              Delete file
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const menuItems = [
      {
        title: "Actions",
        children: [
          {key: "new", name: "New File"},
          {key: "copy", name: "Copy Link"},
          {key: "edit", name: "Edit File"},
        ],
      },
      {
        title: "Danger Zone",
        children: [{key: "delete", name: "Delete File"}],
      },
    ];

    const wrapper = render(
      <Dropdown disableAnimation>
        <DropdownTrigger>
          <Button>Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" items={menuItems}>
          {(section: any) => (
            <DropdownSection
              aria-label={section.title}
              items={section.children}
              title={section.title}
            >
              {/* @ts-ignore */}
              {(item: any) => <DropdownItem key={item.key}>{item.name}</DropdownItem>}
            </DropdownSection>
          )}
        </DropdownMenu>
      </Dropdown>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should not throw any error when clicking button", async () => {
    const wrapper = render(
      <Dropdown disableAnimation>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" onAction={alert}>
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let triggerButton = wrapper.getByTestId("trigger-test");

    expect(triggerButton).toBeTruthy();

    await act(async () => {
      await user.click(triggerButton);
    });

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);

    let menu = wrapper.queryByRole("menu");

    expect(menu).toBeTruthy();
  });

  it("should work with single selection (controlled)", async () => {
    let onOpenChange = jest.fn();
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Dropdown onOpenChange={onOpenChange}>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Actions"
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let triggerButton = wrapper.getByTestId("trigger-test");

    expect(onOpenChange).toHaveBeenCalledTimes(0);

    await act(async () => {
      await user.click(triggerButton);
    });

    expect(onOpenChange).toHaveBeenCalledTimes(1);

    let menu = wrapper.getByRole("menu");

    expect(menu).toBeTruthy();

    // validates if the menu has the triggerButton id as aria-labelledby
    expect(menu.getAttribute("aria-labelledby")).toBe(triggerButton.id);

    let menuItems = wrapper.getAllByRole("menuitemradio");

    expect(menuItems.length).toBe(4);

    await act(async () => {
      await user.click(menuItems[1]);
    });

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalled();
  });

  it("should work with multiple selection (controlled)", async () => {
    let onOpenChange = jest.fn();
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Dropdown onOpenChange={onOpenChange}>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Actions"
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        >
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let triggerButton = wrapper.getByTestId("trigger-test");

    expect(onOpenChange).toHaveBeenCalledTimes(0);

    await act(async () => {
      await user.click(triggerButton);
    });

    expect(onOpenChange).toHaveBeenCalledTimes(1);

    let menu = wrapper.getByRole("menu");

    expect(menu).toBeTruthy();

    // validates if the menu has the triggerButton id as aria-labelledby
    expect(menu.getAttribute("aria-labelledby")).toBe(triggerButton.id);

    let menuItems = wrapper.getAllByRole("menuitemcheckbox");

    expect(menuItems.length).toBe(4);

    await act(async () => {
      await user.click(menuItems[0]);
    });

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalled();
  });

  it("should show checkmarks if selectionMode is single and has a selected item", () => {
    const wrapper = render(
      <Dropdown isOpen>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" selectedKeys={["new"]} selectionMode="single">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let menuItems = wrapper.getAllByRole("menuitemradio");

    expect(menuItems.length).toBe(4);

    expect(menuItems[0].getAttribute("aria-checked")).toBe("true");
    expect(menuItems[1].getAttribute("aria-checked")).toBe("false");
    expect(menuItems[2].getAttribute("aria-checked")).toBe("false");
    expect(menuItems[3].getAttribute("aria-checked")).toBe("false");

    let svg = menuItems[0].querySelector("svg");

    expect(svg).toBeTruthy();

    expect(svg?.getAttribute("data-selected")).toBe("true");
  });

  it("should show multiple checkmarks if selectionMode is multiple and has selected items", () => {
    const wrapper = render(
      <Dropdown isOpen>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" selectedKeys={["new", "copy"]} selectionMode="multiple">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let menuItems = wrapper.getAllByRole("menuitemcheckbox");

    expect(menuItems.length).toBe(4);

    expect(menuItems[0].getAttribute("aria-checked")).toBe("true");
    expect(menuItems[1].getAttribute("aria-checked")).toBe("true");
    expect(menuItems[2].getAttribute("aria-checked")).toBe("false");
    expect(menuItems[3].getAttribute("aria-checked")).toBe("false");

    let checkmark1 = menuItems[0].querySelector("svg");

    expect(checkmark1).toBeTruthy();

    expect(checkmark1?.getAttribute("data-selected")).toBe("true");

    let checkmark2 = menuItems[1].querySelector("svg");

    expect(checkmark2).toBeTruthy();

    expect(checkmark2?.getAttribute("data-selected")).toBe("true");
  });

  it("should not show checkmarks if selectionMode not defined", () => {
    const wrapper = render(
      <Dropdown isOpen>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions" selectedKeys={["new", "copy"]}>
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let menuItems = wrapper.getAllByRole("menuitem");

    expect(menuItems.length).toBe(4);

    expect(menuItems[0].getAttribute("aria-checked")).toBeFalsy();
    expect(menuItems[1].getAttribute("aria-checked")).toBeFalsy();
    expect(menuItems[2].getAttribute("aria-checked")).toBeFalsy();
    expect(menuItems[3].getAttribute("aria-checked")).toBeFalsy();

    let checkmark1 = menuItems[0].querySelector("svg");

    expect(checkmark1).toBeFalsy();
  });

  it("should not open on disabled button", async () => {
    const wrapper = render(
      <Dropdown disableAnimation>
        <DropdownTrigger>
          <Button isDisabled data-testid="trigger-test">
            Trigger
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let triggerButton = wrapper.getByTestId("trigger-test");

    expect(triggerButton).toBeTruthy();

    await act(async () => {
      await user.click(triggerButton);
    });

    let menu = wrapper.queryByRole("menu");

    expect(menu).toBeFalsy();
  });

  it("should not open on disabled dropdown", async () => {
    const wrapper = render(
      <Dropdown isDisabled>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let triggerButton = wrapper.getByTestId("trigger-test");

    expect(triggerButton).toBeTruthy();

    await act(async () => {
      await user.click(triggerButton);
    });

    let menu = wrapper.queryByRole("menu");

    expect(menu).toBeFalsy();
  });

  it("should not select on disabled item", async () => {
    const onSelectionChange = jest.fn();
    const wrapper = render(
      <Dropdown isOpen>
        <DropdownTrigger>
          <Button data-testid="trigger-test">Trigger</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Actions"
          disabledKeys={["copy"]}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    let menuItems = wrapper.getAllByRole("menuitemradio");

    expect(menuItems.length).toBe(4);

    await act(async () => {
      await user.click(menuItems[1]);
    });

    expect(onSelectionChange).toHaveBeenCalledTimes(0);
  });

  it("should render without error (custom trigger with isDisabled)", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const renderDropdownMenu = () => {
      return (
        <DropdownMenu aria-label="Actions" onAction={alert}>
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      );
    };

    // Non Hero UI Element in DropdownTrigger
    render(
      <Dropdown isDisabled>
        <DropdownTrigger>
          <div>Trigger</div>
        </DropdownTrigger>
        {renderDropdownMenu()}
      </Dropdown>,
    );

    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();

    // Hero UI Element in DropdownTrigger
    render(
      <Dropdown isDisabled>
        <DropdownTrigger>
          <User as="button" description="@tonyreichert" name="Tony Reichert" />
        </DropdownTrigger>
        {renderDropdownMenu()}
      </Dropdown>,
    );

    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();

    // HeroUI Element that supports isDisabled prop in DropdownTrigger
    render(
      <Dropdown isDisabled>
        <DropdownTrigger>
          <Avatar isDisabled name="Marcus" />
        </DropdownTrigger>
        {renderDropdownMenu()}
      </Dropdown>,
    );

    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();

    // HeroUI Element that doesn't support isDisabled prop in DropdownTrigger
    render(
      <Dropdown isDisabled>
        <DropdownTrigger>
          <Image
            alt="HeroUI hero Image"
            src="https://heroui.com/images/hero-card-complete.jpeg"
            width={300}
          />
        </DropdownTrigger>
        {renderDropdownMenu()}
      </Dropdown>,
    );

    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  it("should close listbox by clicking another dropdown", async () => {
    const wrapper = render(
      <>
        <Dropdown disableAnimation>
          <DropdownTrigger>
            <Button data-testid="dropdown">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown disableAnimation>
          <DropdownTrigger>
            <Button data-testid="dropdown2">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>,
    );

    const dropdown = wrapper.getByTestId("dropdown");
    const dropdown2 = wrapper.getByTestId("dropdown2");

    expect(dropdown).toBeVisible();
    expect(dropdown2).toBeVisible();

    // Wrap click events in act()
    await act(async () => {
      await user.click(dropdown);
    });

    expect(dropdown).toHaveAttribute("aria-expanded", "true");
    expect(dropdown2).toHaveAttribute("aria-expanded", "false");

    await act(async () => {
      await user.click(dropdown2);
    });

    expect(dropdown).toHaveAttribute("aria-expanded", "false");
    expect(dropdown2).toHaveAttribute("aria-expanded", "true");
  });

  describe("Keyboard interactions", () => {
    it("should focus on the first item on keyDown (Enter)", async () => {
      const wrapper = render(
        <Dropdown disableAnimation>
          <DropdownTrigger>
            <Button data-testid="trigger-test">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu disallowEmptySelection aria-label="Actions" selectionMode="single">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>,
      );

      let triggerButton = wrapper.getByTestId("trigger-test");

      act(() => {
        triggerButton.focus();
      });

      expect(triggerButton).toHaveFocus();

      fireEvent.keyDown(triggerButton, {key: "Enter", charCode: keyCodes.Enter});

      let menu = wrapper.queryByRole("menu");

      expect(menu).toBeTruthy();

      let menuItems = wrapper.getAllByRole("menuitemradio");

      expect(menuItems.length).toBe(4);

      expect(menuItems[0]).toHaveFocus();
    });

    it("should focus on the first item on keyDown (Space)", async () => {
      const wrapper = render(
        <Dropdown disableAnimation>
          <DropdownTrigger>
            <Button data-testid="trigger-test">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu disallowEmptySelection aria-label="Actions" selectionMode="single">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>,
      );

      let triggerButton = wrapper.getByTestId("trigger-test");

      act(() => {
        triggerButton.focus();
      });

      expect(triggerButton).toHaveFocus();

      fireEvent.keyDown(triggerButton, {key: " ", charCode: keyCodes[" "]});

      let menu = wrapper.queryByRole("menu");

      expect(menu).toBeTruthy();

      let menuItems = wrapper.getAllByRole("menuitemradio");

      expect(menuItems.length).toBe(4);

      expect(menuItems[0]).toHaveFocus();
    });

    it("should press the item on keyDown (Enter)", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      const wrapper = render(
        <Dropdown disableAnimation>
          <DropdownTrigger>
            <Button data-testid="trigger-test">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions" selectionMode="single">
            <DropdownItem
              key="new"
              onPress={() => {
                /* eslint-disable no-console */
                console.log("ENTER");
              }}
            >
              New file
            </DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>,
      );

      let triggerButton = wrapper.getByTestId("trigger-test");

      act(() => {
        triggerButton.focus();
      });

      expect(triggerButton).toHaveFocus();

      fireEvent.keyDown(triggerButton, {key: "Enter", charCode: keyCodes.Enter});

      let menu = wrapper.queryByRole("menu");

      expect(menu).toBeTruthy();

      let menuItems = wrapper.getAllByRole("menuitemradio");

      expect(menuItems.length).toBe(4);

      expect(menuItems[0]).toHaveFocus();

      await act(async () => {
        await user.keyboard("[Enter]");
      });

      expect(logSpy).toHaveBeenCalledWith("ENTER");

      logSpy.mockRestore();
    });

    it("should press the item on keyDown (Space)", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      const wrapper = render(
        <Dropdown disableAnimation>
          <DropdownTrigger>
            <Button data-testid="trigger-test">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions" selectionMode="single">
            <DropdownItem
              key="new"
              onPress={() => {
                /* eslint-disable no-console */
                console.log("SPACE");
              }}
            >
              New file
            </DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>,
      );

      let triggerButton = wrapper.getByTestId("trigger-test");

      act(() => {
        triggerButton.focus();
      });

      expect(triggerButton).toHaveFocus();

      fireEvent.keyDown(triggerButton, {key: "Enter", charCode: keyCodes.Enter});

      let menu = wrapper.queryByRole("menu");

      expect(menu).toBeTruthy();

      let menuItems = wrapper.getAllByRole("menuitemradio");

      expect(menuItems.length).toBe(4);

      expect(menuItems[0]).toHaveFocus();

      await act(async () => {
        await user.keyboard("[Space]");
      });

      expect(logSpy).toHaveBeenCalledWith("SPACE");

      logSpy.mockRestore();
    });

    it("should respect closeOnSelect setting of DropdownItem (static)", async () => {
      const onOpenChange = jest.fn();
      const wrapper = render(
        <Dropdown onOpenChange={onOpenChange}>
          <DropdownTrigger>
            <Button data-testid="trigger-test">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="new" closeOnSelect={false}>
              New file
            </DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
          </DropdownMenu>
        </Dropdown>,
      );

      let triggerButton = wrapper.getByTestId("trigger-test");

      await act(async () => {
        await user.click(triggerButton);
      });

      expect(onOpenChange).toHaveBeenCalledTimes(1);

      let menuItems = wrapper.getAllByRole("menuitem");

      await act(async () => {
        await user.click(menuItems[0]);
      });

      expect(onOpenChange).toHaveBeenCalledTimes(1);

      await act(async () => {
        await user.click(menuItems[1]);
      });

      expect(onOpenChange).toHaveBeenCalledTimes(2);
    });

    it("should respect closeOnSelect setting of DropdownItem (dynamic)", async () => {
      const onOpenChange = jest.fn();
      const items = [
        {
          key: "new",
          label: "New file",
        },
        {
          key: "copy",
          label: "Copy link",
        },
      ];
      const wrapper = render(
        <Dropdown onOpenChange={onOpenChange}>
          <DropdownTrigger>
            <Button data-testid="trigger-test">Trigger</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions" items={items}>
            {(item) => (
              <DropdownItem key={item.key} closeOnSelect={item.key !== "new"}>
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>,
      );

      let triggerButton = wrapper.getByTestId("trigger-test");

      await act(async () => {
        await user.click(triggerButton);
      });

      expect(onOpenChange).toHaveBeenCalledTimes(1);

      let menuItems = wrapper.getAllByRole("menuitem");

      await act(async () => {
        await user.click(menuItems[0]);
      });

      expect(onOpenChange).toHaveBeenCalledTimes(2);
    });
  });
});
