/* eslint-disable react/display-name */
import {clsx} from "@heroui/shared-utils";
import * as Components from "@heroui/react";
import {Language} from "prism-react-renderer";
import NextImage from "next/image";
import {usePostHog} from "posthog-js/react";

import {ThemeSwitch} from "./theme-switch";
import {InfoCircle} from "./icons/info-circle";
import {FigmaButton} from "./figma-button";

import {Sandpack} from "@/components/sandpack";
import {CarbonAd} from "@/components/ads/carbon-ad";
import * as DocsComponents from "@/components/docs/components";
import * as BlogComponents from "@/components/blog/components";
import {Codeblock} from "@/components/docs/components";
import {VirtualAnchor, virtualAnchorEncode} from "@/components/virtual-anchor";
import {
  Table as StaticTable,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumnHeader,
  TableRoot,
} from "@/components/static-table";

const Table: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="border-collapse border-spacing-0 w-full">{children}</table>
    </div>
  );
};

const Thead: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <thead
      className={clsx(
        "[&>tr]:h-12",
        "[&>tr>th]:py-0",
        "[&>tr>th]:align-middle",
        "[&>tr>th]:bg-default-400/20",
        "dark:[&>tr>th]:bg-default-600/10",
        "[&>tr>th]:text-default-600 [&>tr>th]:text-xs",
        "[&>tr>th]:text-left [&>tr>th]:pl-2",
        "[&>tr>th:first-child]:rounded-l-lg",
        "[&>tr>th:last-child]:rounded-r-lg",
      )}
    >
      {children}
    </thead>
  );
};
const Trow: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <tr>{children}</tr>;
};

const Tcol: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <td className="text-sm p-2 max-w-[200px] overflow-auto whitespace-normal break-normal">
      {children}
    </td>
  );
};

export interface LinkedHeadingProps {
  as: keyof JSX.IntrinsicElements;
  id?: string;
  linked?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const linkedLevels: Record<string, number> = {
  h1: 0,
  h2: 1,
  h3: 2,
  h4: 3,
};

const LinkedHeading: React.FC<LinkedHeadingProps> = ({
  as,
  linked = true,
  id: idProp,
  className,
  ...props
}) => {
  const Component = as;

  const level = linkedLevels[as] || 1;

  let id = idProp || virtualAnchorEncode(props.children as string);

  return (
    <Component
      className={clsx({"linked-heading": linked}, linked ? {} : className)}
      data-id={id}
      data-level={level}
      data-name={props.children}
      id={id}
      {...props}
    >
      {linked ? <VirtualAnchor id={id}>{props.children}</VirtualAnchor> : <>{props.children}</>}
    </Component>
  );
};

const List: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <ul className="list-disc flex flex-col gap-2 ml-4 mt-2 [&>li>strong]:text-foreground [&>li>strong]:font-medium">
      {children}
    </ul>
  );
};

const InlineCode = ({children, className}: {children?: React.ReactNode; className?: string}) => {
  return (
    <Components.Code
      className={clsx(
        'p-0 relative before:content-["`"] after:content-["`"] font-semibold font-mono text-small rounded-md text-default-900 dark:text-default-500 bg-transparent',
        className,
      )}
    >
      {children}
    </Components.Code>
  );
};

const Code = ({
  className,
  children,
  meta,
}: {
  children?: React.ReactNode;
  className?: string;
  meta?: string;
}) => {
  const isMultiLine = (children as string)?.split?.("\n")?.length > 2;
  const language = (className?.replace(/language-/, "") ?? "jsx") as Language;
  const codeString = String(children).trim();
  const posthog = usePostHog();

  if (!className) {
    return <InlineCode>{children}</InlineCode>;
  }

  return (
    <Components.Snippet
      disableTooltip
      fullWidth
      hideSymbol
      classNames={{
        base: clsx(
          "px-0 bg-code-background text-code-foreground",
          {
            "items-start": isMultiLine,
          },
          className,
        ),
        pre: "font-light w-full text-sm",
        copyButton: "text-lg text-zinc-500 mr-2",
      }}
      codeString={codeString}
      onCopy={() => {
        posthog.capture("MDXComponents - Copy", {
          category: "docs",
          action: "copyCode",
        });
      }}
    >
      <Codeblock
        className="sp-editor"
        codeString={codeString}
        language={language}
        metastring={meta}
      />
    </Components.Snippet>
  );
};

