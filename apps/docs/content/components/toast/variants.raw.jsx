import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        ["solid", "solid"],
        ["bordered", "bordered"],
        ["flat", "faded"],
      ].map((variant) => (
        <Button
          key={variant[0]}
          // @ts-ignore
          variant={variant[1]}
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              // @ts-ignore
              variant: variant[0],
              color: "secondary",
            })
          }
        >
          {variant[0]}
        </Button>
      ))}
    </div>
  );
}
