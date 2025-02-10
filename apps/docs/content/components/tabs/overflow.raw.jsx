import {Tabs, Tab, Card, CardBody} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Tabs with overflow">
        {Array.from({length: 20}, (_, i) => (
          <Tab key={i + 1} title={`Tab ${i + 1}`}>
            <Card>
              <CardBody>Content for tab {i + 1}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
