/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type {ValidationResult} from "@react-types/shared";

import React from "react";
import {Meta} from "@storybook/react";
import {button} from "@heroui/theme";
import {Form} from "@heroui/form";
import {numberInput} from "@heroui/theme";

import {NumberInput, NumberInputProps} from "../src";

export default {
  title: "Components/NumberInput",
  component: NumberInput,
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
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof NumberInput>;

const defaultProps = {
  ...numberInput.defaultVariants,
  defaultValue: 24,
};

const Template = (args) => (
  <div className="w-full max-w-[240px]">
    <NumberInput {...args} />
  </div>
);

const FormTemplate = (args) => (
  <form
    className="w-full max-w-xl flex flex-row items-end gap-4"
    onSubmit={(e) => {
      alert(`Submitted value: ${e.target["example"].value}`);
      e.preventDefault();
    }}
  >
    <NumberInput {...args} name="example" />
    <button className={button({color: "primary"})} type="submit">
      Submit
    </button>
  </form>
);

const ControlledTemplate = (args) => {
  const [value, setValue] = React.useState(0);

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <NumberInput {...args} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-sm">NumberInput value: {value}</p>
    </div>
  );
};

const LabelPlacementTemplate = (args) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full max-w-3xl flex flex-row items-end gap-4">
        <NumberInput {...args} description="inside" />
        <NumberInput {...args} description="outside" labelPlacement="outside" />
        <NumberInput {...args} description="outside-left" labelPlacement="outside-left" />
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full max-w-3xl flex flex-row items-end gap-4">
        <NumberInput {...args} description="inside" placeholder="Enter a number" />
        <NumberInput
          {...args}
          description="outside"
          labelPlacement="outside"
          placeholder="Enter a number"
        />
        <NumberInput
          {...args}
          description="outside-left"
          labelPlacement="outside-left"
          placeholder="Enter a number"
        />
      </div>
    </div>
  </div>
);

// const WithReactHookFormTemplate = (args: NumberInputProps) => {
//   const {
//     register,
//     formState: {errors},
//     handleSubmit,
//   } = useForm({
//     defaultValues: {
//       withDefaultValue: 24,
//       withoutDefaultValue: "",
//       requiredField: "",
//     },
//   });

//   const onSubmit = (data: any) => {
//     // eslint-disable-next-line no-console
//     console.log(data);
//     alert("Submitted value: " + JSON.stringify(data));
//   };

//   return (
//     <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//       <NumberInput
//         {...args}
//         isClearable
//         label="With default value"
//         {...register("withDefaultValue")}
//       />
//       <NumberInput {...args} label="Without default value" {...register("withoutDefaultValue")} />
//       <NumberInput {...args} label="Required" {...register("requiredField", {required: true})} />
//       {errors.requiredField && <span className="text-danger">This field is required</span>}
//       <button className={button({class: "w-fit"})} type="submit">
//         Submit
//       </button>
//     </form>
//   );
// };

const ServerValidationTemplate = (args: NumberInputProps) => {
  const [serverErrors, setServerErrors] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    setServerErrors({
      amount: "Please provide a valid number.",
    });
  };

  return (
    <Form
      className="flex flex-col items-start gap-2"
      validationErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <NumberInput {...args} />
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
    </Form>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
    "aria-label": "Amount",
  },
};

export const WithLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Amount",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Amount",
    description: "Specify the amount",
  },
};

export const WithStepValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Amount",
    step: 10,
    description: "Set `step` to `10` to increment / decrement the value by 10.",
  },
};

export const WithWheelDisabled = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Amount",
    step: 10,
    description: "Set `isWheelDisabled` to `true` to disable the wheel.",
    isWheelDisabled: true,
  },
};

export const WithFormatOptions = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Transaction amount",
    formatOptions: {
      style: "currency",
      currency: "EUR",
      currencyDisplay: "code",
      currencySign: "accounting",
    },
  },
};

export const HideStepper = {
  render: Template,

  args: {
    ...defaultProps,
    hideStepper: true,
    label: "Hide Stepper",
    description: "Set `hideStepper` to `true` to hide the stepper.",
  },
};

