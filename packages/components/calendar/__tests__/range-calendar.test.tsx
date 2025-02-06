/* eslint-disable jsx-a11y/no-autofocus */
import * as React from "react";
import {render, act, fireEvent} from "@testing-library/react";
import {CalendarDate} from "@heroui/internationalized-date";
import {keyCodes, triggerPress, type} from "@heroui/test-utils";

import {RangeCalendar as RangeCalendarCalendarBase, RangeCalendarProps} from "../src";

let cellFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Custom range-calendar to disable animations and avoid issues with react-motion and jest
 */
const RangeCalendar = React.forwardRef(
  (props: RangeCalendarProps, ref: React.Ref<HTMLDivElement>) => {
    return <RangeCalendarCalendarBase {...props} ref={ref} disableAnimation />;
  },
);

RangeCalendar.displayName = "RangeCalendar";

describe("RangeCalendar", () => {
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
      const wrapper = render(<RangeCalendar />);

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it("ref should be forwarded", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<RangeCalendar ref={ref} />);
      expect(ref.current).not.toBeNull();
    });

    it("should render with defaultValue", () => {
      let {getAllByLabelText, getByRole, getAllByRole} = render(
        <RangeCalendar
          defaultValue={{start: new CalendarDate(2019, 6, 5), end: new CalendarDate(2019, 6, 10)}}
        />,
      );

      let heading = getByRole("heading");

      expect(heading).toHaveTextContent("June 2019");

      let gridCells = getAllByRole("gridcell").filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );

      expect(gridCells.length).toBe(30);

      let selectedDates = getAllByLabelText("Selected", {exact: false});
      let labels = [
        "Selected Range: Wednesday, June 5 to Monday, June 10, 2019, Wednesday, June 5, 2019 selected",
        "Thursday, June 6, 2019 selected",
        "Friday, June 7, 2019 selected",
        "Saturday, June 8, 2019 selected",
        "Sunday, June 9, 2019 selected",
        "Selected Range: Wednesday, June 5 to Monday, June 10, 2019, Monday, June 10, 2019 selected",
      ];

      expect(selectedDates.length).toBe(6);

      let i = 0;

      for (let cell of selectedDates) {
        expect(cell.parentElement).toHaveAttribute("role", "gridcell");
        expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
        expect(cell).toHaveAttribute("aria-label", labels[i++]);
      }
    });

    it("should render with value", () => {
      let {getAllByLabelText, getByRole, getAllByRole} = render(
        <RangeCalendar
          value={{start: new CalendarDate(2019, 6, 5), end: new CalendarDate(2019, 6, 10)}}
        />,
      );

      let heading = getByRole("heading");

      expect(heading).toHaveTextContent("June 2019");

      let gridCells = getAllByRole("gridcell").filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );

      expect(gridCells.length).toBe(30);

      let selectedDates = getAllByLabelText("Selected", {exact: false});
      let labels = [
        "Selected Range: Wednesday, June 5 to Monday, June 10, 2019, Wednesday, June 5, 2019 selected",
        "Thursday, June 6, 2019 selected",
        "Friday, June 7, 2019 selected",
        "Saturday, June 8, 2019 selected",
        "Sunday, June 9, 2019 selected",
        "Selected Range: Wednesday, June 5 to Monday, June 10, 2019, Monday, June 10, 2019 selected",
      ];

      expect(selectedDates.length).toBe(6);

      let i = 0;

      for (let cell of selectedDates) {
        expect(cell.parentElement).toHaveAttribute("role", "gridcell");
        expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
        expect(cell).toHaveAttribute("aria-label", labels[i++]);
      }
    });

    it("should focus the first selected date if autoFocus is set", () => {
      let {getByRole, getAllByLabelText} = render(
        <RangeCalendar
          autoFocus
          value={{start: new CalendarDate(2019, 2, 3), end: new CalendarDate(2019, 2, 18)}}
        />,
      );

      let cells = getAllByLabelText("selected", {exact: false});
      let grid = getByRole("grid");

      expect(cells[0].parentElement).toHaveAttribute("role", "gridcell");
      expect(cells[0].parentElement).toHaveAttribute("aria-selected", "true");
      expect(cells[0]).toHaveFocus();
      expect(grid).not.toHaveAttribute("aria-activedescendant");
    });

    it("should show selected dates across multiple months", async () => {
      let {getByRole, getByTestId, getAllByLabelText, getAllByRole} = render(
        <RangeCalendar
          nextButtonProps={{
            // @ts-ignore
            "data-testid": "next-button",
          }}
          prevButtonProps={{
            // @ts-ignore
            "data-testid": "prev-button",
          }}
          value={{start: new CalendarDate(2019, 6, 20), end: new CalendarDate(2019, 7, 10)}}
        />,
      );

      let heading = getByRole("heading");

      expect(heading).toHaveTextContent("June 2019");

      let gridCells = getAllByRole("gridcell").filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );

      expect(gridCells.length).toBe(30);

      let selected = getAllByLabelText("selected", {exact: false}).filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );

      expect(selected.length).toBe(11);

      let juneLabels = [
        "Selected Range: Thursday, June 20 to Wednesday, July 10, 2019, Thursday, June 20, 2019 selected",
        "Friday, June 21, 2019 selected",
        "Saturday, June 22, 2019 selected",
        "Sunday, June 23, 2019 selected",
        "Monday, June 24, 2019 selected",
        "Tuesday, June 25, 2019 selected",
        "Wednesday, June 26, 2019 selected",
        "Thursday, June 27, 2019 selected",
        "Friday, June 28, 2019 selected",
        "Saturday, June 29, 2019 selected",
        "Sunday, June 30, 2019 selected",
      ];

      let i = 0;

      for (let cell of selected) {
        expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
        expect(cell).toHaveAttribute("aria-label", juneLabels[i++]);
      }

      let nextButton = getByTestId("next-button");

      triggerPress(nextButton);

      selected = getAllByLabelText("selected", {exact: false}).filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );

      expect(selected.length).toBe(10);

      let julyLabels = [
        "Monday, July 1, 2019 selected",
        "Tuesday, July 2, 2019 selected",
        "Wednesday, July 3, 2019 selected",
        "Thursday, July 4, 2019 selected",
        "Friday, July 5, 2019 selected",
        "Saturday, July 6, 2019 selected",
        "Sunday, July 7, 2019 selected",
        "Monday, July 8, 2019 selected",
        "Tuesday, July 9, 2019 selected",
        "Selected Range: Thursday, June 20 to Wednesday, July 10, 2019, Wednesday, July 10, 2019 selected",
      ];

      i = 0;
      for (let cell of selected) {
        expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
        expect(cell).toHaveAttribute("aria-label", julyLabels[i++]);
      }

      expect(heading).toHaveTextContent("July 2019");
      gridCells = getAllByRole("gridcell").filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );
      expect(gridCells.length).toBe(31);

      expect(nextButton).toHaveFocus();

      let prevButton = getByTestId("prev-button");

      triggerPress(prevButton);

      expect(heading).toHaveTextContent("June 2019");
      gridCells = getAllByRole("gridcell").filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );
      expect(gridCells.length).toBe(30);

      selected = getAllByLabelText("selected", {exact: false}).filter(
        (cell) => cell.getAttribute("aria-disabled") !== "true",
      );
      expect(selected.length).toBe(11);
      i = 0;
      for (let cell of selected) {
        expect(cell.parentElement).toHaveAttribute("aria-selected", "true");
        expect(cell).toHaveAttribute("aria-label", juneLabels[i++]);
      }

      expect(prevButton).toHaveFocus();
    });

    it("should center the selected range if multiple months are visible", () => {
      let {getAllByRole, getAllByLabelText} = render(
        <RangeCalendar
          value={{start: new CalendarDate(2019, 2, 3), end: new CalendarDate(2019, 2, 10)}}
          visibleMonths={3}
        />,
      );

      let grids = getAllByRole("grid");

      expect(grids).toHaveLength(3);

      let cells = getAllByLabelText("selected", {exact: false});

      expect(cells.every((cell) => grids[1].contains(cell))).toBe(true);
    });

    it("should constrain the visible region depending on the minValue", () => {
      let {getAllByRole, getAllByLabelText} = render(
        <RangeCalendar
          minValue={new CalendarDate(2019, 2, 1)}
          value={{start: new CalendarDate(2019, 2, 3), end: new CalendarDate(2019, 2, 10)}}
          visibleMonths={3}
        />,
      );

      let grids = getAllByRole("grid");

      expect(grids).toHaveLength(3);

      let cells = getAllByLabelText("selected", {exact: false});

      expect(cells.every((cell) => grids[0].contains(cell))).toBe(true);
    });

    it("should start align the selected range if it would go out of view when centered", () => {
      let {getAllByRole, getAllByLabelText} = render(
        <RangeCalendar
          value={{start: new CalendarDate(2019, 1, 3), end: new CalendarDate(2019, 3, 10)}}
          visibleMonths={3}
        />,
      );

      let grids = getAllByRole("grid");

      expect(grids).toHaveLength(3);

      let cells = getAllByLabelText("selected", {exact: false});

      expect(grids[0].contains(cells[0])).toBe(true);
    });
  });

  describe("Keyboard interactions", () => {
    it("should add a range selection prompt to the focused cell", () => {
      let {getByRole, getByLabelText} = render(<RangeCalendar autoFocus />);

      let grid = getByRole("grid");
      let cell = getByLabelText("today", {exact: false});

      expect(grid).not.toHaveAttribute("aria-activedescendant");
      expect(cell).toHaveAttribute("aria-label", `Today, ${cellFormatter.format(new Date())}`);
      expect(cell).toHaveAttribute("aria-describedby");

      const cellDescBy = cell.getAttribute("aria-describedby");

      if (cellDescBy) {
        expect(document.getElementById(cellDescBy)).toHaveTextContent(
          "Click to start selecting date range",
        );
      }

      // enter selection mode
      fireEvent.keyDown(grid, {key: "Enter", keyCode: keyCodes.Enter});
      expect(grid).not.toHaveAttribute("aria-activedescendant");
      expect(cell.parentElement).toHaveAttribute("aria-selected");
      expect(cell).toHaveAttribute(
        "aria-label",
        `Today, ${cellFormatter.format(new Date())} selected`,
      );
      expect(cell).toHaveAttribute("aria-describedby");

      const cellDescBySelected = cell.getAttribute("aria-describedby");

      if (cellDescBySelected) {
        expect(document.getElementById(cellDescBySelected)).toHaveTextContent(
          "Click to finish selecting date range",
        );
      }
    });

    it("should select a range with the keyboard (uncontrolled)", () => {
      let onChange = jest.fn();

      let {getAllByLabelText} = render(
        <RangeCalendar
          autoFocus
          defaultValue={{start: new CalendarDate(2019, 6, 5), end: new CalendarDate(2019, 6, 10)}}
          onChange={onChange}
        />,
      );

      let selectedDates = getAllByLabelText("Selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("5");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("10");

      // Select a new date
      type("ArrowLeft");

      // Begin selecting
      type("Enter");

      // Auto advances by one day
      selectedDates = getAllByLabelText("Selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("4");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("5");
      expect(onChange).toHaveBeenCalledTimes(0);

      // Move focus
      type("ArrowRight");
      type("ArrowRight");
      type("ArrowRight");
      type("ArrowRight");

      selectedDates = getAllByLabelText("Selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("4");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("9");
      expect(onChange).toHaveBeenCalledTimes(0);

      // End selection
      type(" ");
      selectedDates = getAllByLabelText("Selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("4"); // uncontrolled
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("9");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 4));
      expect(end).toEqual(new CalendarDate(2019, 6, 9));
    });

    it("select a range with the keyboard (controlled)", () => {
      let onChange = jest.fn();
      let {getAllByLabelText} = render(
        <RangeCalendar
          autoFocus
          value={{start: new CalendarDate(2019, 6, 5), end: new CalendarDate(2019, 6, 10)}}
          onChange={onChange}
        />,
      );

      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("5");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("10");

      // Select a new date
      type("ArrowLeft");

      // Begin selecting
      type("Enter");

      // Auto advances by one day
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("4");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("5");
      expect(onChange).toHaveBeenCalledTimes(0);

      // Move focus
      type("ArrowRight");
      type("ArrowRight");
      type("ArrowRight");
      type("ArrowRight");

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("4");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("9");
      expect(onChange).toHaveBeenCalledTimes(0);

      // End selection
      type(" ");
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("5"); // controlled
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("10");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 4));
      expect(end).toEqual(new CalendarDate(2019, 6, 9));
    });

    it("should not enter selection mode with the keyboard if isReadOnly", () => {
      let {getByRole, getByLabelText} = render(<RangeCalendar autoFocus isReadOnly />);

      let grid = getByRole("grid");
      let cell = getByLabelText("today", {exact: false});

      expect(grid).not.toHaveAttribute("aria-activedescendant");
      expect(cell).toHaveAttribute("aria-label", `Today, ${cellFormatter.format(new Date())}`);
      expect(document.activeElement).toBe(cell);

      // try to enter selection mode
      fireEvent.keyDown(grid, {key: "Enter", keyCode: keyCodes.Enter});
      expect(grid).not.toHaveAttribute("aria-activedescendant");
      expect(cell.parentElement).not.toHaveAttribute("aria-selected");
      expect(cell).toHaveAttribute("aria-label", `Today, ${cellFormatter.format(new Date())}`);
      expect(document.activeElement).toBe(cell);
    });

    it("should select a range with the mouse (uncontrolled)", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <RangeCalendar
          defaultValue={{start: new CalendarDate(2019, 6, 5), end: new CalendarDate(2019, 6, 10)}}
          onChange={onChange}
        />,
      );

      triggerPress(getByText("17"));

      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("17");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("17");
      expect(onChange).toHaveBeenCalledTimes(0);

      // hovering updates the highlighted dates
      // @ts-ignore
      fireEvent.pointerEnter(getByText("10").parentElement);
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("10");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("17");
      expect(onChange).toHaveBeenCalledTimes(0);

      // @ts-ignore
      fireEvent.pointerEnter(getByText("7").parentElement);
      triggerPress(getByText("7"));

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("7"); // uncontrolled
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("17");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 7));
      expect(end).toEqual(new CalendarDate(2019, 6, 17));
    });

    it("should select a range with the mouse (controlled)", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <RangeCalendar
          value={{start: new CalendarDate(2019, 6, 5), end: new CalendarDate(2019, 6, 10)}}
          onChange={onChange}
        />,
      );

      triggerPress(getByText("17"));

      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("17");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("17");
      expect(onChange).toHaveBeenCalledTimes(0);

      // hovering updates the highlighted dates
      fireEvent.pointerEnter(getByText("10"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("10");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("17");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.pointerEnter(getByText("7"));
      triggerPress(getByText("7"));

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("5"); // controlled
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("10");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 7));
      expect(end).toEqual(new CalendarDate(2019, 6, 17));
    });

    it("selects by dragging with the mouse", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <RangeCalendar
          defaultValue={{start: new CalendarDate(2019, 6, 5), end: new CalendarDate(2019, 6, 10)}}
          onChange={onChange}
        />,
      );

      fireEvent.mouseDown(getByText("17"), {detail: 1});

      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("17");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("17");
      expect(onChange).toHaveBeenCalledTimes(0);

      // dragging updates the highlighted dates
      fireEvent.pointerEnter(getByText("18"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("17");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("18");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.pointerEnter(getByText("23"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("17");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("23");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.mouseUp(getByText("23"), {detail: 1});

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("17");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("23");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 17));
      expect(end).toEqual(new CalendarDate(2019, 6, 23));
    });

    it("allows dragging the start of the highlighted range to modify it", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <RangeCalendar
          defaultValue={{start: new CalendarDate(2019, 6, 10), end: new CalendarDate(2019, 6, 20)}}
          onChange={onChange}
        />,
      );

      fireEvent.mouseDown(getByText("10"), {detail: 1});

      // mouse down on a range end should not reset it
      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("10");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("20");
      expect(onChange).toHaveBeenCalledTimes(0);

      // dragging updates the highlighted dates
      fireEvent.pointerEnter(getByText("11"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("11");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("20");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.pointerEnter(getByText("8"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("8");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("20");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.mouseUp(getByText("8"), {detail: 1});

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("8");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("20");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 8));
      expect(end).toEqual(new CalendarDate(2019, 6, 20));
    });

    it("allows dragging the end of the highlighted range to modify it", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <RangeCalendar
          defaultValue={{start: new CalendarDate(2019, 6, 10), end: new CalendarDate(2019, 6, 20)}}
          onChange={onChange}
        />,
      );

      fireEvent.mouseDown(getByText("20"), {detail: 1});

      // mouse down on a range end should not reset it
      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("10");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("20");
      expect(onChange).toHaveBeenCalledTimes(0);

      // dragging updates the highlighted dates
      fireEvent.pointerEnter(getByText("21"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("10");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("21");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.pointerEnter(getByText("19"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("10");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("19");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.mouseUp(getByText("19"), {detail: 1});

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("10");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("19");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 10));
      expect(end).toEqual(new CalendarDate(2019, 6, 19));
    });

    it("releasing drag outside calendar commits it", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <RangeCalendar
          defaultValue={{start: new CalendarDate(2019, 6, 10), end: new CalendarDate(2019, 6, 20)}}
          onChange={onChange}
        />,
      );

      fireEvent.mouseDown(getByText("22"), {detail: 1});

      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("22");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("22");
      expect(onChange).toHaveBeenCalledTimes(0);

      // dragging updates the highlighted dates
      fireEvent.pointerEnter(getByText("25"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("22");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("25");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.pointerUp(document.body);

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("22");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("25");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 22));
      expect(end).toEqual(new CalendarDate(2019, 6, 25));
    });

    it("releasing drag outside calendar commits it", () => {
      let onChange = jest.fn();
      let {getAllByLabelText, getByText} = render(
        <RangeCalendar
          defaultValue={{start: new CalendarDate(2019, 6, 10), end: new CalendarDate(2019, 6, 20)}}
          onChange={onChange}
        />,
      );

      fireEvent.mouseDown(getByText("22"), {detail: 1});

      let selectedDates = getAllByLabelText("selected", {exact: false});

      expect(selectedDates[0].textContent).toBe("22");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("22");
      expect(onChange).toHaveBeenCalledTimes(0);

      // dragging updates the highlighted dates
      fireEvent.pointerEnter(getByText("25"));
      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("22");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("25");
      expect(onChange).toHaveBeenCalledTimes(0);

      fireEvent.pointerUp(document.body);

      selectedDates = getAllByLabelText("selected", {exact: false});
      expect(selectedDates[0].textContent).toBe("22");
      expect(selectedDates[selectedDates.length - 1].textContent).toBe("25");
      expect(onChange).toHaveBeenCalledTimes(1);

      let {start, end} = onChange.mock.calls[0][0];

      expect(start).toEqual(new CalendarDate(2019, 6, 22));
      expect(end).toEqual(new CalendarDate(2019, 6, 25));
    });
  });
});
