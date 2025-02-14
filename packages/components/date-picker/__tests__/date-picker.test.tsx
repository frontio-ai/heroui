/* eslint-disable jsx-a11y/no-autofocus */
import * as React from "react";
import {render, act, fireEvent, waitFor, within} from "@testing-library/react";
import {
  errorSpy,
  pointerMap,
  shouldIgnoreReactWarning,
  triggerPress,
  warnSpy,
} from "@heroui/test-utils";
import userEvent from "@testing-library/user-event";
import {CalendarDate, CalendarDateTime} from "@internationalized/date";
import {HeroUIProvider} from "@heroui/system";
import {Form} from "@heroui/form";

import {DatePicker as DatePickerBase, DatePickerProps} from "../src";

/**
 * Custom date-picker to disable animations and avoid issues with react-motion and jest
 */
const DatePicker = React.forwardRef((props: DatePickerProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <DatePickerBase
      {...props}
      ref={ref}
      disableAnimation
      labelPlacement="outside"
      shouldForceLeadingZeros={false}
    />
  );
});

DatePicker.displayName = "DatePicker";

const DatePickerWithLocale = React.forwardRef(
  (props: DatePickerProps & {locale: string}, ref: React.Ref<HTMLDivElement>) => {
    const {locale, ...otherProps} = props;

    return (
      <HeroUIProvider locale={locale}>
        <DatePickerBase
          {...otherProps}
          ref={ref}
          disableAnimation
          labelPlacement="outside"
          shouldForceLeadingZeros={false}
        />
      </HeroUIProvider>
    );
  },
);

DatePickerWithLocale.displayName = "DatePickerWithLocale";

function getTextValue(el: any) {
  if (
    el.className?.includes?.("DatePicker-placeholder") &&
    el.attributes?.getNamedItem("data-placeholder")?.value === "true"
  ) {
    return "";
  }

  return [...el.childNodes]
    .map((el) => (el.nodeType === 3 ? el.textContent : getTextValue(el)))
    .join("");
}

