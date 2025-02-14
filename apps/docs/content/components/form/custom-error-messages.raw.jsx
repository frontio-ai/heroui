import {Form, Input, Button} from "@heroui/react";

export default function App() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <Input
        isRequired
        errorMessage={({validationDetails}) => {
          if (validationDetails.valueMissing) {
            return "Please enter a valid name";
          }
        }}
        label="Name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter your name"
        type="text"
      />
      <Button type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
  );
}
