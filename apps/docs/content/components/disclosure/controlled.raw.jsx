import React from "react";
import {Disclosure, Button} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const [isExpanded, onExpandedChange] = React.useState(false);

  return (
    <div className="w-full flex flex-col">
      <div className="py-2">
        <Button
          onPress={() => {
            onExpandedChange(!isExpanded);
          }}
        >
          Click
        </Button>
      </div>
      <div>
        <Disclosure
          isExpanded={isExpanded}
          title="Controlled Disclosure"
          onExpandedChange={onExpandedChange}
        >
          {defaultContent}
        </Disclosure>
      </div>
    </div>
  );
}
