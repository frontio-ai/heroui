/* eslint-disable jsx-a11y/no-autofocus */
import * as React from "react";
import {render, act, fireEvent} from "@testing-library/react";
import {CalendarDate, isWeekend} from "@heroui/internationalized-date";
import {triggerPress, keyCodes} from "@heroui/test-utils";
import {useLocale} from "@heroui/react-aria-i18n";
import {HeroUIProvider} from "@heroui/system";

import {Calendar as CalendarBase, CalendarProps} from "../src";

/**
 * Custom calendar to disable animations and avoid issues with react-motion and jest
 */
const Calendar = React.forwardRef((props: CalendarProps, ref: React.Ref<HTMLDivElement>) => {
  return <CalendarBase {...props} ref={ref} disableAnimation />;
});

Calendar.displayName = "Calendar";

const CalendarWithLocale = React.forwardRef(
  (props: CalendarProps & {locale: string}, ref: React.Ref<HTMLDivElement>) => {
    const {locale, ...otherProps} = props;

    return (
      <HeroUIProvider locale={locale}>
        <CalendarBase {...otherProps} ref={ref} disableAnimation />
      </HeroUIProvider>
    );
  },
);

CalendarWithLocale.displayName = "CalendarWithLocale";

describe("Calendar", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
  });

  describe("Basics", () => {
    it("should render correctly", () => {
      const wrapper = render(<Calendar />);

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it("ref should be forwarded", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<Calendar ref={ref} />);
      expect(ref.current).not.toBeNull();
    });

    it("should render with defaultValue", () => {
      const wrapper = render(<Calendar defaultValue={new CalendarDate(2024, 3, 31)} />);

      const heading = wrapper.getByRole("heading");

      expect(heading).toHaveTextContent("March 2024");

      const gridCells = wrapper
        .getAllByRole("gridcell")
        ?.filter((cell) => cell.getAttribute("aria-disabled") !== "true");

      expect(gridCells).toHaveLength(31);

      const selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.parentElement).toHaveAttribute("role", "gridcell");
      expect(selectedDate.parentElement).toHaveAttribute("aria-selected", "true");
      expect(selectedDate).toHaveAttribute("aria-label", "Sunday, March 31, 2024 selected");
    });

    it("should render with a value", () => {
      const wrapper = render(<Calendar value={new CalendarDate(2024, 3, 31)} />);

      const heading = wrapper.getByRole("heading");

      expect(heading).toHaveTextContent("March 2024");

      const gridCells = wrapper
        .getAllByRole("gridcell")
        ?.filter((cell) => cell.getAttribute("aria-disabled") !== "true");

      expect(gridCells).toHaveLength(31);

      const selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.parentElement).toHaveAttribute("role", "gridcell");
      expect(selectedDate.parentElement).toHaveAttribute("aria-selected", "true");
      expect(selectedDate).toHaveAttribute("aria-label", "Sunday, March 31, 2024 selected");
    });

    it("should focus the selected date if autoFocus is set", () => {
      // eslint-disable-next-line jsx-a11y/no-autofocus
      const wrapper = render(<Calendar autoFocus value={new CalendarDate(2024, 3, 31)} />);

      const selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      const grid = wrapper.getByRole("grid");

      expect(selectedDate.parentElement).toHaveAttribute("role", "gridcell");
      expect(selectedDate.parentElement).toHaveAttribute("aria-selected", "true");
      expect(selectedDate).toHaveFocus();
      expect(grid).not.toHaveAttribute("aria-activedescendant");
    });

    it("should center the selected date if multiple months are visible", () => {
      let {getAllByRole, getByLabelText} = render(
        <Calendar value={new CalendarDate(2024, 2, 14)} visibleMonths={3} />,
      );

      const grids = getAllByRole("grid");

      expect(grids).toHaveLength(3);

      const selectedDate = getByLabelText("selected", {exact: false});

      expect(grids[1].contains(selectedDate)).toBe(true);
    });

    it("should constrain the visible region depending on the minValue", () => {
      const {getAllByRole, getByLabelText} = render(
        <Calendar
          minValue={new CalendarDate(2024, 2, 10)}
          value={new CalendarDate(2024, 2, 14)}
          visibleMonths={3}
        />,
      );

      const grids = getAllByRole("grid");

      expect(grids).toHaveLength(3);

      const selectedDate = getByLabelText("selected", {exact: false});

      expect(grids[0].contains(selectedDate)).toBe(true);
    });
  });

  describe("Keyboard interactions", () => {
    it("should select a date on keyDown Enter/Space (uncontrolled)", () => {
      const onChange = jest.fn();

      const wrapper = render(
        <Calendar autoFocus defaultValue={new CalendarDate(2024, 3, 31)} onChange={onChange} />,
      );

      const grid = wrapper.getByRole("grid");
      let selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("31");

      // Select a new date
      fireEvent.keyDown(grid, {key: "ArrowLeft", keyCode: keyCodes.ArrowLeft});
      fireEvent.keyDown(grid, {key: "Enter", keyCode: keyCodes.Enter});

      selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("30");
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2024, 3, 30));

      // Select a new date
      fireEvent.keyDown(grid, {key: "ArrowLeft", keyCode: keyCodes.ArrowLeft});
      fireEvent.keyDown(grid, {key: " ", keyCode: keyCodes[" "]});

      selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("29");
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toEqual(new CalendarDate(2024, 3, 29));
    });

    it("should select a date on keyDown Enter/Space (controlled)", () => {
      let onChange = jest.fn();
      let value = new CalendarDate(2024, 3, 31);

      let wrapper = render(<Calendar autoFocus value={value} onChange={onChange} />);

      let grid = wrapper.getByRole("grid");
      let selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("31");

      // Select a new date
      fireEvent.keyDown(grid, {key: "ArrowLeft", keyCode: keyCodes.ArrowLeft});
      fireEvent.keyDown(grid, {key: "Enter", keyCode: keyCodes.Enter});

      selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("31"); // controlled (value didn't change)
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2024, 3, 30));

      // Select a new date
      fireEvent.keyDown(grid, {key: "ArrowLeft", keyCode: keyCodes.ArrowLeft});
      fireEvent.keyDown(grid, {key: " ", keyCode: keyCodes[" "]});

      selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("31"); // controlled (value didn't change)
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toEqual(new CalendarDate(2024, 3, 29));
    });

    it("should not select a date on keyDown Enter/Space if isReadOnly", () => {
      const onChange = jest.fn();

      const wrapper = render(
        <Calendar
          autoFocus
          isReadOnly
          defaultValue={new CalendarDate(2024, 3, 31)}
          onChange={onChange}
        />,
      );

      const grid = wrapper.getByRole("grid");
      let selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("31");

      // Select a new date
      fireEvent.keyDown(grid, {key: "ArrowLeft", keyCode: keyCodes.ArrowLeft});
      fireEvent.keyDown(grid, {key: "Enter", keyCode: keyCodes.Enter});

      selectedDate = wrapper.getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("31");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should select a date on click (uncontrolled)", () => {
      let onChange = jest.fn();
      let {getByLabelText, getByText} = render(
        <Calendar value={new CalendarDate(2024, 3, 31)} onChange={onChange} />,
      );

      let newDate = getByText("17");

      triggerPress(newDate);

      let selectedDate = getByLabelText("selected", {exact: false});

      expect(selectedDate.textContent).toBe("31");
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2024, 3, 17));
    });

    it("should not select a date on click if isDisabled", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <Calendar isDisabled value={new CalendarDate(2024, 3, 31)} onChange={onChange} />,
      );

      let newDate = getByText("17");

      triggerPress(newDate);

      expect(() => {
        getAllByLabelText("Selected", {exact: false});
      }).toThrow();

      expect(onChange).not.toHaveBeenCalled();
    });

    it("should not open a month & year picker if isDisabled is true", () => {
      const {container} = render(
        <Calendar isDisabled showMonthAndYearPickers value={new CalendarDate(2024, 6, 29)} />,
      );

      const headerButtonPicker = container.querySelector("[data-slot='header']");

      expect(headerButtonPicker).toHaveAttribute("disabled");
    });

    it("should not select a date on click if isReadOnly", () => {
      let onChange = jest.fn();
      let {getByLabelText, getByText} = render(
        <Calendar isReadOnly value={new CalendarDate(2024, 3, 31)} onChange={onChange} />,
      );

      let newDate = getByText("17");

      triggerPress(newDate);

      let selectedDate = getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("31");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should not select a date on click if outside the valid date range", () => {
      let onChange = jest.fn();
      let {getByLabelText} = render(
        <Calendar
          defaultValue={new CalendarDate(2019, 2, 8)}
          maxValue={new CalendarDate(2019, 2, 15)}
          minValue={new CalendarDate(2019, 2, 5)}
          onChange={onChange}
        />,
      );

      triggerPress(getByLabelText("Sunday, February 3, 2019"));

      let selectedDate = getByLabelText("Selected", {exact: false});

      expect(selectedDate.textContent).toBe("8");
      expect(onChange).not.toHaveBeenCalled();

      triggerPress(getByLabelText("Sunday, February 17, 2019"));

      selectedDate = getByLabelText("Selected", {exact: false});
      expect(selectedDate.textContent).toBe("8");
      expect(onChange).not.toHaveBeenCalled();

      triggerPress(getByLabelText("Tuesday, February 5, 2019, First available date"));

      selectedDate = getByLabelText("Selected", {exact: false});
      expect(selectedDate.textContent).toBe("5");
      expect(onChange).toHaveBeenCalledTimes(1);

      triggerPress(getByLabelText("Friday, February 15, 2019, Last available date"));

      selectedDate = getByLabelText("Selected", {exact: false});
      expect(selectedDate.textContent).toBe("15");
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it("should support invalid state", () => {
      let {getByRole} = render(<Calendar isInvalid defaultValue={new CalendarDate(2022, 3, 11)} />);

      let cell = getByRole("button", {
        name: "Friday, March 11, 2022 selected",
      }) as HTMLButtonElement;

      expect(cell).toHaveAttribute("aria-invalid", "true");
      expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
      expect(cell.parentElement).toHaveAttribute("aria-invalid", "true");

      let description = cell.getAttribute("aria-describedby");

      if (description) {
        description = description
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent)
          .join(" ");
      }

      expect(description).toBe("Selected date unavailable.");
    });

    it("should support custom error message", () => {
      let {getByRole} = render(
        <Calendar
          isInvalid
          defaultValue={new CalendarDate(2022, 3, 11)}
          errorMessage="This is a custom error message"
        />,
      );

      let cell = getByRole("button", {
        name: "Friday, March 11, 2022 selected",
      }) as HTMLButtonElement;

      expect(cell).toHaveAttribute("aria-invalid", "true");
      expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
      expect(cell.parentElement).toHaveAttribute("aria-invalid", "true");

      let description = cell.getAttribute("aria-describedby");

      if (description) {
        description = description
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent)
          .join(" ");
      }

      expect(description).toBe("This is a custom error message");
    });

    it("should not show error message without isInvalid", () => {
      let {getByRole} = render(
        <Calendar
          defaultValue={new CalendarDate(2022, 3, 11)}
          errorMessage="This is a custom error message"
        />,
      );

      let cell = getByRole("button", {
        name: "Friday, March 11, 2022 selected",
      }) as HTMLButtonElement;

      expect(cell).not.toHaveAttribute("aria-invalid");
      expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
      expect(cell.parentElement).not.toHaveAttribute("aria-invalid");

      let description = cell.getAttribute("aria-describedby");

      if (description) {
        description = description
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent)
          .join(" ");
      }

      expect(description).toBeNull();
    });

    it("should automatically marks selection as invalid using isDateUnavailable", () => {
      function Example() {
        let {locale} = useLocale();

        return (
          <Calendar
            defaultValue={new CalendarDate(2022, 3, 5)}
            isDateUnavailable={(date) => isWeekend(date, locale)}
          />
        );
      }

      let {getByRole} = render(<Example />);

      let cell = getByRole("button", {name: "Saturday, March 5, 2022 selected"});

      expect(cell).toHaveAttribute("aria-invalid", "true");
      expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
      expect(cell.parentElement).toHaveAttribute("aria-invalid", "true");

      let description = cell.getAttribute("aria-describedby");

      if (description) {
        description = description
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent)
          .join(" ");
      }

      expect(description).toBe("Selected date unavailable.");
    });

    it("should display the correct year and month in showMonthAndYearPickers with locale", () => {
      const {getByRole} = render(
        <CalendarWithLocale
          showMonthAndYearPickers
          defaultValue={new CalendarDate(2024, 6, 26)}
          locale="th-TH-u-ca-buddhist"
        />,
      );

      const header = document.querySelector<HTMLButtonElement>(`button[data-slot="header"]`)!;

      triggerPress(header);

      const month = getByRole("button", {name: "มิถุนายน"});
      const year = getByRole("button", {name: "พ.ศ. 2567"});

      expect(month).toHaveAttribute("data-value", "6");
      expect(year).toHaveAttribute("data-value", "2567");
    });
  });
});
