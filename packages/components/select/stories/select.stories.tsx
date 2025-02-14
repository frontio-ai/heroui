/* eslint-disable react/display-name */
import type {ValidationResult} from "@react-types/shared";

import React, {ChangeEvent} from "react";
import {useForm} from "react-hook-form";
import {Meta} from "@storybook/react";
import {select, button} from "@heroui/theme";
import {PetBoldIcon, SelectorIcon} from "@heroui/shared-icons";
import {Avatar} from "@heroui/avatar";
import {Chip} from "@heroui/chip";
import {Button} from "@heroui/button";
import {Selection} from "@react-types/shared";
import {useInfiniteScroll} from "@heroui/use-infinite-scroll";
import {Pokemon, usePokemonList, animalsData, usersData, Animal, User} from "@heroui/stories-utils";
import {Form} from "@heroui/form";

import {Select, SelectedItems, SelectItem, SelectProps, SelectSection} from "../src";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Select>;

const defaultProps = {
  ...select.defaultVariants,
};

const items = animalsData.map((item) => <SelectItem key={item.value}>{item.label}</SelectItem>);

const Template = ({color, variant, ...args}: SelectProps) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    {items}
  </Select>
);

const DynamicTemplate = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select
    className="max-w-xs"
    color={color}
    items={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
  </Select>
);

const DynamicTemplateWithDescriptions = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select
    className="max-w-xs"
    color={color}
    items={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => (
      <SelectItem key={item.value} description={item.description}>
        {item.label}
      </SelectItem>
    )}
  </Select>
);

const ItemStartContentTemplate = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select className="max-w-xs" color={color} label="Select country" variant={variant} {...args}>
    <SelectItem
      key="argentina"
      startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
    >
      Argentina
    </SelectItem>
    <SelectItem
      key="venezuela"
      startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
    >
      Venezuela
    </SelectItem>
    <SelectItem
      key="brazil"
      startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
    >
      Brazil
    </SelectItem>
    <SelectItem
      key="switzerland"
      startContent={
        <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
      }
    >
      Switzerland
    </SelectItem>
    <SelectItem
      key="germany"
      startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
    >
      Germany
    </SelectItem>
    <SelectItem
      key="spain"
      startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
    >
      Spain
    </SelectItem>
    <SelectItem
      key="france"
      startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
    >
      France
    </SelectItem>
    <SelectItem
      key="italy"
      startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
    >
      Italy
    </SelectItem>
    <SelectItem
      key="mexico"
      startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
    >
      Mexico
    </SelectItem>
  </Select>
);

const ControlledTemplate = ({color, variant, ...args}: SelectProps<Animal>) => {
  const [value, setValue] = React.useState<Selection>(new Set(["cat"]));

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(new Set([e.target.value]));
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        fullWidth
        color={color}
        items={animalsData}
        label="Favorite Animal"
        selectedKeys={value}
        variant={variant}
        onChange={handleSelectionChange}
        {...args}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <p className="text-default-500">Selected: {value}</p>
    </div>
  );
};

const ControlledOpenTemplate = ({color, variant, ...args}: SelectProps<Animal>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex w-full max-w-xs items-center gap-2">
      <Select
        className="max-w-xs"
        color={color}
        isOpen={isOpen}
        label="Favorite Animal"
        variant={variant}
        onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
        {...args}
      >
        {items}
      </Select>
      <Button onPress={() => setIsOpen(!isOpen)}>{isOpen ? "Close" : "Open"}</Button>
    </div>
  );
};

const ControlledMultipleTemplate = ({color, variant, ...args}: SelectProps<Animal>) => {
  const [values, setValues] = React.useState<Selection>(new Set(["cat", "dog"]));

  const handleSelectionChange = (items: Selection) => {
    setValues(items);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        fullWidth
        color={color}
        items={animalsData}
        label="Favorite Animal"
        selectedKeys={values}
        selectionMode="multiple"
        variant={variant}
        onSelectionChange={handleSelectionChange}
        {...args}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <p className="text-default-500">Selected: {[...values].join(", ")}</p>
    </div>
  );
};

