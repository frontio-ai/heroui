const App = `import {Button} from '@heroui/react';

export default function App() {
  return (
    <div className="flex gap-4">
      <Button className="rounded-[4px] bg-[#BEF264] text-[#000000] data-[focus-visible=true]:outline-[#BEF264]">
        Solid
      </Button>
      <Button variant="ghost" className="rounded-[4px] border-[1px] border-[#BEF264] hover:bg-[#BEF264]! hover:text-[#000000]! data-[focus-visible=true]:outline-[#BEF264]">
        Ghost
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
