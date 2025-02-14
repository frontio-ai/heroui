import React from "react";
import {Meta} from "@storybook/react";
import {dateInput, button} from "@heroui/theme";
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
  parseDate,
  parseZonedDateTime,
  today,
} from "@internationalized/date";
import {CalendarBoldIcon} from "@heroui/shared-icons";
import {useDateFormatter, I18nProvider} from "@react-aria/i18n";
import {ValidationResult} from "@react-types/shared";

import {DateInput, DateInputProps} from "../src";

export default {
  title: "Components/DateInput",
  component: DateInput,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
} as Meta<typeof DateInput>;

const defaultProps = {
  label: "Birth date",
  ...dateInput.defaultVariants,
};

const Template = (args: DateInputProps) => (
  <DateInput {...args} placeholderValue={new CalendarDate(1995, 11, 6)} />
);

const FormTemplate = (args: DateInputProps) => (
  <form
    className="flex flex-col gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      alert(`Submitted: ${e.target["date"].value}`);
    }}
  >
    <DateInput {...args} name="date" />
    <button className={button({className: "max-w-fit"})} type="submit">
      Submit
    </button>
  </form>
);

const LabelPlacementTemplate = (args: DateInputProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <DateInput {...args} description="inside" />
    <DateInput {...args} description="outside" labelPlacement="outside" />
    <DateInput {...args} description="outside-left" labelPlacement="outside-left" />
  </div>
);

const ControlledTemplate = (args: DateInputProps) => {
  const [value, setValue] = React.useState<DateValue | null>(parseDate("2024-04-04"));

  let formatter = useDateFormatter({dateStyle: "full"});

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DateInput {...args} label="Date (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
      <DateInput {...args} defaultValue={parseDate("2024-04-04")} label="Date (uncontrolled)" />
    </div>
  );
};

const TimeZonesTemplate = (args: DateInputProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <DateInput
      {...args}
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
      labelPlacement="outside"
    />
    <DateInput
      {...args}
      defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
      labelPlacement="outside"
    />
  </div>
);

const GranularityTemplate = (args: DateInputProps) => {
  let [date, setDate] = React.useState<DateValue | null>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z"),
  );

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DateInput
        {...args}
        granularity="second"
        label="Date and time"
        value={date}
        onChange={setDate}
      />
      <DateInput {...args} granularity="day" label="Date" value={date} onChange={setDate} />
      <DateInput {...args} granularity="second" label="Event date" />
      <DateInput
        {...args}
        granularity="second"
        label="Event date"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
};

const InternationalCalendarsTemplate = (args: DateInputProps) => {
  let [date, setDate] = React.useState<DateValue | null>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z"),
  );

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DateInput {...args} label="Appointment date" value={date} onChange={setDate} />
      </I18nProvider>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Required = {
  render: FormTemplate,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    isDisabled: true,
    defaultValue: parseDate("2024-04-04"),
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultValue: parseDate("2024-04-04"),
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Birth date",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please enter your birth date",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    startContent: (
      <CalendarBoldIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
    ),
  },
};

export const EndContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    endContent: (
      <CalendarBoldIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
    ),
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please enter a valid date",
  },
};

export const WithErrorMessageFunction = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: (value: ValidationResult) => {
      if (value.isInvalid) {
        return "Please enter a valid date";
      }
    },
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isInvalid: true,
    defaultValue: parseDate("2024-04-04"),
    errorMessage: "Please enter a valid date",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
  },
};

export const TimeZones = {
  render: TimeZonesTemplate,

  args: {
    ...defaultProps,
    label: "Event date",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const Granularity = {
  render: GranularityTemplate,

  args: {
    ...defaultProps,
  },
};

export const InternationalCalendars = {
  render: InternationalCalendarsTemplate,

  args: {
    ...defaultProps,
  },
};

export const MinDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    minValue: today(getLocalTimeZone()),
    defaultValue: parseDate("2024-04-03"),
  },
};

export const MaxDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    maxValue: today(getLocalTimeZone()),
    defaultValue: today(getLocalTimeZone()).add({days: 1}),
  },
};

export const PlaceholderValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Appointment time",
    defaultValue: today(getLocalTimeZone()),
    placeholderValue: new CalendarDate(1995, 11, 6),
  },
};

export const HideTimeZone = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Appointment time",
    hideTimeZone: true,
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const HourCycle = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Appointment time",
    hourCycle: 24,
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
    granularity: "minute",
  },
};

export const UnavailableDates = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    label: "Appointment date (Unavailable: Jan 1 - Jan 8, 2024)",
    isDateUnavailable: (date) => {
      return (
        date.compare(new CalendarDate(2024, 1, 1)) >= 0 &&
        date.compare(new CalendarDate(2024, 1, 8)) <= 0
      );
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    validate: (value) => {
      if (!value) {
        return "Please enter a date";
      }
      if (value.year < 2024) {
        return "Please select a date in the year 2024 or later";
      }
    },
    label: "Date (Year 2024 or later)",
  },
};
