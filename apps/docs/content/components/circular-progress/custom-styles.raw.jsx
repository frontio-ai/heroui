import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@heroui/react";

export default function App() {
  return (
    <Card className="w-[240px] h-[240px] border-none bg-linear-to-br from-violet-500 to-fuchsia-500">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          showValueLabel={true}
          strokeWidth={4}
          value={70}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          2800 Data points
        </Chip>
      </CardFooter>
    </Card>
  );
}
