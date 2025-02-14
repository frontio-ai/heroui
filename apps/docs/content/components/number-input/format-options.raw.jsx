import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <NumberInput
          className="max-w-xs"
          defaultValue={6}
          formatOptions={{
            style: "currency",
            currency: "USD",
          }}
          label="With Currency"
        />
        <NumberInput
          className="max-w-xs"
          defaultValue={6}
          formatOptions={{
            signDisplay: "exceptZero",
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          }}
          label="With Sign"
        />
        <NumberInput
          className="max-w-xs"
          defaultValue={6}
          formatOptions={{
            style: "percent",
          }}
          label="With Percent"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <NumberInput
          className="max-w-xs"
          defaultValue={6}
          formatOptions={{
            style: "currency",
            currency: "EUR",
            currencyDisplay: "code",
            currencySign: "accounting",
          }}
          label="With Currency Vaule"
        />
        <NumberInput
          className="max-w-xs"
          defaultValue={6}
          formatOptions={{
            style: "unit",
            unit: "inch",
            unitDisplay: "long",
          }}
          label="With Unit"
        />
      </div>
    </div>
  );
}