const FormTemplate = ({color, variant, ...args}: SelectProps) => {
  return (
    <form
      className="w-full max-w-xs items-end flex flex-col gap-4"
      onSubmit={(e) => {
        alert(`Submitted value: ${e.target["favorite-animal"].value}`);
        e.preventDefault();
      }}
    >
      <Select
        color={color}
        label="Favorite Animal"
        name="favorite-animal"
        variant={variant}
        {...args}
      >
        {items}
      </Select>
      <button className={button({className: "max-w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const ServerValidationTemplate = (args: SelectProps) => {
  const [submittedData, setSubmittedData] = React.useState<{animal: string} | null>(null);
  const [serverErrors, setServerErrors] = React.useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get("animal");

    if (!value) {
      setServerErrors({
        animal: "Please select a valid value",
      });

      return;
    }

    if (!value || (value !== "cat" && value !== "dog")) {
      setServerErrors({
        animal: "Please select a cat or dog",
      });
    } else {
      setServerErrors({});
      setSubmittedData({animal: value});
    }
  };

  return (
    <Form
      className="w-full flex flex-col items-start gap-2"
      validationErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <Select isRequired {...args} className="max-w-xs" label="Favorite Animal" name="animal">
        {items}
      </Select>
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
      {submittedData && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submittedData)}</code>
        </div>
      )}
    </Form>
  );
};

const ServerValidationTemplateWithMultiple = (args: SelectProps) => {
  const [submittedData, setSubmittedData] = React.useState<{animals: string[]} | null>(null);
  const [serverErrors, setServerErrors] = React.useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const values = formData.getAll("animals");

    if (!values.length || !values.every((v) => v === "cat" || v === "dog")) {
      setServerErrors({
        animals: "Please select only cats and/or dogs",
      });
    } else {
      setServerErrors({});
      setSubmittedData({animals: values as string[]});
    }
  };

  return (
    <Form
      className="w-full flex flex-col items-start gap-2"
      validationErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <Select
        {...args}
        className="max-w-xs"
        label="Favorite Animals"
        name="animals"
        selectionMode="multiple"
      >
        {items}
      </Select>
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
      {submittedData && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submittedData)}</code>
        </div>
      )}
    </Form>
  );
};

const MirrorTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Select className="max-w-xs" color={color} label="Select an animal" variant={variant} {...args}>
      {items}
    </Select>
    <Select
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      placeholder="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Select>
  </div>
);

const LabelPlacementTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="w-full max-w-5xl flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select color={color} label="Select an animal" variant={variant} {...args}>
          {items}
        </Select>
        <Select
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
    <div className="w-full max-w-5xl flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
    <div className="w-full max-w-5xl flex flex-col gap-3">
      <h3>With placeholder and description</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select
          color={color}
          description="Select your favorite animal"
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          color={color}
          description="Select your favorite animal"
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          description="Select your favorite animal"
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
  </div>
);

const StartContentTemplate = ({color, variant, ...args}: SelectProps) => (
  <Select
    className="max-w-xs"
    color={color}
    defaultSelectedKeys={["cat"]}
    label="Favorite Animal"
    startContent={<PetBoldIcon />}
    variant={variant}
    {...args}
  >
    {items}
  </Select>
);

const EmptyTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full justify-center flex gap-2">
    <Select
      hideEmptyContent
      className="max-w-xs"
      color={color}
      label="Hide empty content"
      variant={variant}
      {...args}
    >
      {[]}
    </Select>
    <Select
      className="max-w-xs"
      color={color}
      hideEmptyContent={false}
      label="Show empty content"
      variant={variant}
      {...args}
    >
      {[]}
    </Select>
  </div>
);

const CustomItemsTemplate = ({color, variant, ...args}: SelectProps<User>) => (
  <div className="w-full justify-center flex gap-2">
    <Select
      className="max-w-xs mt-8"
      color={color}
      items={usersData}
      label="Assigned to"
      variant={variant}
      {...args}
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
    <Select
      className="max-w-xs mt-8"
      color={color}
      items={usersData}
      label="Assigned to"
      placeholder="Assigned to"
      variant={variant}
      {...args}
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
  </div>
);

