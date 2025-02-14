import {useEffect, useState, useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  CardFooter,
  Link,
  ScrollShadow,
  Drawer,
  DrawerContent,
} from "@heroui/react";
import {useTheme} from "next-themes";
import {useLocalStorage} from "usehooks-ts";
import {Icon} from "@iconify/react/dist/offline";
import LinkSquareIcon from "@iconify/icons-solar/link-square-linear";
import {ArrowLeftIcon, ChevronIcon, ChevronUpIcon, CloseIcon} from "@heroui/shared-icons";
import {clsx} from "@heroui/shared-utils";

import {useThemeBuilder} from "../../provider";
import {Config, Template, ThemeType} from "../../types";
import {configKey, syncThemesKey, initialConfig} from "../../constants";
import {SelectTemplate} from "../select-template";
import {generatePluginConfig} from "../../utils/config";
import {setAllCssVars} from "../../css-vars";
import {templates} from "../../templates";

import {BaseColors} from "./base-colors";
import {ContentColors} from "./content-colors";
import {LayoutColors} from "./layout-colors";
import {Radiuses} from "./radiuses";
import {DefaultColors} from "./default-colors";
import {DisableOpacity} from "./disable-opacity";
import Swatch from "./swatch";
import {Fonts} from "./fonts";
import {Scaling} from "./scaling";
import {BorderWidths} from "./border-widths";

import usePrevious from "@/hooks/use-previous";
import {Filters, RotateLeftLinearIcon} from "@/components/icons";
import {ThemeSwitch} from "@/components/theme-switch";
import {Crop, CropMinimalistic} from "@/components/icons/crop";
import {RadialBlur} from "@/components/icons/radial-blur";
import {Scaling as ScalingIcon} from "@/components/icons/scaling";

