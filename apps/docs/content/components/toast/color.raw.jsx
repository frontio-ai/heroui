import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
        <Button
          key={color}
          color={color}
          variant={"flat"}
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              color: color,
            })
          }
        >
          {color}
        </Button>
      ))}
    </div>
  );
}
