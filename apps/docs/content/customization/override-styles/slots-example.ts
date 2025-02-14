const App = `import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@heroui/react";

export default function App() {
  return (
    <Card className="w-[240px] h-[240px] bg-linear-to-br from-violet-500 to-fuchsia-500">
      <CardBody className="justify-center items-center py-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={70}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
    </Card>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
