"use client";

import {useRef, useState, FC, ReactNode, Key, useMemo, useCallback} from "react";
import {
  link,
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Link,
  Button,
  Kbd,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Chip,
  Divider,
} from "@heroui/react";
import {dataFocusVisibleClasses} from "@heroui/theme";
import {ChevronDownIcon, LinkIcon} from "@heroui/shared-icons";
import {isAppleDevice} from "@react-aria/utils";
import {clsx} from "@heroui/shared-utils";
import NextLink from "next/link";
import {usePathname} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect} from "react";
import {usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {usePostHog} from "posthog-js/react";

import {FbRoadmapLink} from "./featurebase/fb-roadmap-link";

import {currentVersion} from "@/utils/version";
import {siteConfig} from "@/config/site";
import {Route} from "@/libs/docs/page";
import {LargeLogo, SmallLogo, ThemeSwitch} from "@/components";
import {GithubIcon, SearchLinearIcon} from "@/components/icons";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {DocsSidebar} from "@/components/docs/sidebar";
import {useCmdkStore} from "@/components/cmdk";
import githubInfo from "@/config/github-info.json";

export interface NavbarProps {
  routes: Route[];
  mobileRoutes?: Route[];
  tag?: string;
  slug?: string;
  children?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({children, routes, mobileRoutes = [], slug, tag}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");

  const ref = useRef<HTMLElement>(null);
  const isMounted = useIsMounted();

  const pathname = usePathname();

  const cmdkStore = useCmdkStore();

  const posthog = usePostHog();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const handleOpenCmdk = () => {
    cmdkStore.onOpen();
    posthog.capture("Navbar - Search", {
      name: "navbar - search",
      action: "press",
      category: "cmdk",
    });
  };

  const {pressProps} = usePress({
    onPress: handleOpenCmdk,
  });
  const {focusProps, isFocusVisible} = useFocusRing();

  const docsPaths = [
    "/docs/guide/introduction",
    "/docs/guide/installation",
    "/docs/guide/upgrade-to-v2",
  ];

  const navLinkClasses = clsx(
    link({color: "foreground"}),
    "data-[active=true]:text-primary data-[active=true]:font-semibold",
  );

  const handleVersionChange = useCallback((key: Key) => {
    if (key === "v1") {
      const newWindow = window.open("https://v1.heroui.com", "_blank", "noopener,noreferrer");

      if (newWindow) newWindow.opener = null;
    }
  }, []);

  const handlePressNavbarItem = useCallback(
    (name: string, url: string) => {
      posthog.capture("NavbarItem", {
        name,
        action: "press",
        category: "navbar",
        data: url,
      });
    },
    [posthog],
  );

  const searchButton = (
    <Button
      aria-label="Quick search"
      className="border-1 px-3 border-default-200 rounded-full text-small font-normal text-default-500 bg-transparent"
      endContent={
        <Kbd
          className="hidden text-xs rounded-full py-0.5 px-1.5 lg:inline-block"
          keys={commandKey}
        >
          K
        </Kbd>
      }
      startContent={
        <SearchLinearIcon
          className="text-base text-default-400 pointer-events-none flex-shrink-0"
          size={16}
          strokeWidth={2}
        />
      }
      variant="bordered"
      onPress={handleOpenCmdk}
    >
      Search
    </Button>
  );

  const versionDropdown = useMemo(() => {
    return ref.current ? (
      <Dropdown placement="bottom-start" portalContainer={ref.current}>
        <AnimatePresence>
          {isMounted && (
            <motion.div animate={{opacity: 1}} exit={{opacity: 0}} initial={{opacity: 0}}>
              <DropdownTrigger>
                <Button
                  className="min-w-[74px] max-w-[74px] hidden font-medium text-default-500 text-xs h-6 w-[74px] py-1 min-w-fit sm:flex gap-0.5 bg-default-400/20 dark:bg-default-500/20"
                  endContent={<ChevronDownIcon className="text-tiny" />}
                  radius="full"
                  size="sm"
                  variant="flat"
                >
                  v{currentVersion}
                </Button>
              </DropdownTrigger>
            </motion.div>
          )}
        </AnimatePresence>
        <DropdownMenu
          aria-label="HeroUI versions"
          defaultSelectedKeys={["v2"]}
          selectionMode="single"
          onAction={handleVersionChange}
        >
          <DropdownItem key="v2">v{currentVersion}</DropdownItem>
          <DropdownItem key="v1" endContent={<LinkIcon />}>
            v1.0.0
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ) : (
      <div className="w-[74px]" />
    );
  }, [ref.current, isMounted]);

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    <HeroUINavbar
      ref={ref}
      className={clsx({
        "z-[100001]": isMenuOpen,
      })}
      classNames={{
        base: "bg-white/[.90] dark:bg-black/[.65]",
        wrapper: "max-w-8xl",
      }}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-x-3 max-w-fit">
          <NextLink
            aria-label="Home"
            className="flex justify-start items-center gap-2 tap-highlight-transparent transition-opacity active:opacity-50"
            href="/"
            onClick={() => handlePressNavbarItem("Home", "/")}
          >
            <SmallLogo className="w-6 h-6 md:hidden" />
            <LargeLogo className="h-5 md:h-6" />
          </NextLink>
          {versionDropdown}
          <Chip
            as={NextLink}
            className="hidden sm:flex bg-default-200/50 border-1 hover:bg-default-200/80 border-default-400/50 cursor-pointer"
            classNames={{
              content: "font-semibold text-foreground text-xs ",
            }}
            color="primary"
            href="/blog/introducing-heroui"
            variant="flat"
            onClick={() => handlePressNavbarItem("Introducing HeroUI", "/blog/introducing-heroui")}
          >
            Introducing HeroUI&nbsp;
            <span aria-label="emoji" role="img">
              🔥
            </span>
          </Chip>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex w-full gap-2 sm:hidden " justify="end">
        <NavbarItem className="flex h-full items-center">
          <Link
            isExternal
            aria-label="Github"
            className="p-1"
            href={siteConfig.links.github}
            onPress={() => handlePressNavbarItem("Github", siteConfig.links.github)}
          >
            <GithubIcon className="text-default-600 dark:text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <ThemeSwitch
            classNames={{
              wrapper: "!text-default-500 dark:!text-default-500",
            }}
          />
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <button
            className={clsx(
              "transition-opacity p-1 hover:opacity-80 rounded-full cursor-pointer outline-none",
              // focus ring
              ...dataFocusVisibleClasses,
            )}
            data-focus-visible={isFocusVisible}
            {...focusProps}
            {...pressProps}
          >
            <SearchLinearIcon className="mt-px text-default-600 dark:text-default-500" size={20} />
          </button>
        </NavbarItem>
        <NavbarItem className="w-10 h-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-full h-full pt-1"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <ul className="hidden lg:flex gap-4 pr-2 justify-start items-center [&>li>a]:text-sm [&>li>a]:font-medium">
          <NavbarItem>
            <NextLink
              className={navLinkClasses}
              color="foreground"
              data-active={docsPaths.includes(pathname)}
              href="/docs/guide/introduction"
              onClick={() => handlePressNavbarItem("Docs", "/docs/guide/introduction")}
            >
              Docs
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={navLinkClasses}
              color="foreground"
              data-active={pathname.includes("components")}
              href="/docs/components/accordion"
              onClick={() => handlePressNavbarItem("Components", "/docs/components/accordion")}
            >
              Components
            </NextLink>
          </NavbarItem>
          {/* 
          // TODO: add playground
          <NavbarItem>
            <NextLink
              className={navLinkClasses}
              color="foreground"
              data-active={pathname.includes("playground")}
              href="/playground"
              onClick={() => handlePressNavbarItem("playground", "/playground")}
            >
              Playground
            </NextLink>
          </NavbarItem> */}
          <NavbarItem>
            <NextLink
              className={navLinkClasses}
              color="foreground"
              data-active={pathname.includes("/docs/guide/figma")}
              href="/docs/guide/figma"
              onClick={() => handlePressNavbarItem("Figma", "/docs/guide/figma")}
            >
              Figma
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={navLinkClasses}
              color="foreground"
              data-active={pathname.includes("blog")}
              href="/blog"
              onClick={() => handlePressNavbarItem("Blog", "/blog")}
            >
              Blog
            </NextLink>
          </NavbarItem>

          <NavbarItem>
            <NextLink
              className={navLinkClasses}
              color="foreground"
              data-active={pathname.includes("themes")}
              href="/themes"
              onClick={() => handlePressNavbarItem("Themes", "/themes")}
            >
              Theme
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <FbRoadmapLink className={navLinkClasses} />
          </NavbarItem>
        </ul>
        <Divider className="h-7 hidden lg:flex" orientation="vertical" />
        <NavbarItem className="hidden sm:flex gap-2">
          {searchButton}
          <Link
            isExternal
            aria-label="Github"
            className="flex gap-0.5 items-center h-10 px-2 border-1 border-default-200 rounded-full text-default-600 dark:text-default-500"
            href={siteConfig.links.github}
            onPress={() => handlePressNavbarItem("Github", siteConfig.links.github)}
          >
            <GithubIcon />
            <span className="text-xs font-medium">{githubInfo.stars.formatted}</span>
          </Link>
          <ThemeSwitch
            className="border-1 border-default-200 rounded-full h-full min-w-10 min-h-10 flex items-center justify-center"
            classNames={{
              wrapper: "!text-default-400 dark:!text-default-500",
            }}
          />
        </NavbarItem>
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="group text-sm font-normal text-default-600 bg-default-400/20 dark:bg-default-500/20"
            href={siteConfig.links.sponsor}
            startContent={
              <HeartFilledIcon className="text-danger group-data-[hover=true]:animate-heartbeat" />
            }
            variant="flat"
            onPress={() => handlePressNavbarItem("Sponsor", siteConfig.links.sponsor)}
          >
            Sponsor
          </Button>
        </NavbarItem> */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hidden sm:flex lg:hidden ml-4"
        />
      </NavbarContent>

      <NavbarMenu>
        <DocsSidebar
          className="mt-4 pt-8"
          routes={[...mobileRoutes, ...routes]}
          slug={slug}
          tag={tag}
        />
        {children}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
