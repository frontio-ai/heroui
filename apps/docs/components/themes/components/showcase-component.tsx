import {cn, Divider} from "@heroui/react";
import Link from "next/link";
import {Inter, Roboto, Outfit, Lora} from "next/font/google";
import get from "lodash/get";
import {useTheme} from "next-themes";
import {readableColor} from "color2k";

import {useThemeBuilder} from "../provider";
import {FontName, TemplateType} from "../types";

interface ShowcaseComponentProps {
  children: React.ReactElement | React.ReactElement[];
  id?: string;
  name: string;
}

const inter = Inter({subsets: ["latin"], weight: ["400", "700"]});
const roboto = Roboto({subsets: ["latin"], weight: ["400", "700"]});
const outfit = Outfit({subsets: ["latin"], weight: ["400", "700"]});
const lora = Lora({subsets: ["latin"], weight: ["400", "700"]});

const FONT_CONFIGS: Record<FontName, {className: string}> = {
  Inter: {className: inter.className},
  Roboto: {className: roboto.className},
  Outfit: {className: outfit.className},
  Lora: {className: lora.className},
};

const getFontClass = (templateTheme: TemplateType) => {
  if (templateTheme === "elegant") {
    return "font-mono";
  }

  return FONT_CONFIGS["Inter"]?.className || "";
};

export function ShowcaseComponent({children, id, name}: ShowcaseComponentProps) {
  const {font, templateTheme, config} = useThemeBuilder();
  const fontClass = font ? FONT_CONFIGS[font]?.className || "" : getFontClass(templateTheme);
  const {theme} = useTheme();

  const defaultColor = get(config, `${theme}.layoutColor.background`);

  return (
    <div
      className={cn("bg-background text-foreground py-6 p-4 rounded-lg group", fontClass)}
      id={id}
    >
      <div className="flex items-center gap-x-4">
        <span
          className="text-xl font-medium"
          style={{
            color: readableColor(defaultColor!),
          }}
        >
          {name}
        </span>
        <Link
          className="text-sm text-blue-400 hover:text-blue-500 dark:text-blue-500 hover:dark:text-blue-600 opacity-0 group-hover:opacity-100 transition-[opacity,color] duration-100 group-hover:flex items-center py-2"
          href={`/docs/components/${name.toLowerCase()}`}
        >
          View in docs
        </Link>
      </div>
      <Divider className="mt-4 mb-6" />
      <div className="flex flex-wrap gap-6 mt-8">{children}</div>
    </div>
  );
}
