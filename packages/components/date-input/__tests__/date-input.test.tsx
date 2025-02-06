/* eslint-disable jsx-a11y/no-autofocus */
import * as React from "react";
import {fireEvent, render} from "@testing-library/react";
import {
  CalendarDate,
  CalendarDateTime,
  DateValue,
  ZonedDateTime,
} from "@heroui/internationalized-date";
import {pointerMap, triggerPress} from "@heroui/test-utils";
import userEvent from "@testing-library/user-event";

import {DateInput as DateInputBase, DateInputProps} from "../src";

/**
 * Custom date-input to disable animations and avoid issues with react-motion and jest
 */
const DateInput = React.forwardRef((props: DateInputProps, ref: React.Ref<HTMLDivElement>) => {
  return <DateInputBase {...props} ref={ref} disableAnimation />;
});

DateInput.displayName = "DateInput";

describe("DateInput", () => {
  let user;

  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
    jest.useFakeTimers();
  });

  describe("Basics", () => {
    it("should render correctly", () => {
      const wrapper = render(<DateInput label="Date" />);

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it("ref should be forwarded", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<DateInput ref={ref} label="Date" />);
      expect(ref.current).not.toBeNull();
    });

    it("should support autoFocus", function () {
      let {getAllByRole} = render(<DateInput autoFocus label="Date" />);

      expect(document.activeElement).toBe(getAllByRole("spinbutton")[0]);
    });

    it("should pass through data attributes", function () {
      let {getByTestId} = render(<DateInput data-testid="foo" label="Date" />);

      const input = getByTestId("foo");

      expect(input).toHaveAttribute("role", "group");
    });

    it("should show as invalid if an unavailable date is given", async function () {
      let tree = render(
        <DateInput
          aria-label="Enter date between jan 1 and jan 8, 1980"
          errorMessage="Date unavailable."
          isDateUnavailable={(date) => {
            return (
              date.compare(new CalendarDate(1980, 1, 1)) >= 0 &&
              date.compare(new CalendarDate(1980, 1, 8)) <= 0
            );
          }}
          name="date"
          validationBehavior="aria"
        />,
      );

      await user.tab();
      await user.keyboard("01011980");

      expect(tree.getByText("Date unavailable.")).toBeInTheDocument();
    });
  });

  describe("Labelling", () => {
    it("should support labeling", function () {
      let {getAllByRole, getByText} = render(<DateInput label="Date" />);

      let label = getByText("Date");

      let combobox = getAllByRole("group")[0];

      expect(combobox).toHaveAttribute("aria-labelledby", label.id);

      let segments = getAllByRole("spinbutton");

      for (let segment of segments) {
        expect(segment).toHaveAttribute("id");
        let segmentId = segment.getAttribute("id");

        expect(segment).toHaveAttribute("aria-labelledby", `${segmentId} ${label.id}`);
      }
    });

    it("should support labeling with aria-label", function () {
      let {getByRole} = render(<DateInput aria-label="Birth date" />);

      let field = getByRole("group");

      expect(field).toHaveAttribute("aria-label", "Birth date");
      expect(field).toHaveAttribute("id");
    });

    it("should support labeling with aria-labelledby", function () {
      let {getByRole, getAllByRole} = render(<DateInput aria-labelledby="foo" />);

      let combobox = getByRole("group");

      expect(combobox).not.toHaveAttribute("aria-label");
      expect(combobox).toHaveAttribute("aria-labelledby", "foo");

      let segments = getAllByRole("spinbutton");

      for (let segment of segments) {
        expect(segment).toHaveAttribute("id");
        let segmentId = segment.getAttribute("id");

        expect(segment).toHaveAttribute("aria-labelledby", `${segmentId} foo`);
      }
    });

    it("should support help text description", function () {
      let {getByRole, getAllByRole} = render(<DateInput description="Help text" label="Date" />);

      let group = getByRole("group");

      expect(group).toHaveAttribute("aria-describedby");

      const descById = group.getAttribute("aria-describedby");

      let description = descById && document.getElementById(descById);

      expect(description).toHaveTextContent("Help text");

      let segments = getAllByRole("spinbutton");

      expect(segments[0]).toHaveAttribute(
        "aria-describedby",
        group.getAttribute("aria-describedby"),
      );

      for (let segment of segments.slice(1)) {
        expect(segment).not.toHaveAttribute("aria-describedby");
      }
    });

    it("should support error message", function () {
      let {getByRole, getAllByRole} = render(
        <DateInput errorMessage="Error message" label="Date" validationState="invalid" />,
      );

      let group = getByRole("group");

      expect(group).toHaveAttribute("aria-describedby");

      if (group) {
        let descById = group.getAttribute("aria-describedby");
        let description = descById && document.getElementById(descById);

        expect(description).toHaveTextContent("Error message");

        let segments = getAllByRole("spinbutton");

        for (let segment of segments) {
          expect(segment).toHaveAttribute(
            "aria-describedby",
            group.getAttribute("aria-describedby"),
          );
        }
      }
    });
  });

  describe("Events", function () {
    let onBlurSpy = jest.fn();
    let onFocusChangeSpy = jest.fn();
    let onFocusSpy = jest.fn();
    let onKeyDownSpy = jest.fn();
    let onKeyUpSpy = jest.fn();

    afterEach(() => {
      onBlurSpy.mockClear();
      onFocusChangeSpy.mockClear();
      onFocusSpy.mockClear();
      onKeyDownSpy.mockClear();
      onKeyUpSpy.mockClear();
    });

    it("should focus field and switching segments via tab does not change focus", async function () {
      let {getAllByRole} = render(
        <DateInput
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />,
      );
      let segments = getAllByRole("spinbutton");

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();
      await user.tab();
      expect(segments[0]).toHaveFocus();

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
      await user.tab();
      expect(segments[1]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it("should call blur when focus leaves", async function () {
      let {getAllByRole} = render(
        <DateInput
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />,
      );
      let segments = getAllByRole("spinbutton");

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();
      await user.tab();
      expect(segments[0]).toHaveFocus();
      await user.tab();
      expect(segments[1]).toHaveFocus();
      await user.tab();
      expect(segments[2]).toHaveFocus();
      expect(onBlurSpy).toHaveBeenCalledTimes(0);
      await user.tab();
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(2);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it("should trigger right arrow key event for segment navigation", async function () {
      let {getAllByRole} = render(
        <DateInput label="Date" onKeyDown={onKeyDownSpy} onKeyUp={onKeyUpSpy} />,
      );
      let segments = getAllByRole("spinbutton");

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();

      await user.tab();

      expect(segments[0]).toHaveFocus();
      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).toHaveBeenCalledTimes(1);

      if (document.activeElement) {
        fireEvent.keyDown(document.activeElement, {key: "ArrowRight"});
        fireEvent.keyUp(document.activeElement, {key: "ArrowRight"});
      }
      expect(segments[1]).toHaveFocus();
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("Forms", () => {
    it("supports form values", () => {
      let {rerender} = render(
        <DateInput label="Date" name="date" value={new CalendarDate(2020, 2, 3)} />,
      );
      let input = document.querySelector("input[name=date]");

      expect(input).toHaveValue("2020-02-03");

      rerender(
        <DateInput label="Date" name="date" value={new CalendarDateTime(2020, 2, 3, 8, 30)} />,
      );
      expect(input).toHaveValue("2020-02-03T08:30:00");

      rerender(
        <DateInput
          label="Date"
          name="date"
          value={new ZonedDateTime(2020, 2, 3, "America/Los_Angeles", -28800000, 12, 24, 45)}
        />,
      );
      expect(input).toHaveValue("2020-02-03T12:24:45-08:00[America/Los_Angeles]");
    });

    it("supports form reset", async () => {
      function Test() {
        let [value, setValue] = React.useState<DateValue | null>(new CalendarDate(2020, 2, 3));

        return (
          <form>
            <DateInput label="Value" name="date" value={value} onChange={setValue} />
            <input data-testid="reset" type="reset" />
          </form>
        );
      }

      let {getByTestId, getByRole, getAllByRole} = render(<Test />);
      let group = getByRole("group");
      let input = document.querySelector("input[name=date]");
      let segments = getAllByRole("spinbutton");

      let getDescription = () =>
        // @ts-ignore
        group
          .getAttribute("aria-describedby")
          .split(" ")
          // @ts-ignore
          .map((d) => document.getElementById(d).textContent)
          .join(" ");

      expect(getDescription()).toBe("Selected Date: February 03, 2020");

      expect(input).toHaveValue("2020-02-03");
      expect(input).toHaveAttribute("name", "date");
      fireEvent.keyDown(segments[0], {key: "ArrowUp"});
      fireEvent.keyUp(segments[0], {key: "ArrowUp"});
      expect(getDescription()).toBe("Selected Date: March 03, 2020");
      expect(input).toHaveValue("2020-03-03");

      let button = getByTestId("reset");

      triggerPress(button);

      expect(getDescription()).toBe("Selected Date: February 03, 2020");
      expect(input).toHaveValue("2020-02-03");
    });
  });
});
