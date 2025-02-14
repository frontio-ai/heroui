import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      {["none", "sm", "md", "lg", "full"].map((radius) => (
        <Button
          key={radius}
          radius={radius}
          variant={"flat"}
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              radius: radius,
            })
          }
        >
          {radius}
        </Button>
      ))}
    </div>
  );
}
