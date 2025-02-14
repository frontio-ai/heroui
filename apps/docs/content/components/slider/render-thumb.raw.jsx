import {Slider} from "@heroui/react";

export default function App() {
  return (
    <Slider
      classNames={{
        base: "max-w-md gap-3",
        track: "border-s-secondary-100",
        filler: "bg-linear-to-r from-secondary-100 to-secondary-500",
      }}
      defaultValue={60}
      label="Select brightness"
      renderThumb={(props) => (
        <div
          {...props}
          className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
        >
          <span className="transition-transform bg-linear-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
        </div>
      )}
      size="sm"
    />
  );
}
