import {Disclosure} from "@heroui/disclosure";

const MonitorMobileIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M10 16.95H6.21C2.84 16.95 2 16.11 2 12.74V6.74003C2 3.37003 2.84 2.53003 6.21 2.53003H16.74C20.11 2.53003 20.95 3.37003 20.95 6.74003"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 21.4699V16.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M2 12.95H10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M6.73999 21.47H9.99999"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M22 12.8V18.51C22 20.88 21.41 21.47 19.04 21.47H15.49C13.12 21.47 12.53 20.88 12.53 18.51V12.8C12.53 10.43 13.12 9.83997 15.49 9.83997H19.04C21.41 9.83997 22 10.43 22 12.8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.2445 18.25H17.2535"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function App() {
  const classNames = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Disclosure
      aria-label="Connected devices"
      classNames={classNames}
      id="1"
      startContent={<MonitorMobileIcon className="text-primary" />}
      subtitle={
        <p className="flex">
          2 issues to <span className="text-primary ml-1">fix now</span>
        </p>
      }
      title="Connected devices"
    >
      {defaultContent}
    </Disclosure>
  );
}
