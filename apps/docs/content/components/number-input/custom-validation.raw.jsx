import React from "react";
import {Button, Form, NumberInput} from "@heroui/react";

export default function App() {
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <NumberInput
        isRequired
        label="Amount"
        name="amount"
        placeholder="Enter a number"
        validate={(value) => {
          if (value < 100) {
            return "Number must be greater than 100";
          }

          if (value > 1000) {
            return "Number must be less than 1000";
          }

          return value === 777 ? "Nice try!" : null;
        }}
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}