export const Required = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    label: "Amount",
    isRequired: true,
    defaultValue: undefined,
    placeholder: "Enter a number",
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "faded",
    isDisabled: true,
    "aria-label": "amount",
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isReadOnly: true,
    "aria-label": "amount",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
    label: "Amount",
    defaultValue: undefined,
  },
};

export const Clearable = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    placeholder: "Enter a number",
    // eslint-disable-next-line no-console
    onClear: () => console.log("number input cleared"),
    "aria-label": "amount",
  },
};

export const StartContent = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    label: "Price",
    placeholder: "0.00",
    startContent: (
      <div className="pointer-events-none flex items-center">
        <span className="text-default-400 text-sm">$</span>
      </div>
    ),
  },
};

export const EndContent = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    label: "Price",
    placeholder: "0.00",
    endContent: (
      <div className="pointer-events-none flex items-center">
        <span className="text-default-400 text-sm">€</span>
      </div>
    ),
  },
};

export const StartAndEndContent = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    label: "Price",
    placeholder: "0.00",
    endContent: (
      <div className="flex items-center">
        <label className="sr-only" htmlFor="currency">
          Currency
        </label>
        <select
          className="outline-none border-0 bg-transparent text-default-400 text-sm"
          id="currency"
          name="currency"
        >
          <option>USD</option>
          <option>ARS</option>
          <option>EUR</option>
        </select>
      </div>
    ),
    startContent: (
      <div className="pointer-events-none flex items-center">
        <span className="text-default-400 text-sm">$</span>
      </div>
    ),
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please enter a valid number",
    "aria-label": "amount",
  },
};

export const WithErrorMessageFunction = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    min: "0",
    max: "100",
    isRequired: true,
    label: "Number",
    validationBehavior: "native",
    placeholder: "Enter a number(0-100)",
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.rangeOverflow) {
        return "Value is too high";
      }
      if (value.validationDetails.rangeUnderflow) {
        return "Value is too low";
      }
      if (value.validationDetails.valueMissing) {
        return "Value is required";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    validate: (value) => {
      if (value < 0 || value > 100) {
        return "Value must be between 0 and 100";
      }
    },
    isRequired: true,
    label: "Number",
    placeholder: "Enter a number(0-100)",
  },
};

export const WithServerValidation = {
  render: ServerValidationTemplate,

  args: {
    ...defaultProps,
    label: "amount",
    name: "amount",
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isInvalid: true,
    placeholder: "Enter a number",
    errorMessage: "Please enter a valid range of numbers",
    "aria-label": "amount",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    placeholder: "Enter a number",
    "aria-label": "amount",
  },
};

export const MinValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Enter a number (min value: 60)",
    minValue: 60,
    defaultValue: 64,
  },
};

export const MaxValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Enter a number (max value: 100)",
    defaultValue: 0,
    maxValue: 100,
  },
};

export const CustomWithClassNames = {
  render: Template,

  args: {
    ...defaultProps,
    classNames: {
      label: "hidden",
      inputWrapper: [
        "bg-slate-100",
        "border",
        "shadow",
        "hover:bg-slate-200",
        "focus-within:!bg-slate-100",
        "dark:bg-slate-900",
        "dark:hover:bg-slate-800",
        "dark:border-slate-800",
        "dark:focus-within:!bg-slate-900",
      ],
      innerWrapper: "gap-3",
      input: [
        "text-base",
        "text-slate-500",
        "placeholder:text-slate-500",
        "dark:text-slate-400",
        "dark:placeholder:text-slate-400",
      ],
    },
    endContent: <div className="pointer-events-none flex items-center">€</div>,
    placeholder: "Enter the amount",
    "aria-label": "amount",
  },
};

// export const CustomWithHooks = {
//   render: CustomWithHooksTemplate,

//   args: {
//     ...defaultProps,
//     label: "Search",
//     type: "search",
//     placeholder: "Type to search...",
//     startContent: (
//       <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//     ),
//   },
// };

// export const WithReactHookForm = {
//   render: WithReactHookFormTemplate,

//   args: {
//     ...defaultProps,
//   },
// };
