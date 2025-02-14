import {Image} from "@heroui/react";

import manifest from "@/config/routes.json";
import {DocsSidebar} from "@/components/docs/sidebar";
import {ScriptProviders} from "@/components/scripts/script-providers";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({children}: DocsLayoutProps) {
  return (
    <>
      <main className="relative container mx-auto max-w-8xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 grow">
        <div className="grid grid-cols-12">
          <div className="hidden overflow-visible relative z-10 lg:block lg:col-span-2 mt-8 pr-4">
            <DocsSidebar routes={manifest.routes} />
          </div>
          {children}
        </div>
      </main>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-100 -bottom-[30%] -left-[30%] z-0"
      >
        <Image
          removeWrapper
          alt="docs left background"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/docs-left.png"
        />
      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -top-[50%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
      >
        <Image
          removeWrapper
          alt="docs right background"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/docs-right.png"
        />
      </div>

      <ScriptProviders />
    </>
  );
}
