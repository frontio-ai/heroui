import {Image} from "@heroui/react";

export default function App() {
  return (
    <Image
      alt="HeroUI Image with fallback"
      fallbackSrc="https://via.placeholder.com/300x200"
      height={200}
      src="wrong-image-address"
      width={300}
    />
  );
}
