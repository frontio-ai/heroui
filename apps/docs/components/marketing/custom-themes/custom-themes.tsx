"use client";

/* eslint-disable react/display-name */
import {useMemo, useState} from "react";
import {Tabs, Tab, Card, CardBody, Image, Button, RadioGroup, Radio} from "@heroui/react";
import NextLink from "next/link";
import NextImage from "next/image";

import {shopCartStyles} from "./styles";

import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {PaletteIcon, MagicIcon, GamingConsoleIcon, StarIcon} from "@/components/icons";
import {HeroUILogo, CodeWindow} from "@/components";
import landingContent from "@/content/landing";
import {useIsMobile} from "@/hooks/use-media-query";

const themesTabs = (isMobile: boolean) => [
  {
    id: "heroui",
    title: () => (
      <p className="group-data-[selected=true]:text-foreground group-data-[selected=true]:font-medium">
        HeroUI
      </p>
    ),
    icon: () => (
      <HeroUILogo
        outlined
        className="text-default-400 group-data-[selected=true]:text-foreground"
        size={isMobile ? 34 : 44}
      />
    ),
  },
  {
    id: "modern",
    title: () => (
      <p className="group-data-[selected=true]:text-secondary group-data-[selected=true]:font-medium">
        Modern
      </p>
    ),
    icon: () => (
      <PaletteIcon
        className="group-data-[selected=true]:text-secondary"
        size={isMobile ? 34 : 44}
      />
    ),
  },
  {
    id: "elegant",
    title: () => (
      <p className="group-data-[selected=true]:text-foreground group-data-[selected=true]:font-medium">
        Elegant
      </p>
    ),
    icon: () => <MagicIcon size={isMobile ? 34 : 44} />,
  },
  {
    id: "retro",
    title: () => (
      <p className="group-data-[selected=true]:text-warning group-data-[selected=true]:font-medium">
        Retro
      </p>
    ),
    icon: () => (
      <GamingConsoleIcon
        className="group-data-[selected=true]:text-warning"
        size={isMobile ? 34 : 44}
      />
    ),
  },
];

type Theme = "heroui" | "modern" | "elegant" | "retro";
type Tab = {id: string; title: () => JSX.Element; icon: () => JSX.Element};

const itemSizes = ["xs", "s", "m", "l", "xl"];

const codeHighlights = {
  heroui: "6-19",
  modern: "26-39",
  elegant: "46-59",
  retro: "66-84",
};

const CustomThemesExample = ({
  tabs,
  selectedTheme,
  onChangeTheme,
}: {
  tabs: Tab[];
  selectedTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}) => {
  const [liked, setLiked] = useState(false);

  const slots = useMemo(
    () =>
      shopCartStyles({
        theme: selectedTheme as Theme,
      }),
    [selectedTheme],
  );

  const onSelectionChange = (value: React.Key) => {
    onChangeTheme(value as Theme);
  };

  return (
    <div className="flex flex-col gap-6 ">
      <Tabs
        disableAnimation
        disableCursorAnimation
        aria-label="Custom themes tabs"
        classNames={{
          base: "w-full",
          tab: "px-0 w-fit h-auto data-[selected=true]:bg-transparent",
          tabList: "w-full justify-start gap-8",
          tabContent: "text-default-400 text-base",
        }}
        items={tabs}
        variant="light"
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <Tab
            key={item.id}
            title={
              <div className="flex flex-col justify-center items-center gap-2">
                {item.icon()}
                {item.title()}
              </div>
            }
          />
        )}
      </Tabs>
      <Card className={slots.wrapper()} radius="lg">
        <CardBody className="relative flex-col md:flex-row md:items-center gap-4 md:gap-9 overflow-visible">
          <div className={slots.imageWrapper()}>
            <Image
              fill
              removeWrapper
              alt="Shoes theme example"
              as={NextImage}
              className={slots.img()}
              sizes="100vw"
              src="/images/shoes-1.png"
            />
          </div>
          <div className={slots.contentWrapper()}>
            <div className="relative flex flex-wrap items-baseline">
              <h1 className={slots.title()}>Nike Adapt BB 2.0</h1>
              <p className={slots.description()}>Consistent, customized fit, game-changing.</p>
              <p className={slots.price()}>$279.97</p>
              <p className={slots.previousPrice()}>$350</p>
              <p className={slots.percentOff()}>20% off</p>
            </div>
            <RadioGroup
              aria-label="select size"
              classNames={{
                base: "my-4",
              }}
              defaultValue="xs"
              orientation="horizontal"
            >
              {itemSizes.map((itemSize) => (
                <Radio
                  key={itemSize}
                  classNames={{
                    wrapper: "hidden",
                    labelWrapper: slots.sizeOption(),
                    label: slots.sizeOptionLabel(),
                  }}
                  value={itemSize}
                >
                  {itemSize.toUpperCase()}
                </Radio>
              ))}
            </RadioGroup>
            <div className="flex space-x-4">
              <Button
                className={slots.buyButton()}
                color="primary"
                variant={selectedTheme === "heroui" ? "shadow" : "solid"}
              >
                Buy now
              </Button>
              <Button
                className={slots.addToBagButton()}
                color="primary"
                radius="full"
                variant="bordered"
              >
                Add to bag
              </Button>
            </div>
          </div>
          <Button
            isIconOnly
            aria-label="like"
            className={slots.starButton()}
            data-liked={liked}
            radius="full"
            variant="light"
            onPress={() => setLiked((v) => !v)}
          >
            <StarIcon fill={liked ? "currentColor" : "none"} size={20} />
          </Button>
        </CardBody>
      </Card>
      <Button
        aria-label="Learn more about theme customization"
        as={NextLink}
        className={slots.learnMoreButton()}
        color="primary"
        href="/docs/customization/customize-theme"
        radius="full"
        size="sm"
        variant="flat"
      >
        Learn more
      </Button>
    </div>
  );
};

export const CustomThemes = () => {
  const isMobile = useIsMobile();

  const tabs = themesTabs(isMobile);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(tabs[0].id as Theme);

  return (
    <section className={sectionWrapper({class: "mt-24 lg:mt-56"})}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({size: "lg"})}>Apply your own</h1>
            <div>
              <h1 className={title({color: "blue", size: "lg"})}>theming&nbsp;</h1>
              <h1 className={title({size: "lg"})}>decisions.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            HeroUI provides a custom TailwindCSS plugin that allows you to customize the default
            themes or create your own.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CustomThemesExample
            selectedTheme={selectedTheme}
            tabs={tabs}
            onChangeTheme={setSelectedTheme}
          />
          <CodeWindow
            showWindowIcons
            className="max-h-[440px] min-h-[390px]"
            highlightLines={codeHighlights[selectedTheme]}
            isScrollable={false}
            language="jsx"
            title="tailwind.config.js"
            value={landingContent.themingCode}
          />
        </div>
      </div>
      <div className="h-full dark:md:block absolute hidden -bottom-[10%] -left-[15%] -z-1">
        <Image
          removeWrapper
          alt="custom themes background"
          className="h-full"
          src="/gradients/blue-purple-1.svg"
        />
      </div>
    </section>
  );
};
