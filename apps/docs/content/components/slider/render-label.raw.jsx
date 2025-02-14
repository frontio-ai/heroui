import {Slider, Tooltip} from "@heroui/react";

export const InfoIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12 8V13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M11.9945 16H12.0035"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

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
      renderLabel={({children, ...props}) => (
        <label {...props} className="text-medium flex gap-2 items-center">
          {children}
          <Tooltip
            className="w-[200px] px-1.5 text-tiny text-default-600 rounded-small"
            content="The price range you want to search for."
            placement="right"
          >
            <span className="transition-opacity opacity-80 hover:opacity-100">
              <InfoIcon />
            </span>
          </Tooltip>
        </label>
      )}
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
