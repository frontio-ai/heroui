import {Input} from "@heroui/react";

export const MailIcon = (props) => {
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
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          label="Email"
          labelPlacement="outside"
          placeholder="you@example.com"
          startContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
          }
          type="email"
        />
        <Input
          label="Price"
          labelPlacement="outside"
          placeholder="0.00"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          type="number"
        />
        <Input
          label="Website"
          labelPlacement="outside"
          placeholder="heroui.com"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
          type="url"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
          }
          label="Email"
          labelPlacement="outside"
          placeholder="you@example.com"
          type="email"
        />
        <Input
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          label="Price"
          labelPlacement="outside"
          placeholder="0.00"
          type="number"
        />
        <Input
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">.org/</span>
            </div>
          }
          label="Website"
          labelPlacement="outside"
          placeholder="heroui"
          type="url"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">@gmail.com</span>
            </div>
          }
          label="Email"
          labelPlacement="outside"
          placeholder="heroui"
          startContent={
            <MailIcon className="text-xl text-default-400 pointer-events-none shrink-0" />
          }
        />
        <Input
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="currency">
                Currency
              </label>
              <select
                className="outline-hidden border-0 bg-transparent text-default-400 text-small"
                id="currency"
                name="currency"
              >
                <option>USD</option>
                <option>ARS</option>
                <option>EUR</option>
              </select>
            </div>
          }
          label="Price"
          labelPlacement="outside"
          placeholder="0.00"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          type="number"
        />
        <Input
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">.org</span>
            </div>
          }
          label="Website"
          labelPlacement="outside"
          placeholder="heroui"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
          type="url"
        />
      </div>
    </div>
  );
}
