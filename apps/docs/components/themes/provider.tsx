import {useState, createContext, useContext} from "react";
import {useLocalStorage} from "usehooks-ts";

import {configKey, initialConfig} from "./constants";
import {
  ConfigColors,
  Config,
  ConfigLayout,
  ThemeType,
  Radius,
  TemplateType,
  FontType,
  HeroUIScaling,
  Border,
} from "./types";

export interface ThemeBuilderContextProps {
  config: Config;
  radiusValue: Radius;
  borderWidthValue: Border;
  templateTheme: TemplateType;
  font: FontType | undefined;
  scaling: HeroUIScaling;
  resetConfig: (theme: ThemeType, sync: boolean) => Config;
  setLayoutColor: (
    newConfig: Partial<ConfigColors["layoutColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => void;
  setContentColor: (newConfig: Partial<ConfigColors["contentColor"]>, theme: ThemeType) => void;
  setBorderWidth: (newConfig: Partial<ConfigLayout["borderWidth"]>) => void;
  setBaseColor: (
    newConfig: Partial<ConfigColors["baseColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => void;
  setDefaultColor: (
    newConfig: Partial<ConfigColors["defaultColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => void;
  setConfiguration: (newConfig: Config, theme: ThemeType, sync: boolean) => void;
  setLineHeight: (newConfig: Partial<ConfigLayout["lineHeight"]>) => void;
  setFontSize: (newConfig: Partial<ConfigLayout["fontSize"]>) => void;
  setOtherParams: (newConfig: Partial<ConfigLayout["otherParams"]>) => void;
  setRadius: (newConfig: Partial<ConfigLayout["radius"]>) => void;
  setRadiusValue: (radius: Radius) => void;
  setBorderWidthValue: (borderWidth: Border) => void;
  setTemplateTheme: (theme: TemplateType) => void;
  setFont: (font: FontType) => void;
  setScaling: (scale: HeroUIScaling) => void;
}

const ThemeBuilderContext = createContext<ThemeBuilderContextProps>({
  config: initialConfig,
  radiusValue: "md",
  borderWidthValue: "thick",
  templateTheme: "heroui",
  font: "Inter",
  scaling: 100,
  resetConfig: () => initialConfig,
  setLayoutColor: () => {},
  setBorderWidth: () => {},
  setBaseColor: () => {},
  setConfiguration: () => {},
  setLineHeight: () => {},
  setFontSize: () => {},
  setOtherParams: () => {},
  setRadius: () => {},
  setDefaultColor: () => {},
  setContentColor: () => {},
  setRadiusValue: () => {},
  setBorderWidthValue: () => {},
  setTemplateTheme: () => {},
  setFont: () => {},
  setScaling: () => {},
});

interface ThemeBuilderProviderProps {
  children: React.ReactNode;
}

export default function ThemeBuilderProvider({children}: ThemeBuilderProviderProps) {
  const [lsConfig] = useLocalStorage<Config>(configKey, initialConfig);
  const [config, setConfig] = useState<Config>(lsConfig);
  const [radiusValue, setRadiusValue] = useState<Radius>("sm");
  const [borderWidthValue, setBorderWidthValue] = useState<Border>("thin");
  const [templateTheme, setTemplateTheme] = useState<TemplateType>("heroui");
  const [font, setFont] = useState<FontType | undefined>(undefined);
  const [scaling, setScaling] = useState<HeroUIScaling>(100);

  const setConfiguration = (newConfig: Config, theme: ThemeType, sync: boolean) => {
    setConfig((prev) =>
      sync
        ? newConfig
        : {
            ...prev,
            [theme]: newConfig[theme],
          },
    );
  };

  const resetConfig = (theme: ThemeType, sync: boolean) => {
    let newConfig = initialConfig;

    setConfig((prev) => {
      newConfig = sync
        ? newConfig
        : {
            ...prev,
            [theme]: newConfig[theme],
            layout: newConfig.layout,
          };

      return newConfig;
    });

    return newConfig;
  };

  const setBaseColor = (
    newConfig: Partial<ConfigColors["baseColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => {
    setConfig((prev) =>
      sync
        ? {
            ...prev,
            light: {
              ...prev.light,
              baseColor: {
                ...prev.light.baseColor,
                ...newConfig,
              },
            },
            dark: {
              ...prev.dark,
              baseColor: {
                ...prev.dark.baseColor,
                ...newConfig,
              },
            },
          }
        : {
            ...prev,
            [theme]: {
              ...prev[theme],
              baseColor: {
                ...prev[theme].baseColor,
                ...newConfig,
              },
            },
          },
    );
  };

  const setDefaultColor = (
    newConfig: Partial<ConfigColors["defaultColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => {
    setConfig((prev) =>
      sync
        ? {
            ...prev,
            light: {
              ...prev.light,
              defaultColor: {
                ...prev.light.defaultColor,
                ...newConfig,
              },
            },
            dark: {
              ...prev.dark,
              defaultColor: {
                ...prev.dark.defaultColor,
                ...newConfig,
              },
            },
          }
        : {
            ...prev,
            [theme]: {
              ...prev[theme],
              defaultColor: {
                ...prev[theme].defaultColor,
                ...newConfig,
              },
            },
          },
    );
  };

  const setContentColor = (newConfig: Partial<ConfigColors["contentColor"]>, theme: ThemeType) => {
    setConfig((prev) => ({
      ...prev,
      [theme]: {
        ...prev[theme],
        contentColor: {
          ...prev[theme].contentColor,
          ...newConfig,
        },
      },
    }));
  };

  const setLayoutColor = (
    newConfig: Partial<ConfigColors["layoutColor"]>,
    theme: ThemeType,
    sync: boolean,
  ) => {
    setConfig((prev) =>
      sync
        ? {
            ...prev,
            light: {
              ...prev.light,
              otherColor: {
                ...prev.light.layoutColor,
                ...newConfig,
              },
            },
            dark: {
              ...prev.dark,
              otherColor: {
                ...prev.dark.layoutColor,
                ...newConfig,
              },
            },
          }
        : {
            ...prev,
            [theme]: {
              ...prev[theme],
              otherColor: {
                ...prev[theme].layoutColor,
                ...newConfig,
              },
            },
          },
    );
  };

  const setBorderWidth = (newBorderWidths: Partial<ConfigLayout["borderWidth"]>) =>
    setConfig((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        borderWidth: {
          ...prev.layout.borderWidth,
          ...newBorderWidths,
        },
      },
    }));

  const setLineHeight = (newLineHeights: Partial<ConfigLayout["lineHeight"]>) =>
    setConfig((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        lineHeight: {
          ...prev.layout.lineHeight,
          ...newLineHeights,
        },
      },
    }));

  const setFontSize = (newFontSizes: Partial<ConfigLayout["fontSize"]>) =>
    setConfig((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        fontSize: {
          ...prev.layout.fontSize,
          ...newFontSizes,
        },
      },
    }));

  const setRadius = (newRadius: Partial<ConfigLayout["radius"]>) =>
    setConfig((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        radius: {
          ...prev.layout.radius,
          ...newRadius,
        },
      },
    }));

  const setOtherParams = (newOtherParams: Partial<ConfigLayout["otherParams"]>) =>
    setConfig((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        otherParams: {
          ...prev.layout.otherParams,
          ...newOtherParams,
        },
      },
    }));

  return (
    <ThemeBuilderContext.Provider
      value={{
        config,
        radiusValue,
        borderWidthValue,
        templateTheme,
        font,
        scaling,
        resetConfig,
        setLayoutColor,
        setBorderWidth,
        setBaseColor,
        setConfiguration,
        setLineHeight,
        setFontSize,
        setOtherParams,
        setRadius,
        setDefaultColor,
        setContentColor,
        setRadiusValue,
        setBorderWidthValue,
        setTemplateTheme,
        setFont,
        setScaling,
      }}
    >
      {children}
    </ThemeBuilderContext.Provider>
  );
}

// Create a custom hook to use the ThemeBuilderContext
export function useThemeBuilder(): ThemeBuilderContextProps {
  const context = useContext(ThemeBuilderContext);

  if (!context) {
    throw new Error("useThemeBuilder must be used within a ThemeBuilderProvider");
  }

  return context;
}
