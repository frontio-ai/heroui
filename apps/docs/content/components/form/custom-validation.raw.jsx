import {Form, Input, Button} from "@heroui/react";

export default function App() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <Input
        isRequired
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
        validate={(value) => {
          if (value.length < 3) {
            return "Username must be at least 3 characters long";
          }

          return value === "admin" ? "Nice try!" : null;
        }}
      />
      <Button type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
  );
}
