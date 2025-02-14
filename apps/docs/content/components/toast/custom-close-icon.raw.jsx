import {addToast, Button} from "@heroui/react";

const CustomToastComponent = () => {
  return (
    <Button
      variant="flat"
      onPress={() => {
        addToast({
          hideIcon: true,
          title: "Toast Title",
          description: "Toast Description",
          classNames: {
            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
          closeIcon: (
            <svg
              fill="none"
              height="32"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="32"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ),
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
