import type {ValidationResult} from "@react-types/shared";

import React from "react";
import {Meta} from "@storybook/react";
import {checkbox} from "@heroui/theme";
import {button} from "@heroui/theme";
import {Form} from "@heroui/form";

import {CheckboxGroup, Checkbox, CheckboxGroupProps} from "../src";

export default {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
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
    lineThrough: {
      control: {
        type: "boolean",
      },
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
} as Meta<typeof Checkbox>;

const defaultProps = {
  ...checkbox.defaultVariants,
};

const Template = (args: CheckboxGroupProps) => (
  <CheckboxGroup {...args}>
    <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
    <Checkbox value="sydney">Sydney</Checkbox>
    <Checkbox value="san-francisco">San Francisco</Checkbox>
    <Checkbox value="london">London</Checkbox>
    <Checkbox value="tokyo">Tokyo</Checkbox>
  </CheckboxGroup>
);

const InvalidTemplate = (args: CheckboxGroupProps) => {
  const [isInvalid, setIsInvalid] = React.useState(true);

  return (
    <>
      <CheckboxGroup
        {...args}
        isRequired
        description="Select the cities you want to visit"
        isInvalid={isInvalid}
        label="Select cities"
        onValueChange={(value) => {
          setIsInvalid(value.length < 1);
        }}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    </>
  );
};

const FormTemplate = (args: CheckboxGroupProps) => {
  return (
    <form
      className="flex flex-col items-start gap-2"
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);
        const selectedCities = formData.getAll("favorite-cities");

        alert(`Submitted values: ${selectedCities.join(", ")}`);
        e.preventDefault();
      }}
    >
      <CheckboxGroup {...args} label="Select cities" name="favorite-cities">
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const ControlledTemplate = (args: CheckboxGroupProps) => {
  const [selected, setSelected] = React.useState<string[]>(["buenos-aires"]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <CheckboxGroup {...args} label="Select cities" value={selected} onValueChange={setSelected}>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500">Selected: {selected.join(", ")}</p>
    </div>
  );
};

const ServerValidationTemplate = (args: CheckboxGroupProps) => {
  const [serverErrors, setServerErrors] = React.useState({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setServerErrors({
      terms: "Please select a valid animal.",
    });
  };

  return (
    <Form
      className="flex flex-col items-start gap-2"
      validationErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <CheckboxGroup {...args} label="Agree to the following" name="terms">
        <Checkbox value="terms">Terms and conditions</Checkbox>
        <Checkbox value="cookies">Cookies</Checkbox>
        <Checkbox value="privacy">Privacy policy</Checkbox>
      </CheckboxGroup>
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
  },
};

export const WithLabel = {
  render: Template,

  args: {
    label: "Select cities",
  },
};

export const DefaultValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Select cities",
    defaultValue: ["buenos-aires", "london"],
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const Horizontal = {
  render: Template,

  args: {
    label: "Select cities",
    orientation: "horizontal",
  },
};

export const IsDisabled = {
  render: Template,

  args: {
    label: "Select cities",
    isDisabled: true,
  },
};

export const LineThrough = {
  render: Template,

  args: {
    label: "Select cities",
    lineThrough: true,
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Select the cities you want to visit",
  },
};

export const IsInvalid = {
  render: InvalidTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "The selected cities cannot be visited at the same time",
  },
};

export const WithErrorMessageFunction = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.valueMissing) {
        return "At least one option must be selected";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    description: "Please select at least 2 options",
    validate: (value: string[]) => {
      if (value.length < 2) {
        return "You must select at least 2 options";
      }

      return null;
    },
  },
};

export const WithServerValidation = {
  render: ServerValidationTemplate,

  args: {
    ...defaultProps,
  },
};

export const DisableAnimation = {
  render: Template,

  args: {
    label: "Select cities",
    disableAnimation: true,
  },
};

export const IsRequired = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};