const WithSectionsTemplate = ({color, variant, ...args}: SelectProps<User>) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    <SelectSection showDivider title="Mammals">
      <SelectItem key="Lion">Lion</SelectItem>
      <SelectItem key="Tiger">Tiger</SelectItem>
      <SelectItem key="Elephant">Elephant</SelectItem>
      <SelectItem key="Kangaroo">Kangaroo</SelectItem>
      <SelectItem key="Panda">Panda</SelectItem>
      <SelectItem key="Giraffe">Giraffe</SelectItem>
      <SelectItem key="Zebra">Zebra</SelectItem>
      <SelectItem key="Cheetah">Cheetah</SelectItem>
    </SelectSection>
    <SelectSection title="Birds">
      <SelectItem key="Eagle">Eagle</SelectItem>
      <SelectItem key="Parrot">Parrot</SelectItem>
      <SelectItem key="Penguin">Penguin</SelectItem>
      <SelectItem key="Ostrich">Ostrich</SelectItem>
      <SelectItem key="Peacock">Peacock</SelectItem>
      <SelectItem key="Swan">Swan</SelectItem>
      <SelectItem key="Falcon">Falcon</SelectItem>
      <SelectItem key="Flamingo">Flamingo</SelectItem>
    </SelectSection>
  </Select>
);

const WithCustomSectionsStylesTemplate = ({color, variant, ...args}: SelectProps<User>) => {
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <Select
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      scrollShadowProps={{
        isEnabled: false,
      }}
      variant={variant}
      {...args}
    >
      <SelectSection
        classNames={{
          heading: headingClasses,
        }}
        title="Mammals"
      >
        <SelectItem key="Lion">Lion</SelectItem>
        <SelectItem key="Tiger">Tiger</SelectItem>
        <SelectItem key="Elephant">Elephant</SelectItem>
        <SelectItem key="Kangaroo">Kangaroo</SelectItem>
        <SelectItem key="Panda">Panda</SelectItem>
        <SelectItem key="Giraffe">Giraffe</SelectItem>
        <SelectItem key="Zebra">Zebra</SelectItem>
        <SelectItem key="Cheetah">Cheetah</SelectItem>
      </SelectSection>
      <SelectSection
        classNames={{
          heading: headingClasses,
        }}
        title="Birds"
      >
        <SelectItem key="Eagle">Eagle</SelectItem>
        <SelectItem key="Parrot">Parrot</SelectItem>
        <SelectItem key="Penguin">Penguin</SelectItem>
        <SelectItem key="Ostrich">Ostrich</SelectItem>
        <SelectItem key="Peacock">Peacock</SelectItem>
        <SelectItem key="Swan">Swan</SelectItem>
        <SelectItem key="Falcon">Falcon</SelectItem>
        <SelectItem key="Flamingo">Flamingo</SelectItem>
      </SelectSection>
    </Select>
  );
};

const WithAriaLabelTemplate = ({color, variant, ...args}: SelectProps) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    {items}
  </Select>
);

const CustomStylesTemplate = ({color, variant, ...args}: SelectProps<User>) => {
  return (
    <Select
      className="max-w-xs"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5",
        trigger: "min-h-16",
        listboxWrapper: "max-h-[400px]",
      }}
      color={color}
      items={usersData}
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
      variant={variant}
      {...args}
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
  );
};

const AsyncLoadingTemplate = ({color, variant, ...args}: SelectProps<Pokemon>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {items, hasMore, isLoading, onLoadMore} = usePokemonList({fetchDelay: 1500});

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    distance: 20,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  return (
    <Select
      className="max-w-xs"
      color={color}
      isLoading={isLoading}
      items={items}
      label="Pick a Pokemon"
      placeholder="Select a Pokemon"
      scrollRef={scrollerRef}
      selectionMode="single"
      variant={variant}
      onOpenChange={setIsOpen}
      {...args}
    >
      {(item) => (
        <SelectItem key={item.name} className="capitalize">
          {item.name}
        </SelectItem>
      )}
    </Select>
  );
};

