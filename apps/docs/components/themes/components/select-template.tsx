import {cn, Select, SelectItem} from "@heroui/react";

import {templates} from "../templates";
import {Template, TemplateType} from "../types";

import Swatch from "./configuration/swatch";

import {MirrorLeft} from "@/components/icons";

interface SelectTemplateProps {
  name: TemplateType | null;
  onChange: (template: Template) => void;
  currentTheme: string | undefined;
}

export function SelectTemplate({name, onChange, currentTheme}: SelectTemplateProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as TemplateType;
    const template = templates.find((template) => template.name === value);

    if (template) {
      onChange(template);
    }
  }

  return (
    <>
      <div className="text-[#71717A] dark:text-[#A1A1AA] text-md leading-7 font-medium flex gap-1.5 items-center">
        <MirrorLeft className="w-4 h-4 fill-current" />
        <div>Prebuilt Themes</div>
      </div>
      <Select
        className="my-3"
        classNames={{
          trigger: "bg-default-200",
          popoverContent: "bg-white dark:bg-[#18181B]",
        }}
        placeholder="Select a theme"
        selectedKeys={name === null ? [] : [name]}
        onChange={handleChange}
      >
        {templates.map((template, index) => (
          <SelectItem
            key={template.name}
            className={cn(
              "data-[hover=true]:transition-none dark:data-[hover=true]:bg-[#26262A] dark:text-white dark:data-[hover=true]:text-white dark:data-[selectable=true]:focus:bg-[#26262A] dark:data-[selectable=true]:focus:text-white",
              "data-[hover=true]:bg-white text-black data-[hover=true]:text-black data-[selectable=true]:focus:bg-[#F4F4F5] data-[selectable=true]:focus:text-black",
            )}
            startContent={
              <div className="border border-black/5 dark:border-white/5">
                <Swatch
                  colors={
                    currentTheme === "dark"
                      ? {
                          background: template.value.dark.layoutColor.background,
                          ...template.value.dark.baseColor,
                        }
                      : {
                          background: template.value.light.layoutColor.background,
                          ...template.value.light.baseColor,
                        }
                  }
                />
              </div>
            }
            // @ts-ignore
            value={index}
          >
            {template.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
