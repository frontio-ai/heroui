import {Disclosure, Avatar} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Disclosure
      aria-label="Chung Miller"
      id="1"
      startContent={
        <Avatar
          isBordered
          color="primary"
          radius="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      }
      subtitle="4 unread messages"
      title="Chung Miller"
    >
      {defaultContent}
    </Disclosure>
  );
}