const WithReactHookFormTemplate = (args: SelectProps) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      withDefaultValue: "cat",
      withoutDefaultValue: "",
      requiredField: "",
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form className="flex w-full max-w-xs flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Select data-testid="select-1" {...args} {...register("withDefaultValue")}>
        {items}
      </Select>

      <Select data-testid="select-2" {...args} {...register("withoutDefaultValue")}>
        {items}
      </Select>

      <Select data-testid="select-3" {...args} {...register("requiredField", {required: true})}>
        {items}
      </Select>

      {errors.requiredField && <span className="text-danger">This field is required</span>}
      <button className={button({class: "w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const ScrollableContainerTemplate = (args: SelectProps) => {
  const categories = [
    {
      target: "Animals",
      items: [
        {name: "Lion", emoji: "🦁"},
        {name: "Tiger", emoji: "🐅"},
        {name: "Elephant", emoji: "🐘"},
        {name: "Kangaroo", emoji: "🦘"},
        {name: "Panda", emoji: "🐼"},
        {name: "Giraffe", emoji: "🦒"},
        {name: "Zebra", emoji: "🦓"},
        {name: "Cheetah", emoji: "🐆"},
      ],
    },
    {
      target: "Birds",
      items: [
        {name: "Eagle", emoji: "🦅"},
        {name: "Parrot", emoji: "🦜"},
        {name: "Penguin", emoji: "🐧"},
        {name: "Ostrich", emoji: "🦢"},
        {name: "Peacock", emoji: "🦚"},
        {name: "Swan", emoji: "🦢"},
        {name: "Falcon", emoji: "🦅"},
        {name: "Flamingo", emoji: "🦩"},
      ],
    },
  ];
  const DEFAULT_CATEGORY = "Animals";

  return (
    <>
      <form className="h-full overflow-auto">
        <div className="flex justify-between h-[1500px]">
          <div className="flex items-center gap-2">
            <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
              <Select
                aria-label="Favourite Animals"
                className="w-52"
                defaultSelectedKeys={[DEFAULT_CATEGORY]}
                label="Category"
                name="Category"
                {...args}
              >
                {categories.map((category, idx, arr) => (
                  <SelectSection
                    key={category.target}
                    showDivider={idx !== arr.length - 1}
                    title={category.target}
                  >
                    {category.items.map((item) => (
                      <SelectItem key={item.name}>{`${item.emoji} ${item.name}`}</SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

interface LargeDatasetSchema {
  label: string;
  value: string;
  description: string;
}

function generateLargeDataset(n: number): LargeDatasetSchema[] {
  const dataset: LargeDatasetSchema[] = [];
  const items = [
    "Cat",
    "Dog",
    "Elephant",
    "Lion",
    "Tiger",
    "Giraffe",
    "Dolphin",
    "Penguin",
    "Zebra",
    "Shark",
    "Whale",
    "Otter",
    "Crocodile",
  ];

  for (let i = 0; i < n; i++) {
    const item = items[i % items.length];

    dataset.push({
      label: `${item}${i}`,
      value: `${item.toLowerCase()}${i}`,
      description: "Sample description",
    });
  }

  return dataset;
}

const LargeDatasetTemplate = (args: SelectProps & {numItems: number}) => {
  const largeDataset = generateLargeDataset(args.numItems);

  return (
    <div className="flex w-full max-w-full py-20 xl:px-32 lg:px-20 px-20">
      <Select label={`Select from ${args.numItems} items`} {...args}>
        {largeDataset.map((item) => (
          <SelectItem key={item.value}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

const ValidationBehaviorAriaTemplate = (args: SelectProps) => {
  // Custom validation example
  const CustomValidationExample = () => {
    return (
      <Select
        {...args}
        className="max-w-xs"
        label="Favorite Animal"
        placeholder="Select an animal"
        validate={(value) => {
          if (typeof value === "string" && value === "penguin") {
            return "Penguins are not allowed";
          }

          return null;
        }}
        validationBehavior="aria"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>
    );
  };

  //Custom validation example multiple
  const CustomValidationExampleMultiple = () => {
    return (
      <Select
        {...args}
        className="max-w-xs"
        label="Favorite Animal"
        placeholder="Select an animal"
        selectionMode="multiple"
        validate={(value) => {
          if (Array.isArray(value) && value.includes("penguin")) {
            return "Penguins are not allowed";
          }

          return null;
        }}
        validationBehavior="aria"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>
    );
  };

  // Server validation example
  const ServerValidationExample = () => {
    const [serverErrors, setServerErrors] = React.useState({});

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const value = formData.get("animal");

      if (value === "penguin") {
        setServerErrors({
          animal: "Server says: No penguins allowed!",
        });
      } else {
        setServerErrors({});
      }
    };

    return (
      <Form
        className="w-full flex flex-col items-start gap-2"
        validationErrors={serverErrors}
        onSubmit={onSubmit}
      >
        <Select className="max-w-xs" label="Select Animal" name="animal" validationBehavior="aria">
          <SelectItem key="penguin">Penguin</SelectItem>
          <SelectItem key="zebra">Zebra</SelectItem>
          <SelectItem key="shark">Shark</SelectItem>
        </Select>
        <button className={button({color: "primary"})} type="submit">
          Validate
        </button>
      </Form>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500">Custom Validation</h3>
        <p className="text-small text-default-400">Try selecting a penguin</p>
        <CustomValidationExample />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500">Custom Validation Multiple</h3>
        <p className="text-small text-default-400">Try selecting a penguin</p>
        <CustomValidationExampleMultiple />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500">Server Validation</h3>
        <p className="text-small text-default-400">Select a penguin and click validate</p>
        <ServerValidationExample />
      </div>
    </div>
  );
};

export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Multiple = {
  render: Template,

  args: {
    ...defaultProps,
    selectionMode: "multiple",
  },
};

export const Required = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    selectedKey: "cat",
    variant: "faded",
    isDisabled: true,
  },
};

export const DisabledOptions = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ["zebra", "tiger", "lion", "elephant", "crocodile", "whale"],
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: "bordered",
    defaultSelectedKeys: ["dog"],
    errorMessage: "Please select a valid animal",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const AsyncLoading = {
  render: AsyncLoadingTemplate,

  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const EmptyContent = {
  render: EmptyTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "Select your favorite animal",
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Select an animal",
    placeholder: "Select an animal",
  },
};

export const WithoutScrollShadow = {
  render: Template,

  args: {
    ...defaultProps,
    scrollShadowProps: {
      isEnabled: false,
    },
  },
};

export const WithItemDescriptions = {
  render: DynamicTemplateWithDescriptions,

  args: {
    ...defaultProps,
  },
};

export const WithItemStartContent = {
  render: ItemStartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithErrorMessage = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please select an animal",
  },
};

export const WithErrorMessageFunction = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: (value: ValidationResult) => {
      if (value.isInvalid) {
        return "Please select an animal";
      }
    },
  },
};

export const WithChips = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    selectionMode: "multiple",
    isMultiline: true,
    labelPlacement: "outside",
    classNames: {
      base: "max-w-xs",
      trigger: "min-h-12 py-2",
    },
    renderValue: (items: SelectedItems<User>) => {
      return (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip key={item.key}>{item.data?.name}</Chip>
          ))}
        </div>
      );
    },
  },
};

export const WithSections = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithCustomSectionsStyles = {
  render: WithCustomSectionsStylesTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithAriaLabel = {
  render: WithAriaLabelTemplate,

  args: {
    ...defaultProps,
    label: "Select an animal 🐹",
    "aria-label": "Select an animal",
  },
};

export const WithReactHookForm = {
  render: WithReactHookFormTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithServerValidation = {
  render: ServerValidationTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithServerValidationMultiple = {
  render: ServerValidationTemplateWithMultiple,

  args: {
    ...defaultProps,
  },
};

export const WithScrollableContainer = {
  render: ScrollableContainerTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const ControlledMultiple = {
  render: ControlledMultipleTemplate,

  args: {
    ...defaultProps,
  },
};

export const ControlledOpen = {
  render: ControlledOpenTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomSelectorIcon = {
  render: Template,

  args: {
    ...defaultProps,
    disableSelectorIconRotation: true,
    selectorIcon: <SelectorIcon />,
  },
};

export const CustomItems = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomRenderValue = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    classNames: {
      trigger: "h-12",
    },
    renderValue: (items: SelectedItems<User>) => {
      return items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <Avatar
            alt={item.data?.name}
            className="flex-shrink-0"
            size="sm"
            src={item.data?.avatar}
          />
          <div className="flex flex-col">
            <span>{item.data?.name}</span>
            <span className="text-default-500 text-tiny">({item.data?.email})</span>
          </div>
        </div>
      ));
    },
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    renderValue: (items: SelectedItems<User>) => {
      return items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <Avatar
            alt={item.data?.name}
            className="flex-shrink-0"
            size="sm"
            src={item.data?.avatar}
          />
          <div className="flex flex-col">
            <span>{item.data?.name}</span>
            <span className="text-default-500 text-tiny">({item.data?.email})</span>
          </div>
        </div>
      ));
    },
  },
};

export const OneThousandList = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Select an item...",
    numItems: 1000,
    isVirtualized: true,
  },
};

export const TenThousandList = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Select an item...",
    numItems: 10000,
    isVirtualized: true,
  },
};

