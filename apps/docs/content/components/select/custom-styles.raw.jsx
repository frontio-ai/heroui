import {Select, SelectItem, Avatar} from "@heroui/react";

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
    email: "brian.kim@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
    email: "mia.robinson@example.com",
  },
];

export default function App() {
  return (
    <Select
      className="max-w-xs"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5",
        trigger: "min-h-16",
        listboxWrapper: "max-h-[400px]",
      }}
      items={users}
      label="Assigned to"
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        },
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar alt={item.data.name} className="shrink-0" size="sm" src={item.data.avatar} />
            <div className="flex flex-col">
              <span>{item.data.name}</span>
              <span className="text-default-500 text-tiny">({item.data.email})</span>
            </div>
          </div>
        ));
      }}
      variant="bordered"
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
