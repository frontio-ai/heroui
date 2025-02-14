import {Form, Input, Button} from "@heroui/react";

export default function App() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <Button type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
  );
}