export const CustomMaxListboxHeight = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Select an item...",
    numItems: 1000,
    isVirtualized: true,
    maxListboxHeight: 400,
  },
};

export const CustomItemHeight = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Select an item...",
    numItems: 1000,
    isVirtualized: true,
    maxListboxHeight: 400,
    itemHeight: 40,
  },
};

const AVATAR_DECORATIONS: {[key: string]: string[]} = {
  arcane: ["jinx", "atlas-gauntlets", "flame-chompers", "fishbones", "hexcore", "shimmer"],
  anime: ["cat-ears", "heart-bloom", "in-love", "in-tears", "soul-leaving-body", "starry-eyed"],
  "lofi-vibes": ["chromawave", "cozy-cat", "cozy-headphones", "doodling", "rainy-mood"],
  valorant: [
    "a-hint-of-clove",
    "blade-storm",
    "cypher",
    "frag-out",
    "omen-cowl",
    "reyna-leer",
    "vct-supernova",
    "viper",
    "yoru",
    "carnalito2",
    "a-hint-of-clove2",
    "blade-storm2",
    "cypher2",
    "frag-out2",
    "omen-cowl2",
    "reyna-leer2",
    "vct-supernova2",
    "viper2",
    "yoru2",
    "carnalito3",
    "a-hint-of-clove3",
    "blade-storm3",
    "cypher3",
    "frag-out3",
    "omen-cowl3",
    "reyna-leer3",
    "vct-supernova3",
    "viper3",
    "yoru3",
    "carnalito4",
    "a-hint-of-clove4",
    "blade-storm4",
    "cypher4",
    "frag-out4",
    "omen-cowl4",
    "reyna-leer4",
    "vct-supernova4",
    "viper4",
    "yoru4",
  ],
  spongebob: [
    "flower-clouds",
    "gary-the-snail",
    "imagination",
    "musclebob",
    "sandy-cheeks",
    "spongebob",
  ],
  arcade: ["clyde-invaders", "hot-shot", "joystick", "mallow-jump", "pipedream", "snake"],
  "street-fighter": ["akuma", "cammy", "chun-li", "guile", "juri", "ken", "m.bison", "ryu"],
};

