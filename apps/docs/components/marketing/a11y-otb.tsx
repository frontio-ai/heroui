"use client";

/* eslint-disable react/display-name */
import {
  Button,
  Image,
  Link as HeroUILink,
  Dropdown,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@heroui/react";
import {useInView} from "@heroui/motion";
import {clsx} from "@heroui/shared-utils";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@heroui/shared-icons";
import Link from "next/link";
import dynamic from "next/dynamic";
import {Fragment, useEffect, useRef, useState} from "react";

import {FeaturesGrid} from "./features-grid";

import landingContent from "@/content/landing";
import {GradientBox} from "@/components";
import {
  KeyboardBoldIcon,
  MouseCircleBoldIcon,
  SquaresBoldIcon,
  FatrowsBoldIcon,
  EyeBoldIcon,
  KeyboardOpenBoldIcon,
  InfoBoldIcon,
} from "@/components/icons";
import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {useIsMobile} from "@/hooks/use-media-query";

const DemoCodeModal = dynamic(() => import("../demo-code-modal").then((mod) => mod.DemoCodeModal), {
  ssr: false,
});

const a11yItems = [
  {
    title: "Keyboard navigation",
    icon: <KeyboardBoldIcon />,
  },
  {
    title: "Managed focus",
    icon: <MouseCircleBoldIcon />,
  },
  {
    title: "Collision aware",
    icon: <SquaresBoldIcon />,
  },
  {
    title: "Alignment control",
    icon: <FatrowsBoldIcon />,
  },
  {
    title: "Screen reader support",
    icon: <EyeBoldIcon />,
  },
  {
    title: "Typehead support",
    icon: <KeyboardOpenBoldIcon />,
  },
];

const iconClasses = "text-2xl text-default-500 pointer-events-none flex-shrink-0";

export const A11yOtb = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ref = useRef<any>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const isMobile = useIsMobile();

  const isInView = useInView(ref, {
    margin: isMobile ? "0px" : "-300px",
  });

  useEffect(() => {
    setIsDropdownOpen(!isMobile && isInView);
  }, [isMobile, isInView]);

  return (
    <section className={sectionWrapper({class: "z-20 mt-16 lg:mt-44"})}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({size: "lg"})}>Accessibility</h1>
            <div>
              <h1 className={title({color: "green", size: "lg"})}>out of the&nbsp;</h1>
              <h1 className={title({size: "lg"})}>box.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            HeroUI components are built on top of&nbsp;
            <HeroUILink
              isExternal
              className="text-xl text-default-500 font-light [&>svg]:ml-1"
              href="https://react-spectrum.adobe.com/react-aria/"
              underline="always"
            >
              React Aria
            </HeroUILink>
            &nbsp;ensuring exceptional accessibility support as a top priority.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col mt-8 lg:mt-16 gap-6">
            <FeaturesGrid
              classNames={{
                base: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4",
                header: "pb-3",
                card: "bg-white dark:bg-default-400/10",
                iconWrapper: "bg-default-100 dark:bg-transparent text-default-500/50",
              }}
              features={a11yItems}
            />
            <Button
              aria-label="Learn more about accessibility"
              as={Link}
              className="max-w-fit"
              color="success"
              href="/docs/customization/customize-theme"
              radius="full"
              size="sm"
              variant="flat"
            >
              Learn more
            </Button>
          </div>
          <GradientBox
            ref={ref}
            className="h-full min-h-[200px] lg:min-h-[390px] max-h-[300px] lg:pt-8 items-center lg:items-start justify-center"
            color="green"
            to="right"
          >
            <Tooltip className="text-xs px-2" content="Show code" placement="top">
              <Button
                isIconOnly
                aria-label="Show code"
                className="absolute top-1 right-1 text-success-50 data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={() => setIsModalOpen(true)}
              >
                <InfoBoldIcon className="rotate-180" />
              </Button>
            </Tooltip>
            <Button
              ref={triggerRef}
              className="bg-success-50"
              color="success"
              variant="flat"
              onPress={() => setIsDropdownOpen((prevOpenState) => !prevOpenState)}
            >
              {isMobile ? "Click me" : "Actions"}
            </Button>
            {ref.current && (
              <Dropdown
                className="shadow-xl"
                closeOnSelect={true}
                isDismissable={false}
                isOpen={isDropdownOpen}
                placement="bottom"
                portalContainer={ref.current}
                shouldBlockScroll={false}
                shouldFlip={isMobile}
                triggerRef={triggerRef}
              >
                <Fragment />
                <DropdownMenu
                  aria-label="Actions"
                  closeOnSelect={true}
                  color="default"
                  variant="flat"
                >
                  <DropdownSection showDivider title="Actions">
                    <DropdownItem
                      key="new"
                      description="Create a new file"
                      shortcut="⌘N"
                      startContent={<AddNoteBulkIcon className={iconClasses} />}
                    >
                      New file
                    </DropdownItem>
                    <DropdownItem
                      key="copy"
                      description="Copy the file link"
                      shortcut="⌘C"
                      startContent={<CopyDocumentBulkIcon className={iconClasses} />}
                    >
                      Copy link
                    </DropdownItem>
                    <DropdownItem
                      key="edit"
                      description="Allows you to edit the file"
                      shortcut="⌘⇧E"
                      startContent={<EditDocumentBulkIcon className={iconClasses} />}
                    >
                      Edit file
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection title="Danger zone">
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      description="Permanently delete the file"
                      shortcut="⌘⇧D"
                      startContent={
                        <DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />
                      }
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            )}
          </GradientBox>
        </div>
      </div>
      <div className="absolute hidden dark:md:block h-full dark:opacity-70 -bottom-[10%] left-[20%] z-[-10]">
        <Image
          removeWrapper
          alt="a11y background"
          className="h-full z-[-10]"
          src="/gradients/green.svg"
        />
      </div>

      <DemoCodeModal
        code={landingContent.a11yExampleCode}
        isOpen={isModalOpen}
        title="Dropdown"
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