const Link = ({href, children}: {href?: string; children?: React.ReactNode}) => {
  const isExternal = href?.startsWith("http") || href?.startsWith("https");
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("MDXComponents - Click", {
      category: "docs",
      action: "click",
      data: href || "",
    });
  };

  const externalProps = isExternal ? {target: "_blank", rel: "noopener noreferrer"} : {};

  return (
    <Components.Link
      className="relative hover:opacity-100 text-foreground font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:rounded-full after:h-[1px] after:bg-primary-400 dark:after:bg-default-300 hover:after:h-[2px]"
      disableAnimation={true}
      href={href}
      {...externalProps}
      style={{
        // font size inherit from parent
        fontSize: "inherit",
      }}
      onPress={handleClick}
    >
      {children}
    </Components.Link>
  );
};

const InlineCodeChip = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <InlineCode
      className={clsx(
        "before:hidden after:hidden text-tiny rounded-md text-default-600 bg-default-100 dark:bg-default-100/80 px-1.5 py-0.5",
        className,
      )}
    >
      {children}
    </InlineCode>
  );
};

interface APITableProps {
  data: {
    attribute: string;
    type: string;
    description: string;
    deprecated?: boolean;
    default?: string;
  }[];
}

export const APITable: React.FC<APITableProps> = ({data}) => {
  return (
    <TableRoot className="overflow-x-auto overflow-y-hidden">
      <StaticTable aria-label="API table" className="w-full" layout="auto">
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Prop</TableColumnHeader>
            <TableColumnHeader>Type</TableColumnHeader>
            <TableColumnHeader>Default</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="[&>td]:px-2 [&>td]:py-1.5 first:[&>td]:pt-4">
              <TableCell className="flex items-center gap-1 font-mono text-small whitespace-nowrap">
                <InlineCodeChip className={item.deprecated ? "line-through" : ""}>
                  {item.attribute}
                </InlineCodeChip>
                {item.description && (
                  <>
                    {/* Desktop tooltip */}
                    <Components.Tooltip
                      classNames={{
                        content: "max-w-[240px]",
                      }}
                      content={item.description}
                      delay={0}
                      placement="top"
                    >
                      <div className="flex items-center gap-1 cursor-default hidden sm:block">
                        <InfoCircle className="text-default-400" size={16} />
                      </div>
                    </Components.Tooltip>
                    {/* Mobile popover */}
                    <Components.Popover placement="top">
                      <Components.PopoverTrigger>
                        <button className="flex items-center gap-1 sm:hidden outline-hidden">
                          <InfoCircle className="text-default-400" size={16} />
                        </button>
                      </Components.PopoverTrigger>
                      <Components.PopoverContent className="max-w-[240px]">
                        {item.description}
                      </Components.PopoverContent>
                    </Components.Popover>
                  </>
                )}
              </TableCell>
              <TableCell className="font-mono text-small whitespace-nowrap text-primary">
                <InlineCodeChip>
                  <div className="flex max-w-[300px] flex-wrap text-wrap">{item.type}</div>
                </InlineCodeChip>
              </TableCell>
              <TableCell className="font-mono text-small whitespace-nowrap">
                {item.default && item.default !== "-" ? (
                  <InlineCodeChip>
                    {item.default !== "true" && item.default !== "false"
                      ? `"${item.default}"`
                      : item.default}
                  </InlineCodeChip>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="text-default-400"
                    fill="none"
                    focusable="false"
                    height="15"
                    viewBox="0 0 15 15"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StaticTable>
    </TableRoot>
  );
};

export const MDXComponents = {
  /**
   * Next.js components
   */
  NextImage,
  /**
   * HeroUI components
   */
  ...Components,
  /**
   * Docs components
   */
  ...DocsComponents,
  Sandpack,
  ThemeSwitch,
  FigmaButton,
  /**
   * Blog components
   */
  ...BlogComponents,
  /**
   * Markdown components
   */
  // ...Icons,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <LinkedHeading as="h1" linked={false} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h2" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h3" {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <LinkedHeading as="h4" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong {...props} />,
  table: Table,
  thead: Thead,
  tr: Trow,
  td: Tcol,
  CarbonAd,
  code: Code,
  ul: List,
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
  blockquote: (props: Omit<React.HTMLAttributes<HTMLElement>, "color">) => (
    <DocsComponents.Blockquote {...props} />
  ),
  kbd: (props: React.HTMLAttributes<HTMLElement>) => (
    <Components.Kbd {...props} className="py-0.5 px-1.5" />
  ),
  Steps: ({...props}) => (
    <div
      className="[&>h3]:step [&>h3>a]:pt-0.5 [&>h4]:step [&>h4>a]:pt-0.5 mb-12 ml-4 relative border-l border-default-100 pl-[1.625rem] [counter-reset:step]"
      {...props}
    />
  ),
  APITable,
  // Block,
} as unknown as Record<string, React.ReactNode>;