export const NonVirtualizedVsVirtualizedWithSections = {
  render: () => {
    const SelectComponent = ({isVirtualized}: {isVirtualized: boolean}) => (
      <Select
        disallowEmptySelection
        className="max-w-xs"
        color="secondary"
        defaultSelectedKeys={["jinx"]}
        isVirtualized={isVirtualized}
        label={`Avatar Decoration ${isVirtualized ? "(Virtualized)" : "(Non-virtualized)"}`}
        selectedKeys={["jinx"]}
        selectionMode="single"
        variant="bordered"
      >
        {Object.keys(AVATAR_DECORATIONS).map((key) => (
          <SelectSection
            key={key}
            classNames={{
              heading: "uppercase text-secondary",
            }}
            title={key}
          >
            {AVATAR_DECORATIONS[key].map((item) => (
              <SelectItem key={item} className="capitalize" color="secondary" variant="bordered">
                {item.replace(/-/g, " ")}
              </SelectItem>
            ))}
          </SelectSection>
        ))}
      </Select>
    );

    return (
      <div className="flex gap-4 w-full">
        <SelectComponent isVirtualized={false} />
        <SelectComponent isVirtualized={true} />
      </div>
    );
  },
};

export const ValidationBehaviorAria = {
  render: ValidationBehaviorAriaTemplate,
  args: {
    ...defaultProps,
  },
};

export const PopoverTopOrBottom = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 p-8">
        <div className="w-48">
          <Template {...args} />
        </div>
      </div>
      <div className="absolute top-1/2 p-8">
        <div className="w-48">
          <Template {...args} />
        </div>
      </div>
    </div>
  ),
};
