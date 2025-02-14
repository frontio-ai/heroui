import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <NumberInput
          label="Price"
          placeholder="0.00"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
        <NumberInput
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="currency">
                Currency
              </label>
              <select
                aria-label="Select currency"
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                defaultValue="USD"
                id="currency"
                name="currency"
              >
                <option aria-label="US Dollar" value="USD">
                  USD
                </option>
                <option aria-label="Argentine Peso" value="ARS">
                  ARS
                </option>
                <option aria-label="Euro" value="EUR">
                  EUR
                </option>
              </select>
            </div>
          }
          label="Price"
          placeholder="0.00"
        />
      </div>
    </div>
  );
}
