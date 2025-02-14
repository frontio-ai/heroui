import {clsx} from "@heroui/shared-utils";

interface ConfigurationSectionProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  icon?: React.ReactNode;
}

export function ConfigSection({children, id, title, icon}: ConfigurationSectionProps) {
  return (
    <div id={id}>
      <div className="text-[#71717A] dark:text-[#A1A1AA] text-md font-medium leading-7 flex gap-1.5 items-center">
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      <div className={clsx("flex flex-wrap gap-2 mt-3")}>{children}</div>
    </div>
  );
}
