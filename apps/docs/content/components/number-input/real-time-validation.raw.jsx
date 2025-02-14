import {Button, Form, NumberInput} from "@heroui/react";

export default function App() {
  const [submitted, setSubmitted] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const errors = [];

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  if (!amount) {
    errors.push("The value must not be empty");
  }

  if (amount < 100) {
    errors.push("The value must be greater than 100");
  }

  if (amount > 1000) {
    errors.push("The value must be less than 1000");
  }

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <NumberInput
        errorMessage={() => (
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
        isInvalid={errors.length > 0}
        label="Amount"
        name="amount"
        placeholder="Enter a number"
        value={amount}
        onValueChange={setAmount}
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