describe("DatePicker", () => {
  let user;

  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
  });

  describe("Basics", () => {
    it("should render correctly", () => {
      const wrapper = render(<DatePicker aria-label="Select date" />);

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it("ref should be forwarded", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<DatePicker ref={ref} aria-label="Select date" />);
      expect(ref.current).not.toBeNull();
    });

    it("should render a datepicker with a specified date", function () {
      let {getAllByRole} = render(<DatePicker label="Date" value={new CalendarDate(2019, 2, 3)} />);

      let combobox = getAllByRole("group")[0];

      expect(combobox).toBeVisible();
      expect(combobox).not.toHaveAttribute("aria-disabled");
      expect(combobox).not.toHaveAttribute("aria-invalid");

      let segments = getAllByRole("spinbutton");

      expect(segments.length).toBe(3);

      expect(getTextValue(segments[0])).toBe("2");
      expect(segments[0].getAttribute("aria-label")).toBe("month, ");
      expect(segments[0].getAttribute("aria-valuenow")).toBe("2");
      expect(segments[0].getAttribute("aria-valuetext")).toBe("2 – February");
      expect(segments[0].getAttribute("aria-valuemin")).toBe("1");
      expect(segments[0].getAttribute("aria-valuemax")).toBe("12");

      expect(getTextValue(segments[1])).toBe("3");
      expect(segments[1].getAttribute("aria-label")).toBe("day, ");
      expect(segments[1].getAttribute("aria-valuenow")).toBe("3");
      expect(segments[1].getAttribute("aria-valuetext")).toBe("3");
      expect(segments[1].getAttribute("aria-valuemin")).toBe("1");
      expect(segments[1].getAttribute("aria-valuemax")).toBe("28");

      expect(getTextValue(segments[2])).toBe("2019");
      expect(segments[2].getAttribute("aria-label")).toBe("year, ");
      expect(segments[2].getAttribute("aria-valuenow")).toBe("2019");
      expect(segments[2].getAttribute("aria-valuetext")).toBe("2019");
      expect(segments[2].getAttribute("aria-valuemin")).toBe("1");
      expect(segments[2].getAttribute("aria-valuemax")).toBe("9999");
    });

    it('should render a datepicker with granularity="second"', function () {
      let {getAllByRole} = render(
        <DatePicker granularity="second" label="Date" value={new CalendarDateTime(2019, 2, 3)} />,
      );

      let combobox = getAllByRole("group")[0];

      expect(combobox).toBeVisible();
      expect(combobox).not.toHaveAttribute("aria-disabled");
      expect(combobox).not.toHaveAttribute("aria-invalid");

      let segments = getAllByRole("spinbutton");

      expect(segments.length).toBe(7);

      expect(getTextValue(segments[0])).toBe("2");
      expect(segments[0].getAttribute("aria-label")).toBe("month, ");
      expect(segments[0].getAttribute("aria-valuenow")).toBe("2");
      expect(segments[0].getAttribute("aria-valuetext")).toBe("2 – February");
      expect(segments[0].getAttribute("aria-valuemin")).toBe("1");
      expect(segments[0].getAttribute("aria-valuemax")).toBe("12");

      expect(getTextValue(segments[1])).toBe("3");
      expect(segments[1].getAttribute("aria-label")).toBe("day, ");
      expect(segments[1].getAttribute("aria-valuenow")).toBe("3");
      expect(segments[1].getAttribute("aria-valuetext")).toBe("3");
      expect(segments[1].getAttribute("aria-valuemin")).toBe("1");
      expect(segments[1].getAttribute("aria-valuemax")).toBe("28");

      expect(getTextValue(segments[2])).toBe("2019");
      expect(segments[2].getAttribute("aria-label")).toBe("year, ");
      expect(segments[2].getAttribute("aria-valuenow")).toBe("2019");
      expect(segments[2].getAttribute("aria-valuetext")).toBe("2019");
      expect(segments[2].getAttribute("aria-valuemin")).toBe("1");
      expect(segments[2].getAttribute("aria-valuemax")).toBe("9999");

      expect(getTextValue(segments[3])).toBe("12");
      expect(segments[3].getAttribute("aria-label")).toBe("hour, ");
      expect(segments[3].getAttribute("aria-valuenow")).toBe("0");
      expect(segments[3].getAttribute("aria-valuetext")).toBe("12 AM");
      expect(segments[3].getAttribute("aria-valuemin")).toBe("0");
      expect(segments[3].getAttribute("aria-valuemax")).toBe("11");

      expect(getTextValue(segments[4])).toBe("00");
      expect(segments[4].getAttribute("aria-label")).toBe("minute, ");
      expect(segments[4].getAttribute("aria-valuenow")).toBe("0");
      expect(segments[4].getAttribute("aria-valuetext")).toBe("00");
      expect(segments[4].getAttribute("aria-valuemin")).toBe("0");
      expect(segments[4].getAttribute("aria-valuemax")).toBe("59");

      expect(getTextValue(segments[5])).toBe("00");
      expect(segments[5].getAttribute("aria-label")).toBe("second, ");
      expect(segments[5].getAttribute("aria-valuenow")).toBe("0");
      expect(segments[5].getAttribute("aria-valuetext")).toBe("00");
      expect(segments[5].getAttribute("aria-valuemin")).toBe("0");
      expect(segments[5].getAttribute("aria-valuemax")).toBe("59");

      expect(getTextValue(segments[6])).toBe("AM");
      expect(segments[6].getAttribute("aria-label")).toBe("AM/PM, ");
      expect(segments[6].getAttribute("aria-valuetext")).toBe("AM");
    });

    it("should support autoFocus", function () {
      let {getAllByRole} = render(<DatePicker autoFocus label="Date" />);

      expect(document.activeElement).toBe(getAllByRole("spinbutton")[0]);
    });

    it("should pass through data attributes", function () {
      let {getByTestId} = render(<DatePicker data-testid="foo" label="Date" />);

      expect(getByTestId("foo")).toHaveAttribute("role", "group");
    });

    it("should work with startContent", () => {
      const {getByText} = render(<DatePicker label="Date" startContent={<div>start</div>} />);

      expect(getByText("start")).toBeInTheDocument();
    });

    it("should work with endContent", () => {
      const {getByText} = render(<DatePicker endContent={<div>end</div>} label="Date" />);

      expect(getByText("end")).toBeInTheDocument();
    });

    it("should work with startContent and endContent", () => {
      const {getByText} = render(
        <DatePicker endContent={<div>end</div>} label="Date" startContent={<div>start</div>} />,
      );

      expect(getByText("start")).toBeInTheDocument();
      expect(getByText("end")).toBeInTheDocument();
    });

    it("should work with selectorButtonPlacement", () => {
      const {getByRole} = render(
        <DatePicker label="Date" selectorButtonPlacement="start" startContent={<div>start</div>} />,
      );

      const button = getByRole("button");

      expect(button).toHaveTextContent("start");

      triggerPress(button);

      const dialog = getByRole("dialog");

      expect(dialog).toBeInTheDocument();
    });

    it("should apply custom dateInput classNames", function () {
      const {getByText} = render(
        <DatePicker
          classNames={{
            inputWrapper: "border-green-500",
            label: "text-green-500",
          }}
          label="Date"
        />,
      );

      const label = getByText("Date");

      expect(label).toHaveClass("text-green-500");

      const inputWrapper = document.querySelector<HTMLButtonElement>(
        `div[data-slot="input-wrapper"]`,
      )!;

      expect(inputWrapper).toHaveClass("border-green-500");
    });
  });

  describe("Events", () => {
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

    it("should focus field, move a segment, and open popover and does not blur", async function () {
      let {getByRole, getAllByRole} = render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />,
      );
      let segments = getAllByRole("spinbutton");
      let button = getByRole("button");

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

      triggerPress(button);

      act(() => jest.runAllTimers());

      let dialog = getByRole("dialog");

      expect(dialog).toBeVisible();
    });

    it("should focus field and leave to blur", async function () {
      let {getAllByRole} = render(
        <DatePicker
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

      await user.click(document.body);
      expect(document.body).toHaveFocus();
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(2);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it("should open popover and call picker onFocus", function () {
      let {getByRole} = render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />,
      );

      let button = getByRole("button");

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      triggerPress(button);

      act(() => jest.runAllTimers());

      let dialog = getByRole("dialog");

      expect(dialog).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
    });

    it("should open and close popover and only call blur when focus leaves picker", async function () {
      let {getByRole} = render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />,
      );
      let button = getByRole("button");

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      triggerPress(button);
      act(() => jest.runAllTimers());

      let dialog = getByRole("dialog");

      expect(dialog).toBeVisible();

      //@ts-ignore
      fireEvent.keyDown(document.activeElement, {key: "Escape"});
      //@ts-ignore
      fireEvent.keyUp(document.activeElement, {key: "Escape"});

      act(() => jest.runAllTimers());

      await waitFor(() => {
        expect(dialog).not.toBeInTheDocument();
      }); // wait for animation

      // now that it's been unmounted, run the raf callback
      act(() => {
        jest.runAllTimers();
      });

      expect(dialog).not.toBeInTheDocument();
      expect(document.activeElement).toBe(button);
      expect(button).toHaveFocus();

      await user.tab();
      expect(document.body).toHaveFocus();
    });

    it("should trigger right arrow key event for segment navigation", async function () {
      let {getAllByRole} = render(
        <DatePicker label="Date" onKeyDown={onKeyDownSpy} onKeyUp={onKeyUpSpy} />,
      );
      let segments = getAllByRole("spinbutton");

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();

      await user.tab();
      expect(segments[0]).toHaveFocus();
      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).toHaveBeenCalledTimes(1);

      // @ts-ignore
      fireEvent.keyDown(document.activeElement, {key: "ArrowRight"});
      // @ts-ignore
      fireEvent.keyUp(document.activeElement, {key: "ArrowRight"});

      expect(segments[1]).toHaveFocus();
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("Calendar popover", function () {
    it("should emit onChange when selecting a date in the calendar in controlled mode", function () {
      let onChange = jest.fn();

      let {getByRole, getAllByRole, queryByLabelText} = render(
        <DatePicker
          hideTimeZone
          isRequired
          label="Date"
          value={new CalendarDate(2019, 2, 3)}
          onChange={onChange}
        />,
      );

      let combobox = getAllByRole("group")[0];

      expect(getTextValue(combobox)).toBe("2/3/2019");

      let button = getByRole("button");

      triggerPress(button);

      let dialog = getByRole("dialog");

      expect(dialog).toBeVisible();

      expect(queryByLabelText("Time")).toBeNull();

      let cells = getAllByRole("gridcell");
      let selected = cells.find((cell) => cell.getAttribute("aria-selected") === "true");

      // @ts-ignore
      expect(selected.children[0]).toHaveAttribute(
        "aria-label",
        "Sunday, February 3, 2019 selected",
      );

      // @ts-ignore
      triggerPress(selected.nextSibling.children[0]);

      expect(dialog).not.toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(new CalendarDate(2019, 2, 4));
      expect(getTextValue(combobox)).toBe("2/3/2019"); // controlled

      if (!shouldIgnoreReactWarning(warnSpy)) {
        expect(warnSpy).not.toHaveBeenCalled();
      }

      if (!shouldIgnoreReactWarning(errorSpy)) {
        expect(errorSpy).not.toHaveBeenCalled();
      }

      warnSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it("should emit onChange when selecting a date in the calendar in uncontrolled mode", function () {
      let onChange = jest.fn();
      let {getByRole, getAllByRole} = render(
        <DatePicker defaultValue={new CalendarDate(2019, 2, 3)} label="Date" onChange={onChange} />,
      );

      let combobox = getAllByRole("group")[0];

      expect(getTextValue(combobox)).toBe("2/3/2019");

      let button = getByRole("button");

      triggerPress(button);

      let dialog = getByRole("dialog");

      expect(dialog).toBeVisible();

      let cells = getAllByRole("gridcell");
      let selected = cells.find((cell) => cell.getAttribute("aria-selected") === "true");

      // @ts-ignore
      expect(selected.children[0]).toHaveAttribute(
        "aria-label",
        "Sunday, February 3, 2019 selected",
      );

      // @ts-ignore
      triggerPress(selected.nextSibling.children[0]);

      expect(dialog).not.toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(new CalendarDate(2019, 2, 4));
      expect(getTextValue(combobox)).toBe("2/4/2019"); // uncontrolled
    });

    it("should keep the selected date when the picker is opened, in showMonthAndYearPickers mode", function () {
      const {getByRole, getAllByRole} = render(
        <DatePicker showMonthAndYearPickers label="Date" value={new CalendarDate(2024, 5, 1)} />,
      );

      let combobox = getAllByRole("group")[0];

      expect(getTextValue(combobox)).toBe("5/1/2024");

      let button = getByRole("button");

      triggerPress(button);

      let dialog = getByRole("dialog");

      expect(dialog).toBeVisible();

      const content = getByRole("application");

      expect(content).toHaveAttribute("aria-label", "May 2024");
    });
  });

  describe("Month and Year Picker", () => {
    const onHeaderExpandedChangeSpy = jest.fn();

    afterEach(() => {
      onHeaderExpandedChangeSpy.mockClear();
    });

    it("should show the month and year picker (uncontrolled)", () => {
      const {getByRole} = render(
        <DatePicker
          showMonthAndYearPickers
          calendarProps={{
            onHeaderExpandedChange: onHeaderExpandedChangeSpy,
          }}
          defaultValue={new CalendarDate(2024, 4, 26)}
          label="Date"
        />,
      );

      const button = getByRole("button");

      triggerPress(button);

      const dialog = getByRole("dialog");
      const header = document.querySelector<HTMLButtonElement>(`button[data-slot="header"]`)!;

      expect(dialog).toBeVisible();
      expect(onHeaderExpandedChangeSpy).not.toHaveBeenCalled();

      triggerPress(header);

      const month = getByRole("button", {name: "April"});
      const year = getByRole("button", {name: "2024"});

      expect(month).toHaveAttribute("data-value", "4");
      expect(year).toHaveAttribute("data-value", "2024");
      expect(onHeaderExpandedChangeSpy).toHaveBeenCalledTimes(1);
      expect(onHeaderExpandedChangeSpy).toHaveBeenCalledWith(true);

      triggerPress(button);

      expect(dialog).not.toBeInTheDocument();
      expect(onHeaderExpandedChangeSpy).toHaveBeenCalledTimes(2);
      expect(onHeaderExpandedChangeSpy).toHaveBeenCalledWith(false);
    });

    it("should show the month and year picker (controlled)", () => {
      const {getByRole} = render(
        <DatePicker
          showMonthAndYearPickers
          calendarProps={{
            isHeaderExpanded: true,
            onHeaderExpandedChange: onHeaderExpandedChangeSpy,
          }}
          defaultValue={new CalendarDate(2024, 4, 26)}
          label="Date"
        />,
      );

      const button = getByRole("button");

      triggerPress(button);

      const dialog = getByRole("dialog");
      const month = getByRole("button", {name: "April"});
      const year = getByRole("button", {name: "2024"});

      expect(dialog).toBeVisible();
      expect(month).toHaveAttribute("data-value", "4");
      expect(year).toHaveAttribute("data-value", "2024");
      expect(onHeaderExpandedChangeSpy).not.toHaveBeenCalled();

      triggerPress(button);

      expect(dialog).not.toBeInTheDocument();
      expect(onHeaderExpandedChangeSpy).not.toHaveBeenCalled();
    });

    it("CalendarBottomContent should render correctly", () => {
      const {getByRole, getByTestId} = render(
        <DatePicker
          showMonthAndYearPickers
          CalendarBottomContent={<div data-testid="calendar-bottom-content" />}
          label="Date"
        />,
      );

      const button = getByRole("button");

      triggerPress(button);

      let dialog = getByRole("dialog");
      let calendarBottomContent = getByTestId("calendar-bottom-content");
      const header = document.querySelector<HTMLButtonElement>(`button[data-slot="header"]`)!;

      expect(dialog).toBeVisible();
      expect(calendarBottomContent).toBeVisible();

      triggerPress(header);

      expect(dialog).toBeVisible();
      expect(calendarBottomContent).not.toBeInTheDocument();

      triggerPress(button); // close date picker

      expect(dialog).not.toBeInTheDocument();
      expect(calendarBottomContent).not.toBeInTheDocument();

      triggerPress(button);

      dialog = getByRole("dialog");
      calendarBottomContent = getByTestId("calendar-bottom-content");

      expect(dialog).toBeVisible();
      expect(calendarBottomContent).toBeVisible();
    });

    it("should close listbox by clicking another datepicker", async () => {
      const {getByRole, getAllByRole} = render(
        <>
          <DatePicker data-testid="datepicker" label="Date" />
          <DatePicker data-testid="datepicker2" label="Date" />
        </>,
      );

      const dateButtons = getAllByRole("button");

      expect(dateButtons[0]).not.toBeNull();

      expect(dateButtons[1]).not.toBeNull();

      // open the datepicker dialog by clicking datepicker button in the first datepicker
      triggerPress(dateButtons[0]);

      let dialog = getByRole("dialog");

      // assert that the first datepicker dialog is open
      expect(dialog).toBeVisible();

      // close the datepicker dialog by clicking the second datepicker
      triggerPress(dateButtons[1]);

      dialog = getByRole("dialog");

      // assert that the second datepicker dialog is open
      expect(dialog).toBeVisible();
    });

    it("should display the correct year and month in showMonthAndYearPickers with locale", () => {
      const {getByRole} = render(
        <DatePickerWithLocale
          showMonthAndYearPickers
          defaultValue={new CalendarDate(2024, 6, 26)}
          label="Date"
          locale="th-TH-u-ca-buddhist"
        />,
      );

      const button = getByRole("button");

      triggerPress(button);

      const dialog = getByRole("dialog");
      const header = document.querySelector<HTMLButtonElement>(`button[data-slot="header"]`)!;

      expect(dialog).toBeVisible();

      triggerPress(header);

      const month = getByRole("button", {name: "มิถุนายน"});
      const year = getByRole("button", {name: "พ.ศ. 2567"});

      expect(month).toHaveAttribute("data-value", "6");
      expect(year).toHaveAttribute("data-value", "2567");
    });

    it("should open and close popover after clicking selector button", () => {
      const {getByRole} = render(<DatePicker data-testid="datepicker" label="Date" />);

      const selectorButton = getByRole("button");

      expect(selectorButton).not.toBeNull();

      // open the datepicker dialog by clicking selector button
      triggerPress(selectorButton);

      let dialog = getByRole("dialog");

      // assert that the datepicker dialog is open
      expect(dialog).toBeVisible();

      // click the selector button again
      triggerPress(selectorButton);

      // assert that the datepicker dialog is closed
      expect(dialog).not.toBeVisible();
    });
  });

  describe("validation", () => {
    describe("validationBehavior=native", () => {
      it("supports isRequired", async () => {
        const {getByRole, getByTestId} = render(
          <form data-testid="form">
            <DatePicker isRequired label="Date" name="date" validationBehavior="native" />
          </form>,
        );

        const group = getByRole("group");
        const input = document.querySelector("input[name=date]") as HTMLInputElement;

        expect(input).toHaveAttribute("required");
        expect(input.validity.valid).toBe(false);
        expect(group).not.toHaveAttribute("aria-describedby");

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(group).toHaveAttribute("aria-describedby");
        const getDescription = () =>
          group
            .getAttribute("aria-describedby")
            ?.split(" ")
            .map((d) => document.getElementById(d)?.textContent)
            .join(" ");

        expect(getDescription()).toContain("Constraints not satisfied");
        expect(document.activeElement).toBe(within(group).getAllByRole("spinbutton")[0]);

        await user.keyboard("[ArrowUp][Tab][ArrowUp][Tab][ArrowUp]");

        expect(getDescription()).toContain("Constraints not satisfied");
        expect(input.validity.valid).toBe(true);
      });
    });

    it("supports validate function", async () => {
      const {getByRole, getByTestId} = render(
        <Form data-testid="form" validationBehavior="native">
          <DatePicker
            defaultValue={new CalendarDate(2020, 2, 3)}
            label="Value"
            name="date"
            validate={(v) => (v.year < 2022 ? "Invalid value" : null)}
          />
        </Form>,
      );

      const group = getByRole("group");
      const input = document.querySelector("input[name=date]") as HTMLInputElement;
      const getDescription = () =>
        group
          .getAttribute("aria-describedby")
          ?.split(" ")
          .map((d) => document.getElementById(d)?.textContent)
          .join(" ");

      expect(getDescription()).not.toContain("Invalid value");
      expect(input.validity.valid).toBe(false);

      act(() => {
        (getByTestId("form") as HTMLFormElement).checkValidity();
      });

      expect(group).toHaveAttribute("aria-describedby");
      expect(getDescription()).toContain("Invalid value");
      expect(document.activeElement).toBe(within(group).getAllByRole("spinbutton")[0]);

      await user.keyboard("[ArrowRight][ArrowRight]2024");

      expect(getDescription()).toContain("Invalid value");
      expect(input.validity.valid).toBe(true);
    });

    it("supports server validation", async () => {
      function Test() {
        const [serverErrors, setServerErrors] = React.useState({});
        const onSubmit = (e) => {
          e.preventDefault();
          setServerErrors({
            date: "Invalid value",
          });
        };

        return (
          <Form validationBehavior="native" validationErrors={serverErrors} onSubmit={onSubmit}>
            <DatePicker label="Value" name="date" />
            <button data-testid="submit" type="submit">
              Submit
            </button>
          </Form>
        );
      }

      const {getByTestId, getByRole} = render(<Test />);

      const group = getByRole("group");
      const input = document.querySelector("input[name=date]") as HTMLInputElement;

      expect(group).not.toHaveAttribute("aria-describedby");

      await user.click(getByTestId("submit"));

      const getDescription = () =>
        group
          .getAttribute("aria-describedby")
          ?.split(" ")
          .map((d) => document.getElementById(d)?.textContent)
          .join(" ");

      expect(getDescription()).toContain("Invalid value");
      expect(input.validity.valid).toBe(false);

      await user.tab({shift: true});
      await user.tab({shift: true});
      await user.keyboard("2024[ArrowLeft]2[ArrowLeft]2");
      act(() => (document.activeElement as HTMLInputElement)?.blur());

      expect(getDescription()).not.toContain("Invalid value");
      expect(input.validity.valid).toBe(true);
    });

    describe("validationBehavior=aria", () => {
      it("supports minValue and maxValue", async () => {
        const {getByRole} = render(
          <Form data-testid="form" validationBehavior="aria">
            <DatePicker
              defaultValue={new CalendarDate(2019, 2, 3)}
              label="Date"
              maxValue={new CalendarDate(2024, 2, 3)}
              minValue={new CalendarDate(2020, 2, 3)}
              name="date"
            />
          </Form>,
        );

        const group = getByRole("group");
        const getDescription = () =>
          group
            .getAttribute("aria-describedby")
            ?.split(" ")
            .map((d) => document.getElementById(d)?.textContent)
            .join(" ");

        expect(getDescription()).toContain("Value must be 2/3/2020 or later.");

        await user.keyboard("[Tab][Tab][Tab][ArrowUp]");
        expect(getDescription()).not.toContain("Value must be 2/3/2020 or later.");

        await user.keyboard("[ArrowUp][ArrowUp][ArrowUp][ArrowUp][ArrowUp]");
        expect(getDescription()).toContain("Value must be 2/3/2024 or earlier.");

        await user.keyboard("[ArrowDown]");
        expect(getDescription()).not.toContain("Value must be 2/3/2024 or earlier.");
      });

      it("supports validate function", async () => {
        const {getByRole} = render(
          <Form data-testid="form" validationBehavior="aria">
            <DatePicker
              defaultValue={new CalendarDate(2020, 2, 3)}
              label="Value"
              validate={(v) => (v.year < 2022 ? "Invalid value" : null)}
            />
          </Form>,
        );

        const group = getByRole("group");

        expect(group).toHaveAttribute("aria-describedby");
        const getDescription = () =>
          group
            .getAttribute("aria-describedby")
            ?.split(" ")
            .map((d) => document.getElementById(d)?.textContent)
            .join(" ");

        expect(getDescription()).toContain("Invalid value");

        await user.keyboard("[Tab][ArrowRight][ArrowRight]2024");
        expect(getDescription()).not.toContain("Invalid value");
      });

      it("supports server validation", async () => {
        const {getByRole} = render(
          <Form validationBehavior="aria" validationErrors={{value: "Invalid value"}}>
            <DatePicker defaultValue={new CalendarDate(2020, 2, 3)} label="Value" name="value" />
          </Form>,
        );

        const group = getByRole("group");

        expect(group).toHaveAttribute("aria-describedby");
        const getDescription = () =>
          group
            .getAttribute("aria-describedby")
            ?.split(" ")
            .map((d) => document.getElementById(d)?.textContent)
            .join(" ");

        expect(getDescription()).toContain("Invalid value");

        await user.keyboard("[Tab][ArrowRight][ArrowRight]2024[Tab]");
        expect(getDescription()).not.toContain("Invalid value");
      });
    });
  });
});
