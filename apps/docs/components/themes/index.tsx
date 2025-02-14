"use client";

import {useEffect, useState} from "react";

import Configuration from "./components/configuration";
import {Showcase} from "./components/showcase";
import ThemeBuilderProvider from "./provider";

export function ThemeBuilder() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <ThemeBuilderProvider>
      <Showcase />
      <Configuration />
    </ThemeBuilderProvider>
  ) : null;
}
