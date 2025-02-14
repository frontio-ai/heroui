import "@testing-library/jest-dom";
import * as React from "react";
import {render, fireEvent} from "@testing-library/react";
import {shouldIgnoreReactWarning, spy} from "@heroui/test-utils";
import userEvent from "@testing-library/user-event";

import {Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, useDraggable} from "../src";

const ModalDraggable = ({canOverflow = false, isDisabled = false}) => {
  const targetRef = React.useRef(null);

  const {moveProps} = useDraggable({targetRef, canOverflow, isDisabled});

  return (
    <Modal ref={targetRef} isOpen>
      <ModalContent>
        <ModalHeader {...moveProps}>Modal header</ModalHeader>
        <ModalBody>Modal body</ModalBody>
        <ModalFooter>Modal footer</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

describe("Modal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
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
      <Modal ref={ref} isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );
    expect(ref.current).not.toBeNull();
  });

  test("should have the proper 'aria' attributes", () => {
    const {getByRole, getByText} = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const modal = getByRole("dialog");

    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("role", "dialog");

    const modalHeader = getByText("Modal header");

    expect(modal).toHaveAttribute("aria-labelledby", modalHeader.id);

    const modalBody = getByText("Modal body");

    expect(modal).toHaveAttribute("aria-describedby", modalBody.id);
  });

  test("should fire 'onOpenChange' callback when close button is clicked", async () => {
    const onClose = jest.fn();

    const {getByLabelText} = render(
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const closeButton = getByLabelText("Close");

    const user = userEvent.setup();

    await user.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("should hide the modal when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const modal = wrapper.getByRole("dialog");

    fireEvent.keyDown(modal, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should be rendered a draggable modal", () => {
    // mock viewport size to 1920x1080
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 1920);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 1080);

    const wrapper = render(<ModalDraggable />);

    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.touchStart(modalHeader, {changedTouches: [{pageX: 0, pageY: 0}]});
    fireEvent.touchMove(modalHeader, {changedTouches: [{pageX: 100, pageY: 50}]});
    fireEvent.touchEnd(modalHeader, {changedTouches: [{pageX: 100, pageY: 50}]});

    expect(() => wrapper.unmount()).not.toThrow();
    expect(document.documentElement.clientWidth).toBe(1920);
    expect(document.documentElement.clientHeight).toBe(1080);
    expect(modalHeader.style.cursor).toBe("move");
    expect(modal.style.transform).toBe("translate(100px, 50px)");
  });

  it("should be rendered a draggable modal on mobile", () => {
    // mock viewport size to 375x667
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 375);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 667);

    const wrapper = render(<ModalDraggable />);

    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.touchStart(modalHeader, {changedTouches: [{pageX: 0, pageY: 0}]});
    fireEvent.touchMove(modalHeader, {changedTouches: [{pageX: 0, pageY: 50}]});
    fireEvent.touchEnd(modalHeader, {changedTouches: [{pageX: 0, pageY: 50}]});

    expect(document.documentElement.clientWidth).toBe(375);
    expect(document.documentElement.clientHeight).toBe(667);
    expect(modal.style.transform).toBe("translate(0px, 50px)");
  });

  it("should not drag overflow viewport", () => {
    // mock viewport size to 1920x1080
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 1920);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 1080);
    const wrapper = render(<ModalDraggable />);
    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.touchStart(modalHeader, {changedTouches: [{pageX: 100, pageY: 50}]});
    fireEvent.touchMove(modalHeader, {changedTouches: [{pageX: 10000, pageY: 5000}]});
    fireEvent.touchEnd(modalHeader, {changedTouches: [{pageX: 10000, pageY: 5000}]});

    expect(modal.style.transform).toBe("translate(1920px, 1080px)");
  });

  it("should not drag when disabled", () => {
    // mock viewport size to 1920x1080
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 1920);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 1080);
    const wrapper = render(<ModalDraggable isDisabled />);
    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.touchStart(modalHeader, {changedTouches: [{pageX: 100, pageY: 50}]});
    fireEvent.touchMove(modalHeader, {changedTouches: [{pageX: 200, pageY: 100}]});
    fireEvent.touchEnd(modalHeader, {changedTouches: [{pageX: 200, pageY: 100}]});

    expect(modal.style.transform).toBe("");
  });

  test("should be rendered a draggable modal with overflow", () => {
    // mock viewport size to 1920x1080
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 1920);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 1080);

    const wrapper = render(<ModalDraggable canOverflow />);

    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.touchStart(modalHeader, {changedTouches: [{pageX: 0, pageY: 0}]});
    fireEvent.touchMove(modalHeader, {changedTouches: [{pageX: 2000, pageY: 1500}]});
    fireEvent.touchEnd(modalHeader, {changedTouches: [{pageX: 2000, pageY: 1500}]});

    expect(document.documentElement.clientWidth).toBe(1920);
    expect(document.documentElement.clientHeight).toBe(1080);
    expect(modal.style.transform).toBe("translate(2000px, 1500px)");
  });
});
