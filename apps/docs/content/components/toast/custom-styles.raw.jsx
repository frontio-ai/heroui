import {addToast, Button, cn} from "@heroui/react";

const CustomToastComponent = () => {
  return (
    <Button
      variant="flat"
      onPress={() => {
        addToast({
          title: "Successfull!",
          description: "Document uploaded to cloud successfully.",
          classNames: {
            base: cn([
              "bg-default-50 dark:bg-background shadow-sm",
              "border-1",
              "relative before:content-[''] before:absolute before:z-10",
              "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
              "rounded-l-none border-l-0",
              "min-w-[350px]",
              "rounded-md",
              "flex flex-col items-start",
              "before:bg-primary border-primary-200 dark:border-primary-100",
            ]),
            icon: "w-6 h-6 fill-current",
          },
          endContent: (
            <div className="ms-11 my-2 flex gap-x-2">
              <Button color={"primary"} size="sm" variant="bordered">
                View Document
              </Button>
              <Button className="underline-offset-2" color={"primary"} size="sm" variant="light">
                Maybe Later
              </Button>
            </div>
          ),
          color: "primary",
        });
      }}
    >
      Show Toast
    </Button>
  );
};

export default function App() {
  return (
    <div className="flex gap-2">
      <CustomToastComponent />
    </div>
  );
}
