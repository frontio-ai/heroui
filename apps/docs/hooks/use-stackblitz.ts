import {Project} from "@stackblitz/sdk";
import {SandpackFiles} from "@codesandbox/sandpack-react/types";

import {mapKeys, omit} from "@/../../packages/utilities/shared-utils/src";
import {useSandpack} from "@/components/sandpack/use-sandpack";

export interface UseSandpackProps {
  files: SandpackFiles;
  typescriptStrict?: boolean;
}

const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`;

function transformSandpackFiles(files: SandpackFiles) {
  return Object.fromEntries(
    Object.entries(files).map(([key, value]) => [
      key,
      typeof value === "string" ? value : value.code,
    ]),
  );
}

export function useStackblitz(props: UseSandpackProps) {
  const {files, typescriptStrict = false} = props;

  const {
    customSetup,
    files: filesData,
    entryFile,
  } = useSandpack({
    files: transformSandpackFiles(files),
    typescriptStrict,
  });

  const transformFiles = mapKeys(filesData, (_, key) => key.replace(/^\//, ""));

  const dependencies = {...customSetup.dependencies, ...customSetup.devDependencies};

  const packageJson = `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    ${Object.entries(omit(dependencies as any, ["react", "react-dom"]))
      .map(([key, value]) => `"${key}": "${value}"`)
      .join(",\n    ")}
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.3.4",
    "vite": "6.0.6",
    "postcss": "8.5.1",
    "tailwindcss": "4.0.0",
    "@tailwindcss/postcss": "4.0.0",
    "@tailwindcss/vite": "4.0.0"
  },
  "main": "/index.jsx"
}`;

  const stackblitzPrefillConfig: Project = {
    files: {
      ...transformSandpackFiles(transformFiles),
      "vite.config.js": viteConfig,
      "package.json": packageJson,
    },
    dependencies,
    title: "HeroUI",
    template: "node",
  };

  const findEntryFile = Object.keys(stackblitzPrefillConfig.files).find((key) =>
    key.includes("App"),
  );

  return {
    entryFile: findEntryFile ?? entryFile,
    stackblitzPrefillConfig,
  };
}
