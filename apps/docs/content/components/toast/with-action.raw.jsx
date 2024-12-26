import {addToast, Button, ToastProvider} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Button
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            endContent: (
              <Button color="warning" size="sm" variant="flat">
                Upgrade
              </Button>
            ),
            color: "warning",
            variant: "faded",
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
}
