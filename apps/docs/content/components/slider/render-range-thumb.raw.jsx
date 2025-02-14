import {Slider} from "@heroui/react";

export default function App() {
  return (
    <Slider
      classNames={{
        base: "max-w-md gap-3",
        filler: "bg-linear-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
      }}
      defaultValue={[100, 300]}
      formatOptions={{style: "currency", currency: "USD"}}
      label="Price Range"
      maxValue={1000}
      renderThumb={({index, ...props}) => (
        <div
          {...props}
          className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
        >
          <span
            className={cn(
              "transition-transform bg-linear-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
              index === 0
                ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800", // second thumb
            )}
          />
        </div>
      )}
      size="lg"
      step={10}
    />
  );
}
