import React from "react";
import {Meta} from "@storybook/react";
import {button, inputOtp} from "@heroui/theme";
import {Controller, useForm} from "react-hook-form";
import {ValidationResult} from "@react-types/shared";
import {Button} from "@heroui/button";
import {Form} from "@heroui/form";

import {InputOtp} from "../src";

export default {
  title: "Components/InputOtp",
  component: InputOtp,
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
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
} as Meta<typeof InputOtp>;

const defaultProps = {
  ...inputOtp.defaultVariants,
};

const Template = (args) => (
  <div>
    <InputOtp {...args} />
  </div>
);

const ErrorMessageFunctionTemplate = (args) => {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <div className="flex flex-col">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <InputOtp {...args} length={4} {...register("otp", {required: true})} />
        <button className={button({class: "w-fit"})} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const ControlledTemplate = (args) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-y-2">
      <InputOtp {...args} length={4} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-sm">Input value: {value}</p>
    </div>
  );
};

const AllowedKeysTemplate = (args) => {
  const allowedKeysConfig = [
    {
      name: "For below InputOtp, only lower-case alphabets (a to z) are allowed:",
      value: "^[a-z]*$",
    },
    {
      name: "For below InputOtp, only upper-case alphabets (A to Z) are allowed:",
      value: "^[A-Z]*$",
    },
  ];

  return (
    <div className="w-full flex flex-wrap gap-6">
      {allowedKeysConfig.map((config, idx) => (
        <div key={idx} className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="text-default-500">{config.name}</div>
          <InputOtp allowedKeys={config.value} length={4} {...args} />
        </div>
      ))}
    </div>
  );
};

const RequiredTemplate = (args) => {
  return (
    <form
      className="flex w-full flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const otp = formData.get("otp");

        alert(`OTP submitted: ${otp}`);
      }}
    >
      <InputOtp
        isRequired
        aria-label="OTP input field"
        length={4}
        name="otp"
        placeholder="Enter code"
        {...args}
      />
      <Button size="sm" type="submit" variant="bordered">
        Submit
      </Button>
    </form>
  );
};

const WithReactHookFormTemplate = (args) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      withDefaultValue: "12",
      requiredField: "",
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="text-default-400/60 text-xs">Default value:</div>
        <InputOtp {...args} {...register("withDefaultValue")} />
      </div>
      <div className="flex flex-col">
        <div className="text-default-400/60 text-xs">Required value:</div>
        <InputOtp {...args} {...register("requiredField", {required: true})} />
        {errors.requiredField && (
          <span className="text-danger text-tiny">This field is required</span>
        )}
      </div>
      <button className={button({class: "w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const WithReactHookFormControllerTemplate = (args) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="otp"
        render={({field}) => (
          <InputOtp
            {...field}
            errorMessage={errors.otp && errors.otp.message}
            isInvalid={!!errors.otp}
            {...args}
          />
        )}
        rules={{
          required: "OTP is required",
          minLength: {
            value: 4,
            message: "Please enter a valid OTP",
          },
        }}
      />
      <Button className="max-w-fit" type="submit" variant="flat">
        Verify OTP
      </Button>
    </form>
  );
};

const ServerValidationTemplate = (args) => {
  const [serverErrors, setServerErrors] = React.useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    setServerErrors({
      otp: "Please provide a valid OTP code.",
    });
  };

  return (
    <Form
      className="flex flex-col items-start gap-2"
      validationErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <InputOtp {...args} name="otp" />
      <Button size="sm" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const WithValidationTemplate = (args) => (
  <form
    className="flex flex-col items-start gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const otp = formData.get("otp");

      alert(`OTP submitted: ${otp}`);
    }}
  >
    <InputOtp
      {...args}
      name="otp"
      validate={(value) => {
        if (value.length < 4) {
          return "OTP must be 4 digits";
        }
      }}
    />
    <Button size="sm" type="submit">
      Submit
    </Button>
  </form>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
  },
};

export const Required = {
  render: RequiredTemplate,
  args: {
    ...defaultProps,
    length: 4,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    defaultValue: "123",
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    value: "12",
    isReadOnly: true,
  },
};

export const WithDescription = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    description: "Enter the 4 digit code sent to your email",
  },
};

export const WithErrorMessage = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    isInvalid: true,
    errorMessage: "Please enter a valid OTP.",
  },
};

export const WithErrorMessageFunction = {
  render: ErrorMessageFunctionTemplate,
  args: {
    ...defaultProps,
    length: 4,
    isRequired: true,
    minLength: 4,
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.tooShort) {
        return "Value is too short";
      }
    },
  },
};

export const Password = {
  render: RequiredTemplate,
  args: {
    ...defaultProps,
    type: "password",
  },
};

export const isInvalid = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    isInvalid: true,
    errorMessage: "Invalid OTP",
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const AllowedKeys = {
  render: AllowedKeysTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithReactHookForm = {
  render: WithReactHookFormTemplate,
  args: {
    ...defaultProps,
    length: 4,
  },
};

export const WithReactHookFormController = {
  render: WithReactHookFormControllerTemplate,
  args: {
    ...defaultProps,
    length: 4,
  },
};

export const CustomWithClassNames = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    classNames: {
      segmentWrapper: "gap-x-0",
      segment: [
        "relative",
        "h-10",
        "w-10",
        "border-y",
        "border-r",
        "first:rounded-l-md",
        "first:border-l",
        "last:rounded-r-md",
        "border-default-200",
        "data-[active=true]:border",
        "data-[active=true]:z-20",
        "data-[active=true]:ring-2",
        "data-[active=true]:ring-offset-2",
        "data-[active=true]:ring-offset-background",
        "data-[active=true]:ring-foreground",
      ],
    },
    radius: "none",
    description: "Enter the 4 digit code sent to your email",
  },
};

export const WithServerValidation = {
  render: ServerValidationTemplate,
  args: {
    ...defaultProps,
    length: 4,
  },
};

export const WithValidation = {
  render: WithValidationTemplate,
  args: {
    ...defaultProps,
    length: 4,
    isRequired: true,
  },
};
