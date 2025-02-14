import React from "react";
import {Meta} from "@storybook/react";
import {dateInput, button} from "@heroui/theme";
import {ClockCircleLinearIcon} from "@heroui/shared-icons";
import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";
import {ValidationResult} from "@react-types/shared";

import {TimeInput, TimeInputProps, TimeInputValue as TimeValue} from "../src";

export default {
  title: "Components/TimeInput",
  component: TimeInput,
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
} as Meta<typeof TimeInput>;

const defaultProps = {
  label: "Event Time",
  ...dateInput.defaultVariants,
};

const Template = (args: TimeInputProps) => <TimeInput {...args} />;

const FormTemplate = (args: TimeInputProps) => (
  <form
    className="flex flex-col gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      alert(`Submitted: ${e.target["time"].value}`);
    }}
  >
    <TimeInput {...args} name="time" />
    <button className={button({className: "max-w-fit"})} type="submit">
      Submit
    </button>
  </form>
);

const LabelPlacementTemplate = (args: TimeInputProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <TimeInput {...args} description="inside" />
    <TimeInput {...args} description="outside" labelPlacement="outside" />
    <TimeInput {...args} description="outside-left" labelPlacement="outside-left" />
  </div>
);

const ControlledTemplate = (args: TimeInputProps) => {
  let [value, setValue] = React.useState<TimeValue>(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));

  let formatter = useDateFormatter({dateStyle: "short", timeStyle: "long"});

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <TimeInput {...args} label="Time (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          {value instanceof ZonedDateTime
            ? (value?.toDate && formatter.format(value.toDate())) ||
              (value && value.toString()) ||
              "--"
            : ""}
        </p>
      </div>

      <TimeInput {...args} defaultValue={new Time(11, 45)} label="Time (uncontrolled)" />
    </div>
  );
};

const TimeZonesTemplate = (args: TimeInputProps) => (
  <div className="w-full max-w-xl flex flex-col items-end gap-4">
    <TimeInput
      {...args}
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
      labelPlacement="outside"
    />
    <TimeInput
      {...args}
      defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
      labelPlacement="outside"
    />
  </div>
);

const GranularityTemplate = (args: TimeInputProps) => {
  let [date, setDate] = React.useState<TimeValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <TimeInput {...args} granularity="hour" label="Hour" value={date} onChange={setDate} />
      <TimeInput {...args} granularity="minute" label="Minute" value={date} onChange={setDate} />
      <TimeInput {...args} granularity="second" label="Second" value={date} onChange={setDate} />
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
    defaultValue: new Time(11, 45),
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultValue: new Time(11, 45),
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Event Time",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please enter your meeting time",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please enter a valid time",
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
      <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none shrink-0" />
    ),
  },
};

export const EndContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    endContent: (
      <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none shrink-0" />
    ),
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
    label: "Event time",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const Granularity = {
  render: GranularityTemplate,

  args: {
    ...defaultProps,
  },
};

export const MinTimeValue = {
  render: Template,

  args: {
    ...defaultProps,
    minValue: new Time(9),
    defaultValue: new Time(8),
  },
};

export const MaxTimeValue = {
  render: Template,

  args: {
    ...defaultProps,
    maxValue: new Time(17),
    defaultValue: new Time(18),
  },
};

export const PlaceholderValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Meeting time",
    placeholderValue: new Time(9),
  },
};

export const HideTimeZone = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Meeting time",
    hideTimeZone: true,
    defaultValue: parseZonedDateTime("2022-11-07T10:45[America/Los_Angeles]"),
  },
};

export const HourCycle = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Meeting time",
    hourCycle: 24,
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
    granularity: "minute",
  },
};
export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    validate: (value) => {
      if (!value) {
        return "Please enter a time";
      }
      if (value.hour < 9) {
        return "Please select a time at 9 A.M. or later";
      }
    },
    label: "Time (9 A.M. or later)",
  },
};
