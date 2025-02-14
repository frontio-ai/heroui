const App = `import {Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button color="primary" variant="solid" className="rounded-[6px] bg-[#DD62ED] text-[#FFFFFF] data-[focus-visible=true]:outline-[#F182F6]">
        Solid
      </Button>
      <Button color="primary" variant="faded" className="rounded-[6px] bg-[#27272a] border-[#3f3f46] text-[#DD62ED] data-[focus-visible=true]:outline-[#F182F6]">
        Faded
      </Button>  
      <Button color="primary" variant="bordered" className="rounded-[6px] text-[#DD62ED] border-[#DD62ED] data-[focus-visible=true]:outline-[#F182F6]">
        Bordered
      </Button>  
      <Button color="primary" variant="light" className="rounded-[6px] text-[#DD62ED] data-[hover=true]:bg-[#DD62ED]/20 data-[focus-visible=true]:outline-[#F182F6]">
        Light
      </Button>  
      <Button color="primary" variant="flat" className="rounded-[6px] bg-[#DD62ED]/20 text-[#DD62ED] data-[focus-visible=true]:outline-[#F182F6]">
        Flat
      </Button>  
      <Button color="primary" variant="ghost" className="rounded-[6px] border-[#DD62ED] text-[#DD62ED] data-[hover=true]:bg-[#DD62ED]! data-[hover=true]:text-[#FFFFFF]! data-[focus-visible=true]:outline-[#F182F6]">
        Ghost
      </Button>  
      <Button color="primary" variant="shadow" className="rounded-[6px] shadow-[#DD62ED]/40 bg-[#DD62ED] text-[#FFFFFF] data-[focus-visible=true]:outline-[#F182F6]">
        Shadow
      </Button>  
      <Button isDisabled color="primary" variant="solid" className="rounded-[6px] opacity-30 bg-[#DD62ED] text-[#FFFFFF] data-[focus-visible=true]:outline-[#F182F6]">
        Disabled
      </Button>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
