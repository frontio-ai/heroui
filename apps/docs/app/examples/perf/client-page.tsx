"use client";

import {
  RadioGroup,
  Radio,
  Button,
  Accordion,
  Tabs,
  Textarea,
  Input,
  Tab,
  Avatar,
  Select,
  SelectItem,
  AccordionItem,
  Pagination,
  extendVariants,
  PaginationItem,
} from "@heroui/react";
import {useFilter} from "@react-aria/i18n";
import {useEffect, useMemo, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";

import {SearchLinearIcon} from "@/components/icons";

const MyRadioGroup = () => {
  const [radio, setRadio] = useState("1");

  return (
    <RadioGroup value={radio} onValueChange={setRadio}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
      <Radio value="4">Radio 4</Radio>
      <Radio value="5">Radio 5</Radio>
      <Radio value="6">Radio 6</Radio>
      <Radio value="7">Radio 7</Radio>
      <Radio value="8">Radio 8</Radio>
      <Radio value="9">Radio 9</Radio>
      <Radio value="10">Radio 10</Radio>
      <Radio value="11">Radio 11</Radio>
      <Radio value="12">Radio 12</Radio>
      <Radio value="13">Radio 13</Radio>
      <Radio value="14">Radio 14</Radio>
      <Radio value="15">Radio 15</Radio>
      <Radio value="16">Radio 16</Radio>
      <Radio value="17">Radio 17</Radio>
      <Radio value="18">Radio 18</Radio>
      <Radio value="19">Radio 19</Radio>
      <Radio value="20">Radio 20</Radio>
      <Radio value="21">Radio 21</Radio>
      <Radio value="22">Radio 22</Radio>
      <Radio value="23">Radio 23</Radio>
      <Radio value="24">Radio 24</Radio>
      <Radio value="25">Radio 25</Radio>
      <Radio value="26">Radio 26</Radio>
      <Radio value="27">Radio 27</Radio>
      <Radio value="28">Radio 28</Radio>
      <Radio value="29">Radio 29</Radio>
      <Radio value="30">Radio 30</Radio>
      <Radio value="31">Radio 31</Radio>
      <Radio value="32">Radio 32</Radio>
      <Radio value="33">Radio 33</Radio>
      <Radio value="34">Radio 34</Radio>
      <Radio value="35">Radio 35</Radio>
      <Radio value="36">Radio 36</Radio>
      <Radio value="37">Radio 37</Radio>
      <Radio value="38">Radio 38</Radio>
      <Radio value="39">Radio 39</Radio>
      <Radio value="40">Radio 40</Radio>
      <Radio value="41">Radio 41</Radio>
      <Radio value="42">Radio 42</Radio>
      <Radio value="43">Radio 43</Radio>
      <Radio value="44">Radio 44</Radio>
      <Radio value="45">Radio 45</Radio>
      <Radio value="46">Radio 46</Radio>
      <Radio value="47">Radio 47</Radio>
      <Radio value="48">Radio 48</Radio>
      <Radio value="49">Radio 49</Radio>
      <Radio value="50">Radio 50</Radio>
      <Radio value="51">Radio 51</Radio>
      <Radio value="52">Radio 52</Radio>
      <Radio value="53">Radio 53</Radio>
      <Radio value="54">Radio 54</Radio>
      <Radio value="55">Radio 55</Radio>
      <Radio value="56">Radio 56</Radio>
      <Radio value="57">Radio 57</Radio>
      <Radio value="58">Radio 58</Radio>
      <Radio value="59">Radio 59</Radio>
      <Radio value="60">Radio 60</Radio>
      <Radio value="61">Radio 61</Radio>
      <Radio value="62">Radio 62</Radio>
    </RadioGroup>
  );
};

const MyInput = extendVariants(Input, {
  variants: {
    color: {
      stone: {
        inputWrapper: [
          "bg-zinc-100",
          "border",
          "shadow",
          "transition-colors",
          "focus-within:bg-zinc-100",
          "data-[hover=true]:border-zinc-600",
          "data-[hover=true]:bg-zinc-100",
          "group-data-[focus=true]:border-zinc-600",
          // dark theme
          "dark:bg-zinc-900",
          "dark:border-zinc-800",
          "dark:data-[hover=true]:bg-zinc-900",
          "dark:focus-within:bg-zinc-900",
        ],
        input: [
          "text-zinc-800",
          "placeholder:text-zinc-600",
          // dark theme
          "dark:text-zinc-400",
          "dark:placeholder:text-zinc-600",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-6 min-h-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-10 min-h-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-14 min-h-14",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "stone",
    textSize: "base",
    removeLabel: true,
  },
});

const MyButton2 = extendVariants(Button, {
  variants: {
    color: {
      foreground:
        "bg-foreground text-background data-[hover=true]:bg-foreground/90 data-[pressed=true]:bg-foreground/80",
    },
    isScalable: {
      true: "scale-125",
      false: "",
    },
    size: {
      xl: "size--xl",
      "2xl": "size--2xl",
    },
    mySize: {
      lg: "px-12 py-6 text-lg",
      xl: "px-12 py-6 text-xl",
    },
  },
  defaultVariants: {
    color: "foreground",
  },
});

const usersData = [
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

export default function HeroUIPerf() {
  const [textA, setTextA] = useState<string>("");
  const [textB, setTextB] = useState<string>("");
  const [textC, setTextC] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>("");

  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page"));

  let {startsWith} = useFilter({sensitivity: "base"});

  const filteredItems = inputValue
    ? usersData.filter((item) => startsWith(item.name, inputValue))
    : usersData;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isOpen && inputRef?.current?.focus();
  }, [isOpen]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
  };

  const topContent = useMemo(() => {
    return (
      <Input
        ref={inputRef}
        isClearable
        aria-activedescendant={selectedKey}
        aria-expanded={isOpen}
        aria-label="Search user"
        autoComplete="off"
        autoCorrect="off"
        className="z-10 sticky top-1"
        placeholder="Search..."
        spellCheck="false"
        startContent={<SearchLinearIcon className="text-default-400" size={18} strokeWidth="2" />}
        type="text"
        onValueChange={setInputValue}
      />
    );
  }, [inputRef, selectedKey, isOpen]);

  return (
    <div className="w-full p-24 gap-4 flex flex-col">
      <Select
        classNames={{
          base: "max-w-xs",
          listboxWrapper: "scroll-pb-6 scroll-pt-28",
        }}
        items={filteredItems}
        label="Assigned to"
        labelPlacement="outside"
        listboxProps={{
          topContent,
          variant: "flat",
          classNames: {
            base: [
              "before:content-[''] before:rounded-t-medium before:fixed before:w-full before:h-14 before:z-10",
              "before:top-0 before:left-0 before:bg-gradient-to-b before:from-default-50",
            ],
          },
        }}
        placeholder="Select a user"
        selectedKeys={[selectedKey]}
        showScrollIndicators={false}
        variant="flat"
        onChange={handleSelectionChange}
        onOpenChange={setIsOpen}
      >
        {(item) => (
          <SelectItem key={item.id} textValue={item.name}>
            <div className="flex gap-2 items-center">
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.email}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>

      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
          cupidatat voluptate eu officia. Ut laborum sunt nostrud magna. Ex magna esse cillum enim
          incididunt pariatur qui veniam dolor. Exercitation id culpa et enim mollit duis duis
          aliquip. Magna ullamco est cupidatat laboris irure pariatur aliquip duis aute cillum.
          Officia irure do laboris ea nisi sunt reprehenderit laboris irure. Ex eiusmod in duis
          veniam excepteur. Sunt et et laboris culpa. Mollit excepteur occaecat elit anim officia.
          Laborum commodo proident cupidatat pariatur eu veniam id qui do culpa. Quis consectetur
          adipisicing anim ex ea velit excepteur. Deserunt laboris ex aute sunt laborum tempor ea
          enim dolore ut in. Id aliqua Lorem exercitation qui velit nostrud anim reprehenderit enim.
          Nisi elit fugiat deserunt elit. Sit excepteur ipsum enim excepteur irure irure sint veniam
          elit consequat ea id. Lorem ea qui sunt enim occaecat excepteur officia ex consequat
          nostrud. Tempor sint Lorem est culpa do.
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
          cupidatat voluptate eu officia. Ut laborum sunt nostrud magna. Ex magna esse cillum enim
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
        </AccordionItem>
      </Accordion>
      <Tabs classNames={{panel: "flex flex-col gap-5"}} variant="underlined">
        <Tab title="Test 1">
          <Textarea defaultValue="ASdasd" label="Default value (uncontrolled)" />
          <Input label="Text B Tab 1" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 1" value={textC} onValueChange={setTextC} />
        </Tab>
        <Tab title="Test 2">
          <Textarea label="Text B Tab 2" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 2" value={textC} onValueChange={setTextC} />
        </Tab>
        <Tab title="Test 3">
          <Textarea label="Text B Tab 3" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 3" value={textC} onValueChange={setTextC} />
        </Tab>
      </Tabs>

      <h2>Outside</h2>
      <Textarea label="Text A" placeholder="Text A" value={textA} onValueChange={setTextA} />
      <Textarea label="Text B" placeholder="Text B" value={textB} onValueChange={setTextB} />
      <Textarea label="Text C" placeholder="Text C" value={textC} onValueChange={setTextC} />

      <MyRadioGroup />

      <MyInput
        isClearable
        placeholder="Search..."
        radius="md"
        size="md"
        startContent={<SearchLinearIcon className="text-zinc-500" size={16} />}
      />

      <Button>Click Me!</Button>

      <MyButton2 color="primary">Press Me!</MyButton2>

      <Pagination
        showControls
        initialPage={page ?? 1}
        renderItem={({page, ...itemProps}) => {
          return <PaginationItem href={`/examples/perf?page=${page}`} {...itemProps} />;
        }}
        total={10}
      />
    </div>
  );
}
