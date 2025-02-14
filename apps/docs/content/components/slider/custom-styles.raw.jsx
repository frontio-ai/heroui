import {Slider} from "@heroui/react";

export default function App() {
  return (
    <Slider
      classNames={{
        base: "max-w-md",
        filler: "bg-linear-to-r from-primary-500 to-secondary-400",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700 text-medium",
        value: "font-medium text-default-500 text-small",
        thumb: [
          "transition-size",
          "bg-linear-to-r from-secondary-400 to-primary-500",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
        ],
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
      }}
      defaultValue={[0, 800]}
      disableThumbScale={true}
      formatOptions={{style: "currency", currency: "USD"}}
      label="Price Range"
      maxValue={1000}
      minValue={0}
      showOutline={true}
      showSteps={true}
      showTooltip={true}
      step={100}
      tooltipProps={{
        offset: 10,
        placement: "bottom",
        classNames: {
          base: [
            // arrow color
            "before:bg-linear-to-r before:from-secondary-400 before:to-primary-500",
          ],
          content: [
            "py-2 shadow-xl",
            "text-white bg-linear-to-r from-secondary-400 to-primary-500",
          ],
        },
      }}
      tooltipValueFormatOptions={{style: "currency", currency: "USD", maximumFractionDigits: 0}}
    />
  );
}
