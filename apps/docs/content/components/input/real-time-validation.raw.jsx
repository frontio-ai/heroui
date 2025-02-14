import {Button, Form, Input} from "@heroui/react";

export default function App() {
  const [submitted, setSubmitted] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const errors = [];

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  if (password.length < 4) {
    errors.push("Password must be 4 characters or more.");
  }
  if ((password.match(/[A-Z]/g) || []).length < 1) {
    errors.push("Password must include at least 1 upper case letter");
  }
  if ((password.match(/[^a-z0-9]/gi) || []).length < 1) {
    errors.push("Password must include at least 1 symbol.");
  }

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <Input
        errorMessage={() => (
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
        isInvalid={errors.length > 0}
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        value={password}
        onValueChange={setPassword}
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
