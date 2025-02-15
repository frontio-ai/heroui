import React, {useEffect, useCallback, useState} from "react";
import {tv} from "tailwind-variants";
import {clsx} from "@heroui/shared-utils";

export type WindowActionsProps = {
  title?: string;
  className?: string;
};

const windowIconStyles = tv({
  base: "w-3 h-3 rounded-full",
  variants: {
    color: {
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
    },
  },
});

export const WindowActions: React.FC<WindowActionsProps> = ({title, className, ...props}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsMenuVisible(false); // Close the menu
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isMenuVisible) return null; // Hide component if menu is closed

  return (
    <div
      aria-hidden={!isMenuVisible} // Visibility state
      aria-labelledby="window-actions-title"
      className={clsx(
        "flex items-center sticky top-0 left-0 px-4 z-10 justify-between h-8 bg-code-background w-full",
        className,
      )}
      role="dialog" // Semantic role
      {...props}
    >
      <div className="flex items-center gap-2 basis-1/3">
        <div className={windowIconStyles({color: "red"})} />
        <div className={windowIconStyles({color: "yellow"})} />
        <div className={windowIconStyles({color: "green"})} />
      </div>
      <div className="flex basis-1/3 h-full justify-center items-center" id="window-actions-title">
        {title && <p className="text-white/30 text-xs font-light">{title}</p>}
      </div>
      <div className="flex basis-1/3">
        <button className="ml-auto text-xs text-white/50" onClick={() => setIsMenuVisible(false)}>
          Close
        </button>
      </div>
    </div>
  );
};
