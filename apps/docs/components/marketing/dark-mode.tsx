"use client";

/* eslint-disable react/display-name */
import {Code, Button, Tooltip} from "@heroui/react";
import {useState} from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";

import {MusicPlayer} from "@/components/demos";
import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {ThemeSwitch} from "@/components/theme-switch";
import {CodeWindow} from "@/components/code-window";
import landingContent from "@/content/landing";
import {GradientBox} from "@/components";
import {InfoBoldIcon} from "@/components/icons";

const DemoCodeModal = dynamic(() => import("../demo-code-modal").then((mod) => mod.DemoCodeModal), {
  ssr: false,
});

export const DarkMode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={sectionWrapper({class: "mt-16 lg:mt-44"})}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({size: "lg"})}>Dark mode</h1>
            <div>
              <h1 className={title({size: "lg"})}>is&nbsp;</h1>
              <h1 className={title({color: "yellow", size: "lg"})}>effortless.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            HeroUI comes with a fully well-scaled default dark theme that you can apply to your
            application with just adding the <Code>dark</Code> attribute to your <Code>html</Code>.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center gap-6">
            <GradientBox isCentered className="py-14 px-4 lg:px-8" color="orange" to="top-right">
              <MusicPlayer />
              <div className="flex absolute top-2 right-2">
                <Tooltip className="text-xs px-2" content="Show code" placement="top">
                  <Button
                    isIconOnly
                    aria-label="Show code"
                    className="text-white/70 dark:text-black/70 data-hover:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onPress={() => setIsModalOpen(true)}
                  >
                    <InfoBoldIcon className="rotate-180" size={22} />
                  </Button>
                </Tooltip>
                <ThemeSwitch
                  classNames={{
                    base: "mt-1 bg-transparent rounded-xl",
                    wrapper: "text-white/70! dark:text-black/70!",
                  }}
                />
              </div>
            </GradientBox>
          </div>
          <CodeWindow
            showWindowIcons
            className="min-h-[340px] h-auto"
            highlightLines="7-9"
            language="jsx"
            title="_app.tsx"
            value={landingContent.darkModeCode}
          />
        </div>
        <div className="flex w-1/2 justify-start">
          <Button
            aria-label="Learn more about dark mode"
            as={NextLink}
            className="max-w-fit"
            color="warning"
            href="/docs/customization/dark-mode"
            radius="full"
            size="sm"
            variant="flat"
          >
            Learn more
          </Button>
        </div>
      </div>

      <DemoCodeModal
        code={landingContent.darkModeExampleCode}
        isOpen={isModalOpen}
        subtitle="A simple music player component built using components from HeroUI."
        title="MusicPlayer"
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
