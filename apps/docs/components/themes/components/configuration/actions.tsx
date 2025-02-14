import {Button, Tooltip} from "@heroui/react";
import {Icon} from "@iconify/react/dist/offline";
import SunIcon from "@iconify/icons-solar/sun-linear";
import MoonIcon from "@iconify/icons-solar/moon-linear";
import UndoLeftIcon from "@iconify/icons-solar/undo-left-linear";

import {ThemeType} from "../../types";

interface ActionsProps {
  theme: ThemeType;
  onCopy: () => unknown;
  onResetTheme: () => void;
  onToggleTheme: () => void;
}

export function Actions({theme, onCopy, onResetTheme, onToggleTheme}: ActionsProps) {
  const isLight = theme === "light";

  /**
   * Handle the copying of the configuration.
   */
  function handleCopyConfig() {
    navigator.clipboard.writeText(JSON.stringify(onCopy(), null, 2));
  }

  return (
    <div className="flex gap-2">
      <Tooltip content={isLight ? "Dark" : "Light"}>
        <Button isIconOnly color="secondary" size="sm" variant="flat" onClick={onToggleTheme}>
          {isLight ? (
            <Icon className="text-lg" icon={MoonIcon} />
          ) : (
            <Icon className="text-lg" icon={SunIcon} />
          )}
        </Button>
      </Tooltip>
      <Tooltip content="Reset theme">
        <Button isIconOnly color="secondary" size="sm" variant="flat" onClick={onResetTheme}>
          <Icon className="text-lg" icon={UndoLeftIcon} />
        </Button>
      </Tooltip>
      <Tooltip content="Copy configuration">
        <Button isIconOnly color="secondary" size="sm" variant="flat" onClick={handleCopyConfig}>
          Copy
        </Button>
      </Tooltip>
    </div>
  );
}
