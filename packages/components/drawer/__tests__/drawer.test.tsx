import "@testing-library/jest-dom";
import * as React from "react";
import {render, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {spy, shouldIgnoreReactWarning} from "@heroui/test-utils";

import {Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter} from "../src";

describe("Drawer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Drawer isOpen>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    expect(() => wrapper.unmount()).not.toThrow();

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Drawer ref={ref} isOpen>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should have the proper 'aria' attributes", () => {
    const {getByRole, getByText} = render(
      <Drawer isOpen>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    const drawer = getByRole("dialog");

    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(drawer).toHaveAttribute("role", "dialog");

    const drawerHeader = getByText("Drawer header");

    expect(drawer).toHaveAttribute("aria-labelledby", drawerHeader.id);

    const drawerBody = getByText("Drawer body");

    expect(drawer).toHaveAttribute("aria-describedby", drawerBody.id);
  });

  test("should fire 'onOpenChange' callback when close button is clicked", async () => {
    const onClose = jest.fn();

    const {getByLabelText} = render(
      <Drawer isOpen onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    const closeButton = getByLabelText("Close");
    const user = userEvent.setup();

    await user.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("should hide the drawer when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Drawer isOpen onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    const drawer = wrapper.getByRole("dialog");

    fireEvent.keyDown(drawer, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
