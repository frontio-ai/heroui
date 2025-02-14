import {Avatar, AvatarIcon} from "@heroui/react";

export default function App() {
  return (
    <div className="flex items-center">
      <Avatar
        classNames={{
          base: "bg-linear-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}
        icon={<AvatarIcon />}
      />
    </div>
  );
}
