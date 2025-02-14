import {Image} from "@heroui/react";

import PlaygroundTabs from "./playground-tabs";

export default function FigmaPage() {
  return (
    <>
      <main className="prose prose-neutral relative container mx-auto max-w-3xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 grow">
        <section className="w-full flex flex-col items-center mt-12 gap-6">
          <div className="text-center">
            <h1 className="mb-2">Playground</h1>
          </div>
        </section>
        <section>
          <h3 className="text-medium text-default-500">Components</h3>
          <PlaygroundTabs />
        </section>
      </main>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0"
      >
        <Image removeWrapper alt="docs left background" src="/gradients/docs-left.png" />
      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
      >
        <Image removeWrapper alt="docs right background" src="/gradients/docs-right.png" />
      </div>
    </>
  );
}