export default function Configuration() {
  const {
    config,
    resetConfig,
    setConfiguration,
    templateTheme,
    setTemplateTheme,
    setRadiusValue,
    setBorderWidthValue,
  } = useThemeBuilder();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const themeProps = useTheme();
  const theme = themeProps.theme as ThemeType;
  const prevTheme = usePrevious(theme);
  const [, setLsConfig] = useLocalStorage<Config>(configKey, initialConfig);
  const [syncThemes] = useLocalStorage<boolean>(syncThemesKey, true);
  const syncIcon = syncThemes ? <Icon className="flex-shrink-0" icon={LinkSquareIcon} /> : null;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<
    "none" | "color" | "radius" | "font" | "opacity" | "scaling" | "borderWidths"
  >("none");
  const {theme: currentTheme} = useTheme();

  /**
   * Update the CSS variables and the configuration when the theme changes.
   */
  useEffect(() => {
    // Set the CSS variables when the theme changes
    if (prevTheme !== theme) {
      setAllCssVars(config, theme);
    }

    // Set the configuration in the local storage when the theme changes
    if (prevTheme === theme) {
      setLsConfig(config);
    }
  }, [config, theme, prevTheme]);

  useEffect(() => {
    return () => {
      const template = templates[0];

      setConfiguration(template.value, theme, syncThemes);
      setAllCssVars(template.value, theme);
      setSelectedTemplate(template);
      setTemplateTheme(template.name);
    };
  }, []);

  useEffect(() => {
    setRadiusValue(templateTheme === "elegant" ? "none" : "md");
    setBorderWidthValue(templateTheme === "elegant" ? "thin" : "medium");
  }, [templateTheme]);

  /**
   * Reset the theme to the default one.
   */
  function handleResetTheme() {
    if (selectedTemplate) {
      setConfiguration(selectedTemplate.value, theme, syncThemes);
      setAllCssVars(selectedTemplate.value, theme);
    } else {
      const config = resetConfig(theme, syncThemes);

      setAllCssVars(config, theme);
    }
    setLsConfig(config);
  }

  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(generatePluginConfig(config), null, 2));
  }

  const DesktopView = useMemo(() => {
    return (
      <Card className="h-auto w-[350px] hidden md:block md:fixed right-3 top-28 z-30 mx-auto m-3">
        <CardHeader className="flex justify-between p-4 pb-3">
          <div className="flex gap-x-4 items-center">
            <div className="text-xl font-medium leading-8 text-default-800 ">Theme</div>
            <Button
              className="text-tiny h-9 bg-default-200 flex items-center"
              size="sm"
              onPress={handleResetTheme}
            >
              Reset
              <RotateLeftLinearIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-9">
            <ThemeSwitch classNames={{wrapper: "dark:!text-default-500"}} />
          </div>
        </CardHeader>
        <Divider className="bg-default-200" />
        <CardBody className="flex flex-col p-4 px-6 h-[60vh] overflow-y-scroll scrollbar-hide">
          <ScrollShadow className="pt-1 pb-6 scrollbar-hide" orientation="vertical">
            <SelectTemplate
              currentTheme={currentTheme}
              name={selectedTemplate?.name ?? templateTheme}
              onChange={(template) => {
                setConfiguration(template.value, theme, syncThemes);
                setAllCssVars(template.value, theme);
                setSelectedTemplate(template);
                setTemplateTheme(template.name);
              }}
            />

            <div className="flex flex-col gap-6 mt-6">
              <DefaultColors config={config} theme={theme} />
              <BaseColors
                config={config}
                syncIcon={syncIcon}
                syncThemes={syncThemes}
                theme={theme}
              />
              <ContentColors config={config} theme={theme} />
              <LayoutColors config={config} syncThemes={syncThemes} theme={theme} />
              <Fonts />
              <Radiuses />
              <BorderWidths />
              <Scaling />
              <DisableOpacity config={config} />
            </div>
          </ScrollShadow>
        </CardBody>
        <Divider className="bg-default-200" />
        <CardFooter className="flex flex-col h-auto">
          <Button fullWidth className="text-white" color="primary" onPress={handleCopy}>
            Copy Theme
          </Button>
          <div className="text-tiny mt-2 text-default-600">
            Learn how to setup your theme{" "}
            <Link
              className="text-default-800 text-tiny underline cursor-pointer"
              href="/docs/customization/theme"
            >
              here
            </Link>
          </div>
        </CardFooter>
      </Card>
    );
  }, [
    config,
    handleCopy,
    handleResetTheme,
    selectedTemplate,
    syncIcon,
    syncThemes,
    theme,
    templateTheme,
    currentTheme,
  ]);

  const MobileView = useMemo(() => {
    return (
      <div className="md:hidden w-screen fixed bottom-0 right-0 left-0 z-40 dark:bg-[#18181B] bg-[#ffffff] overflow-hidden rounded-t-full shadow-inner">
        <Button
          disableRipple
          isIconOnly
          className="dark:bg-[#18181B] bg-[#d4d4d8] group hover:text-default-600 text-default-400 left-1/2 transform -translate-x-1/2 w-full flex-col"
          onPress={() => {
            setIsDrawerOpen(!isDrawerOpen);
          }}
        >
          <ChevronUpIcon
            className="w-6 h-6 dark:text-white/20 text-black/20 group-hover:text-black/80 group-hover:dark:text-white/80"
            strokeWidth={2}
          />
        </Button>
        <Drawer
          hideCloseButton
          isOpen={isDrawerOpen}
          placement="bottom"
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        >
          <DrawerContent className="backdrop-blur-2xl dark:bg-[#18181B] bg-[#ffffff] max-h-[56rem]">
            <Button
              isIconOnly
              className="group fixed top-0 right-0 dark:bg-white/10 bg-[#d4d4d8] data-[hover=true]:bg-black/30 dark:data-[hover=true]:bg-white/20 z-50 min-w-8 w-8 h-8 rounded-full m-1"
              onPress={() => {
                setIsDrawerOpen(false);
                setSelectedSection("none");
              }}
            >
              <CloseIcon className="h-4 w-4" />
            </Button>
            {selectedSection === "none" && (
              <div className="flex w-full flex-start overflow-x-scroll scrollbar-hide py-6 px-4 h-30 fixed top-5">
                {templates.map((template) => {
                  return (
                    <div key={template.name} className="flex flex-col items-center px-2">
                      <Button
                        className={clsx(
                          "p-0 min-w-0 w-auto h-12 border border-black/5 gap-0",
                          templateTheme === template.name ? "outline-2 outline-foreground-800" : "",
                        )}
                        onPress={() => {
                          setConfiguration(template.value, theme, syncThemes);
                          setAllCssVars(template.value, theme);
                          setSelectedTemplate(template);
                          setTemplateTheme(template.name);
                        }}
                      >
                        <Swatch
                          className="h-full"
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
                          innerClassName="w-4"
                        />
                      </Button>
                      <div className="text-sm dark:text-white/60 text-black/60 my-1">
                        {template.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="overflow-x-scroll scrollbar-hide p-2 px-4 pt-16">
              <ScrollShadow orientation="vertical">
                <div className="flex flex-col items-center gap-y-8">
                  {selectedSection === "none" && (
                    <>
                      <div className="w-full grid grid-cols-4 gap-4 flex-wrap items-center justify-around pt-20">
                        <Button
                          className="col-span-2 h-14 flex items-center justify-center sm:justify-around gap-x-3 dark:bg-[#3f3f46] bg-[#d4d4d8] dark:text-white"
                          onPress={() => {
                            setSelectedSection("color");
                          }}
                        >
                          <Filters className="h-4 w-4 hidden sm:flex" />
                          <span className="mx-2 w-14 text-sm sm:text-base">Colors</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="col-span-2 h-14 flex items-center justify-center sm:justify-around gap-x-3 dark:bg-[#3f3f46] bg-[#d4d4d8] dark:text-white"
                          onPress={() => {
                            setSelectedSection("radius");
                          }}
                        >
                          <Crop className="h-4 w-4 hidden sm:flex" />
                          <span className="mx-2 w-14 text-sm sm:text-base">Radius</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="col-span-2 h-14 text-lg flex items-center justify-center sm:justify-around  gap-x-3 dark:bg-[#3f3f46] bg-[#d4d4d8] dark:text-white"
                          onPress={() => {
                            setSelectedSection("borderWidths");
                          }}
                        >
                          <CropMinimalistic className="h-4 w-4 hidden sm:flex" />
                          <span className="mx-2 w-14 text-sm sm:text-base">Border</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="col-span-2 h-14 text-lg flex items-center justify-center sm:justify-around  gap-x-3 dark:bg-[#3f3f46] bg-[#d4d4d8] dark:text-white"
                          onPress={() => {
                            setSelectedSection("opacity");
                          }}
                        >
                          <RadialBlur className="h-4 w-4 hidden sm:flex" />
                          <span className="mx-2 w-14 text-sm sm:text-base">Opacity</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="col-span-2 h-14 text-lg flex items-center justify-center sm:justify-around  gap-x-3 dark:bg-[#3f3f46] bg-[#d4d4d8] dark:text-white"
                          onPress={() => {
                            setSelectedSection("font");
                          }}
                        >
                          <RadialBlur className="h-4 w-4 hidden sm:flex" />
                          <span className="mx-2 w-14 text-sm sm:text-base">Font</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="col-span-2 h-14 text-lg flex items-center justify-center sm:justify-around gap-x-3 dark:bg-[#3f3f46] bg-[#d4d4d8] dark:text-white"
                          onPress={() => {
                            setSelectedSection("scaling");
                          }}
                        >
                          <ScalingIcon className="h-6 w-6 hidden sm:flex" />
                          <span className="mx-2 w-14 text-sm sm:text-base">Scaling</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                      </div>
                    </>
                  )}
                  {selectedSection === "color" && (
                    <div className="w-full h-auto">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-black/60 dark:text-white/60 dark:data-[hover=true]:bg-white/20 data-[hover=true]:bg-black/10 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                      </Button>
                      <div className="flex flex-col gap-y-4 h-auto p-4">
                        <DefaultColors config={config} theme={theme} />
                        <BaseColors
                          config={config}
                          syncIcon={syncIcon}
                          syncThemes={syncThemes}
                          theme={theme}
                        />
                        <ContentColors config={config} theme={theme} />
                        <LayoutColors config={config} syncThemes={syncThemes} theme={theme} />
                      </div>
                    </div>
                  )}
                  {selectedSection === "radius" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-black/60 dark:text-white/60 dark:data-[hover=true]:bg-white/20 data-[hover=true]:bg-black/10 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                      </Button>
                      <div className="p-4">
                        <Radiuses />
                      </div>
                    </div>
                  )}
                  {selectedSection === "borderWidths" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-black/60 dark:text-white/60 dark:data-[hover=true]:bg-white/20 data-[hover=true]:bg-black/10 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                      </Button>
                      <div className="p-4">
                        <BorderWidths />
                      </div>
                    </div>
                  )}
                  {selectedSection === "font" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-black/60 dark:text-white/60 dark:data-[hover=true]:bg-white/20 data-[hover=true]:bg-black/10 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                      </Button>
                      <div className="p-4">
                        <Fonts />
                      </div>
                    </div>
                  )}
                  {selectedSection === "opacity" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-black/60 dark:text-white/60 dark:data-[hover=true]:bg-white/20 data-[hover=true]:bg-black/10 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                      </Button>
                      <div className="p-4">
                        <DisableOpacity config={config} />
                      </div>
                    </div>
                  )}
                  {selectedSection === "scaling" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-black/60 dark:text-white/60 dark:data-[hover=true]:bg-white/20 data-[hover=true]:bg-black/10 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                      </Button>
                      <div className="p-4">
                        <Scaling />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollShadow>
            </div>
            <Divider className="my-2 p-0" />
            <div className="flex flex-col items-center px-8 pb-4">
              <Button fullWidth className="text-white bg-blue-500" onPress={handleCopy}>
                Copy Theme
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }, [
    config,
    handleCopy,
    isDrawerOpen,
    selectedSection,
    syncIcon,
    syncThemes,
    theme,
    templateTheme,
    currentTheme,
  ]);

  return (
    <div id="configuration-container">
      {DesktopView}
      {MobileView}
    </div>
  );
}
