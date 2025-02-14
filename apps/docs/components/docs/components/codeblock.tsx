"use client";

import type {Language, PrismTheme} from "prism-react-renderer";

import {useIntersectionObserver} from "usehooks-ts";
import React, {forwardRef, useEffect} from "react";
import {clsx, dataAttr, getUniqueID} from "@heroui/shared-utils";
import BaseHighlight, {defaultProps} from "prism-react-renderer";
import {debounce, omit} from "@heroui/shared-utils";
import {cn} from "@heroui/react";

import defaultTheme from "@/libs/prism-theme";

interface CodeblockProps {
  language: Language;
  codeString: string;
  metastring?: string;
  theme?: PrismTheme;
  children?: React.ReactNode;
  showLines?: boolean;
  removeIndent?: boolean;
  hideScrollBar?: boolean;
  className?: string;
}

type HighlightStyle = "inserted" | "deleted" | undefined;

const cliCommands = [/^init$/, /^add$/, /^upgrade$/, /^remove$/, /^list$/, /^env$/, /^doctor$/];

const highlightStyleToken = [
  "bun",
  /nextui\s\w+(?=\s?)/,
  /^nextui$/,
  /heroui\s\w+(?=\s?)/,
  /^heroui$/,
  "Usage",
  ...cliCommands,
];
const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta?: string) => {
  if (!meta) {
    return () => false;
  }

  if (!RE.test(meta)) {
    return () => false;
  }
  // @ts-ignore
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    );

    return inRange;
  };
};

const calculateHeight = (codeString: string) => {
  const lines = codeString.split("\n").length;

  return lines * 24;
};

const CodeBlockHighlight = ({
  codeString,
  language,
  codeLang,
  theme,
  showLines,
  removeIndent,
  hideScrollBar,
  preRef,
  isMultiLine,
  shouldHighlightLine,
  highlightStyle,
  className: classNameProp,
  ...props
}: CodeblockProps & {
  codeLang: Language;
  isMultiLine: boolean;
  shouldHighlightLine: (index: number) => boolean;
  highlightStyle: HighlightStyle[];
  preRef: React.Ref<HTMLElement>;
}) => {
  const height = calculateHeight(codeString);

  const [intersectionRef, isVisible] = useIntersectionObserver({
    threshold: 0,
  });

  return (
    <div
      ref={intersectionRef}
      style={{
        height: isVisible ? "auto" : `${height}px`,
        // due to display: contents on the scrollable child element, this div will also scroll
        // this causes the intersection observer to trigger if scrolled far enough horizontally
        // set the width to fit-content to prevent this div from going off screen
        width: "fit-content",
      }}
    >
      {isVisible ? (
        <BaseHighlight
          {...defaultProps}
          code={codeString}
          language={codeLang}
          theme={theme}
          {...props}
        >
          {({className, style, tokens, getLineProps, getTokenProps}) => (
            <pre
              ref={(element) => {
                // Merge the refs
                if (typeof preRef === "function") {
                  preRef(element);
                } else if (preRef) {
                  // @ts-ignore
                  preRef.current = element;
                }
              }}
              className={clsx(
                className,
                classNameProp,
                `language-${codeLang}`,
                "max-w-full contents",
                {
                  "flex-col": isMultiLine,
                  "overflow-x-scroll scrollbar-hide": hideScrollBar,
                },
              )}
              data-language={language}
              style={style}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({line, key: i});

                return (
                  <div
                    {...omit(lineProps, ["key"])}
                    key={`${i}-${getUniqueID("line-wrapper")}`}
                    className={clsx(
                      lineProps.className,
                      removeIndent ? "pr-4" : "px-4",
                      "relative [&>span]:relative [&>span]:z-10",
                      {
                        "px-2": showLines,
                      },
                      {
                        "before:to-code-background before:absolute before:left-0 before:z-0 before:h-full before:w-full before:bg-linear-to-r before:from-white/10 before:content-[''] before:pointer-events-none":
                          shouldHighlightLine(i),
                      },
                    )}
                    data-deleted={dataAttr(highlightStyle?.[i] === "deleted")}
                    data-inserted={dataAttr(highlightStyle?.[i] === "inserted")}
                  >
                    {showLines && (
                      <span
                        className={cn(
                          "mr-6 select-none text-xs opacity-30",
                          i + 1 >= 10 ? "mr-4" : "",
                          i + 1 >= 100 ? "mr-2" : "",
                          i + 1 >= 1000 ? "mr-0" : "",
                        )}
                      >
                        {i + 1}
                      </span>
                    )}

                    {line.map((token, key) => {
                      const props = getTokenProps({token, key}) || {};

                      return (
                        <span
                          {...omit(props, ["key"])}
                          key={`${key}-${getUniqueID("line")}`}
                          className={className}
                          style={{
                            ...props.style,
                            ...(highlightStyleToken.some((t) => {
                              const content = token.content.trim();

                              const regex = t instanceof RegExp ? t : new RegExp(t);

                              return regex.test(content);
                            })
                              ? {color: "rgb(var(--code-function))"}
                              : {}),
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </pre>
          )}
        </BaseHighlight>
      ) : (
        <div className={clsx(classNameProp, "w-full bg-code-background rounded-lg")} />
      )}
    </div>
  );
};

const Codeblock = forwardRef<HTMLPreElement, CodeblockProps>(
  (
    {
      codeString,
      language,
      showLines,
      theme: themeProp,
      metastring,
      hideScrollBar,
      removeIndent,
      className: classNameProp,
      ...props
    },
    ref,
  ) => {
    const theme = themeProp || defaultTheme;
    const shouldHighlightLine = calculateLinesToHighlight(metastring);
    const isMultiLine = codeString.split("\n").length > 2;

    const lastSelectionText = React.useRef<string | null>(null);

    const isDiff = language.includes("diff");

    const codeLang = isDiff ? (language.split("-")[1] as Language) : language;

    let highlightStyle: HighlightStyle[] = [];

    if (isDiff) {
      let code: string[] = [];

      highlightStyle = codeString.split?.("\n").map((line) => {
        if (line.startsWith("+")) {
          code.push(line.substr(1));

          return "inserted";
        }
        if (line.startsWith("-")) {
          code.push(line.substr(1));

          return "deleted";
        }
        code.push(line);
      });

      codeString = code.join("\n");
    }

    useEffect(() => {
      const handleSelectionChange = () => {
        if (!window.getSelection) return;

        const el = window.getSelection()?.anchorNode?.parentNode;

        if (!el) return;

        const selectionText = window.getSelection()?.toString();

        if (!selectionText) return;

        if (
          !selectionText ||
          selectionText === lastSelectionText.current ||
          !codeString.includes(selectionText)
        )
          return;

        lastSelectionText.current = selectionText;
      };

      const debouncedHandleSelectionChange = debounce(handleSelectionChange, 1000);

      document.addEventListener("selectionchange", debouncedHandleSelectionChange);

      return () => {
        document.removeEventListener("selectionchange", debouncedHandleSelectionChange);
      };
    }, []);

    return (
      <CodeBlockHighlight
        className={classNameProp}
        codeLang={codeLang}
        codeString={codeString}
        hideScrollBar={hideScrollBar}
        highlightStyle={highlightStyle}
        isMultiLine={isMultiLine}
        language={language}
        preRef={ref}
        removeIndent={removeIndent}
        shouldHighlightLine={shouldHighlightLine}
        showLines={showLines}
        theme={theme}
        {...props}
      />
    );
  },
);

Codeblock.displayName = "CodeBlock";

export default Codeblock;
