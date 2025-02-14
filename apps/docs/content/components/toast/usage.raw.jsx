import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="flat"
        onPress={() => {
          addToast({
            title: "Toast Title",
          });
        }}
      >
        Default
      </Button>

      <Button
        variant="flat"
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
          });
        }}
      >
        With Description
      </Button>

      <Button
        variant="flat"
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            hideIcon: true,
          });
        }}
      >
        Hidden Icon
      </Button>

      <Button
        variant="flat"
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          });
        }}
      >
        Promise (3000ms)
      </Button>

      <Button
        variant="flat"
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            endContent: (
              <Button size="sm" variant="flat">
                Upgrade
              </Button>
            ),
          });
        }}
      >
        With endContent
      </Button>

      <Button
        variant="flat"
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            timeout: 3000,
            shouldShowTimeoutProgess: true,
          });
        }}
      >
        Show Timeout Progress (3000ms)
      </Button>

      <Button
        variant="flat"
        onPress={() =>
          addToast({
            title: "Toast title",
            description: "Toast displayed successfully",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path
                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                    data-name="Stroke 1"
                  />
                  <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
                </g>
              </svg>
            ),
          })
        }
      >
        Custom Icon
      </Button>
    </div>
  );
}
