import {Image} from "@heroui/react";

export default function App() {
  return (
    <Image
      alt="HeroUI Image with custom loading"
      height={200}
      loadingSrc="https://via.placeholder.com/300x200"
      src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
      width={300}
    />
  );
}
