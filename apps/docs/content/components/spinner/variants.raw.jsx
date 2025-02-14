import {Spinner} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <Spinner classNames={{label: "text-primary-400 mt-4"}} label="default" variant="default" />
      <Spinner classNames={{label: "text-primary-400 mt-4"}} label="gradient" variant="gradient" />
      <Spinner classNames={{label: "text-primary-400 mt-4"}} label="spinner" variant="spinner" />
      <Spinner classNames={{label: "text-primary-400 mt-4"}} label="wave" variant="wave" />
      <Spinner classNames={{label: "text-primary-400 mt-4"}} label="dots" variant="dots" />
    </div>
  );
}
