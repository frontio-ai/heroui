import type {ValidationResult} from "@react-types/shared";

import React, {Key} from "react";
import {Meta} from "@storybook/react";
import {useForm} from "react-hook-form";
import {useFilter} from "@react-aria/i18n";
import {autocomplete, input, button} from "@heroui/theme";
import {Pokemon, usePokemonList, animalsData, usersData, Animal, User} from "@heroui/stories-utils";
import {useAsyncList} from "@react-stately/data";
import {useInfiniteScroll} from "@heroui/use-infinite-scroll";
import {PetBoldIcon, SearchLinearIcon, SelectorIcon} from "@heroui/shared-icons";
import {Avatar} from "@heroui/avatar";
import {Button} from "@heroui/button";
import {Form} from "@heroui/form";

import {Autocomplete, AutocompleteItem, AutocompleteProps, AutocompleteSection} from "../src";

export default {
  title: "Components/Autocomplete",
  component: Autocomplete,
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
    isReadonly: {
      control: {
        type: "boolean",
      },
    },
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Autocomplete>;

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

const defaultProps = {
  ...input.defaultVariants,
  ...autocomplete.defaultVariants,
  className: "max-w-xs",
};

const items = animalsData.map((item) => (
  <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
));

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

const LargeDatasetTemplate = (args: AutocompleteProps & {numItems: number}) => {
  const largeDataset = generateLargeDataset(args.numItems);

  return (
    <Autocomplete label={`Search from ${args.numItems} items`} {...args}>
      {largeDataset.map((item, index) => (
        <AutocompleteItem key={index}>{item.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

const Template = (args: AutocompleteProps) => (
  <Autocomplete label="Favorite Animal" {...args}>
    <AutocompleteItem key="red_panda">Red Panda</AutocompleteItem>
    <AutocompleteItem key="cat">Cat</AutocompleteItem>
    <AutocompleteItem key="dog">Dog</AutocompleteItem>
    <AutocompleteItem key="crocodile">Crocodile</AutocompleteItem>
    <AutocompleteItem key="elephant">Elephant</AutocompleteItem>
    <AutocompleteItem key="lion">Lion</AutocompleteItem>
    <AutocompleteItem key="tiger">Tiger</AutocompleteItem>
    <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
    <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
    <AutocompleteItem key="koala">Koala</AutocompleteItem>
    <AutocompleteItem key="panda">Panda</AutocompleteItem>
    <AutocompleteItem key="giraffe">Giraffe</AutocompleteItem>
    <AutocompleteItem key="otter">Otter</AutocompleteItem>
    <AutocompleteItem key="snake">Snake</AutocompleteItem>
    <AutocompleteItem key="dolphin">Dolphin</AutocompleteItem>
    <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
    <AutocompleteItem key="whale">Whale</AutocompleteItem>
    <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
    <AutocompleteItem key="shark">Shark</AutocompleteItem>
  </Autocomplete>
);

const DynamicTemplate = ({color, variant, ...args}: AutocompleteProps<Animal>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultItems={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
  </Autocomplete>
);

const FormTemplate = ({color, variant, ...args}: AutocompleteProps) => {
  return (
    <form
      className="w-full max-w-xs items-start flex flex-col gap-4"
      onSubmit={(e) => {
        alert(`Submitted value: ${e.target["favorite-animal"].value}`);
        e.preventDefault();
      }}
    >
      <Autocomplete
        color={color}
        label="Favorite Animal"
        name="favorite-animal"
        variant={variant}
        {...args}
      >
        {items}
      </Autocomplete>
      <button className={button({className: "max-w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const FullyControlledTemplate = () => {
  // Store Autocomplete input value, selected option, open state, and items
  // in a state tracker
  const [fieldState, setFieldState] = React.useState({
    selectedKey: "",
    inputValue: "",
    items: animalsData,
  });

  // Implement custom filtering logic and control what items are
  // available to the Autocomplete.
  const {startsWith} = useFilter({sensitivity: "base"});

  // Specify how each of the Autocomplete values should change when an
  // option is selected from the list box
  const onSelectionChange = (key) => {
    // eslint-disable-next-line no-console
    console.log(`onSelectionChange ${key}`);
    setFieldState((prevState) => {
      let selectedItem = prevState.items.find((option) => option.value === key);

      return {
        inputValue: selectedItem?.label || "",
        selectedKey: key,
        items: animalsData.filter((item) => startsWith(item.label, selectedItem?.label || "")),
      };
    });
  };

  // Specify how each of the Autocomplete values should change when the input
  // field is altered by the user
  const onInputChange = (value) => {
    // eslint-disable-next-line no-console
    console.log(`onInputChange ${value}`);
    setFieldState((prevState: any) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: animalsData.filter((item) => startsWith(item.label, value)),
    }));
  };

  // Show entire list if user opens the menu manually
  const onOpenChange = (isOpen, menuTrigger) => {
    if (menuTrigger === "manual" && isOpen) {
      setFieldState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items: animalsData,
      }));
    }
  };

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={fieldState.inputValue}
      items={fieldState.items}
      label="Favorite Animal"
      placeholder="Search an animal"
      selectedKey={fieldState.selectedKey}
      variant="bordered"
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  );
};

const MirrorTemplate = ({color, variant, ...args}: AutocompleteProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Autocomplete
      className="max-w-xs"
      color={color}
      label="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Autocomplete>
    <Autocomplete
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      placeholder="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Autocomplete>
  </div>
);

const LabelPlacementTemplate = ({color, variant, ...args}: AutocompleteProps) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Autocomplete color={color} label="Select an animal" variant={variant} {...args}>
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Autocomplete>
      </div>
    </div>
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Autocomplete
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Autocomplete>
      </div>
    </div>
  </div>
);

const AsyncFilteringTemplate = ({color, variant, ...args}: AutocompleteProps<SWCharacter>) => {
  let list = useAsyncList<SWCharacter>({
    async load({signal, filterText}) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search=${filterText}`, {signal});
      let json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Autocomplete
      className="max-w-xs"
      color={color}
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label="Select a character"
      placeholder="Type to search..."
      variant={variant}
      onInputChange={list.setFilterText}
      {...args}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const AsyncLoadingTemplate = ({color, variant, ...args}: AutocompleteProps<Pokemon>) => {
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
    <Autocomplete
      className="max-w-xs"
      color={color}
      defaultItems={items}
      isLoading={isLoading}
      label="Pick a Pokemon"
      placeholder="Select a Pokemon"
      scrollRef={scrollerRef}
      variant={variant}
      onOpenChange={setIsOpen}
      {...args}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const StartContentTemplate = ({color, variant, ...args}: AutocompleteProps) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultSelectedKey={"cat"}
    label="Favorite Animal"
    startContent={<PetBoldIcon className="text-xl" />}
    variant={variant}
    {...args}
  >
    {items}
  </Autocomplete>
);

const EndContentTemplate = ({color, variant, ...args}: AutocompleteProps) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultSelectedKey={"cat"}
    endContent={<PetBoldIcon className="text-xl" />}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {items}
  </Autocomplete>
);

const DynamicTemplateWithDescriptions = ({color, variant, ...args}: AutocompleteProps<Animal>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultItems={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => (
      <AutocompleteItem key={item.value} description={item.description}>
        {item.label}
      </AutocompleteItem>
    )}
  </Autocomplete>
);

const ItemStartContentTemplate = ({color, variant, ...args}: AutocompleteProps<Animal>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    label="Select country"
    variant={variant}
    {...args}
  >
    <AutocompleteItem
      key="argentina"
      startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
    >
      Argentina
    </AutocompleteItem>
    <AutocompleteItem
      key="venezuela"
      startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
    >
      Venezuela
    </AutocompleteItem>
    <AutocompleteItem
      key="brazil"
      startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
    >
      Brazil
    </AutocompleteItem>
    <AutocompleteItem
      key="switzerland"
      startContent={
        <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
      }
    >
      Switzerland
    </AutocompleteItem>
    <AutocompleteItem
      key="germany"
      startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
    >
      Germany
    </AutocompleteItem>
    <AutocompleteItem
      key="spain"
      startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
    >
      Spain
    </AutocompleteItem>
    <AutocompleteItem
      key="france"
      startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
    >
      France
    </AutocompleteItem>
    <AutocompleteItem
      key="italy"
      startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
    >
      Italy
    </AutocompleteItem>
    <AutocompleteItem
      key="mexico"
      startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
    >
      Mexico
    </AutocompleteItem>
  </Autocomplete>
);

const ControlledTemplate = ({color, variant, ...args}: AutocompleteProps<Animal>) => {
  const [value, setValue] = React.useState<Key | null>("cat");

  const handleSelectionChange = (key: Key | null) => {
    setValue(key);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Autocomplete
        fullWidth
        color={color}
        defaultItems={animalsData}
        label="Favorite Animal"
        selectedKey={value}
        variant={variant}
        onSelectionChange={handleSelectionChange}
        {...args}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <p className="text-default-500">Selected: {value}</p>
    </div>
  );
};

const CustomItemsTemplate = ({color, variant, ...args}: AutocompleteProps<User>) => (
  <Autocomplete
    className="max-w-xs mt-8"
    color={color}
    defaultItems={usersData}
    label="Assigned to"
    placeholder="Select a user"
    variant={variant}
    {...args}
    labelPlacement="outside"
  >
    {(item) => (
      <AutocompleteItem key={item.id} textValue={item.name}>
        <div className="flex gap-2 items-center">
          <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
          <div className="flex flex-col">
            <span className="text-small">{item.name}</span>
            <span className="text-tiny text-default-400">{item.email}</span>
          </div>
        </div>
      </AutocompleteItem>
    )}
  </Autocomplete>
);

const WithSectionsTemplate = ({color, variant, ...args}: AutocompleteProps<User>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    <AutocompleteSection showDivider title="Mammals">
      <AutocompleteItem key="Lion">Lion</AutocompleteItem>
      <AutocompleteItem key="Tiger">Tiger</AutocompleteItem>
      <AutocompleteItem key="Elephant">Elephant</AutocompleteItem>
      <AutocompleteItem key="Kangaroo">Kangaroo</AutocompleteItem>
      <AutocompleteItem key="Panda">Panda</AutocompleteItem>
      <AutocompleteItem key="Giraffe">Giraffe</AutocompleteItem>
      <AutocompleteItem key="Zebra">Zebra</AutocompleteItem>
      <AutocompleteItem key="Cheetah">Cheetah</AutocompleteItem>
    </AutocompleteSection>
    <AutocompleteSection title="Birds">
      <AutocompleteItem key="Eagle">Eagle</AutocompleteItem>
      <AutocompleteItem key="Parrot">Parrot</AutocompleteItem>
      <AutocompleteItem key="Penguin">Penguin</AutocompleteItem>
      <AutocompleteItem key="Ostrich">Ostrich</AutocompleteItem>
      <AutocompleteItem key="Peacock">Peacock</AutocompleteItem>
      <AutocompleteItem key="Swan">Swan</AutocompleteItem>
      <AutocompleteItem key="Falcon">Falcon</AutocompleteItem>
      <AutocompleteItem key="Flamingo">Flamingo</AutocompleteItem>
    </AutocompleteSection>
  </Autocomplete>
);

const WithCustomSectionsStylesTemplate = ({color, variant, ...args}: AutocompleteProps<User>) => {
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <Autocomplete
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      scrollShadowProps={{
        isEnabled: false,
      }}
      variant={variant}
      {...args}
    >
      <AutocompleteSection
        classNames={{
          heading: headingClasses,
        }}
        title="Mammals"
      >
        <AutocompleteItem key="Lion">Lion</AutocompleteItem>
        <AutocompleteItem key="Tiger">Tiger</AutocompleteItem>
        <AutocompleteItem key="Elephant">Elephant</AutocompleteItem>
        <AutocompleteItem key="Kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="Panda">Panda</AutocompleteItem>
        <AutocompleteItem key="Giraffe">Giraffe</AutocompleteItem>
        <AutocompleteItem key="Zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="Cheetah">Cheetah</AutocompleteItem>
      </AutocompleteSection>
      <AutocompleteSection
        classNames={{
          heading: headingClasses,
        }}
        title="Birds"
      >
        <AutocompleteItem key="Eagle">Eagle</AutocompleteItem>
        <AutocompleteItem key="Parrot">Parrot</AutocompleteItem>
        <AutocompleteItem key="Penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="Ostrich">Ostrich</AutocompleteItem>
        <AutocompleteItem key="Peacock">Peacock</AutocompleteItem>
        <AutocompleteItem key="Swan">Swan</AutocompleteItem>
        <AutocompleteItem key="Falcon">Falcon</AutocompleteItem>
        <AutocompleteItem key="Flamingo">Flamingo</AutocompleteItem>
      </AutocompleteSection>
    </Autocomplete>
  );
};

const WithAriaLabelTemplate = ({color, variant, ...args}: AutocompleteProps) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {items}
  </Autocomplete>
);

const CustomStylesTemplate = ({color, variant, ...args}: AutocompleteProps<User>) => {
  return (
    <Autocomplete
      className="max-w-xs"
      classNames={{
        base: "min-h-16",
        listboxWrapper: "max-h-[400px]",
      }}
      color={color}
      defaultItems={usersData}
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
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const CustomStylesWithCustomItemsTemplate = ({color, ...args}: AutocompleteProps<User>) => {
  return (
    <Autocomplete
      aria-label="Select an employee"
      className="max-w-xs"
      classNames={{
        listboxWrapper: "max-h-[400px]",
      }}
      color={color}
      defaultItems={usersData}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[48px]",
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      placeholder="Enter employee name"
      popoverProps={{
        offset: 10,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      startContent={<SearchLinearIcon className="text-default-400 text-xl" strokeWidth="2.5" />}
      {...args}
      radius="full"
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.team}</span>
              </div>
            </div>
            <Button
              className="border-small font-medium shadow-small"
              radius="full"
              size="sm"
              variant="bordered"
            >
              Add
            </Button>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const WithReactHookFormTemplate = (args: AutocompleteProps) => {
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
      <Autocomplete {...args} {...register("withDefaultValue")}>
        {items}
      </Autocomplete>
      <Autocomplete {...args} {...register("withoutDefaultValue")}>
        {items}
      </Autocomplete>
      <Autocomplete {...args} {...register("requiredField", {required: true})}>
        {items}
      </Autocomplete>

      {errors.requiredField && <span className="text-danger">This field is required</span>}
      <button className={button({class: "w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const ServerValidationTemplate = (args: AutocompleteProps) => {
  const [serverErrors, setServerErrors] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    setServerErrors({
      animals: "Please select a valid animal.",
    });
  };

  return (
    <Form
      className="flex flex-col items-start gap-2"
      validationErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <Autocomplete {...args} className="max-w-xs" label="Favorite Animal" name="animals">
        <AutocompleteItem key="red_panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
      </Autocomplete>
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
    </Form>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    placeholder: "Select an animal",
  },
};

export const Required = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    selectedKey: "cat",
    isReadOnly: true,
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

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const AsyncFiltering = {
  render: AsyncFilteringTemplate,

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

export const EndContent = {
  render: EndContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: "bordered",
    defaultSelectedKey: "dog",
    errorMessage: "Please select a valid animal",
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "Select your favorite animal",
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
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.valueMissing) {
        return "Value is required";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    label: "Select Cat or Dog",
    validate: (value) => {
      if (value.selectedKey == null || value.selectedKey === "cat" || value.selectedKey === "dog") {
        return;
      }

      return "Please select a valid animal";
    },
  },
};

export const WithServerValidation = {
  render: ServerValidationTemplate,
  args: {
    ...defaultProps,
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

export const Controlled = {
  render: ControlledTemplate,

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

export const CustomStyles = {
  render: CustomStylesTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
  },
};

export const CustomStylesWithCustomItems = {
  render: CustomStylesWithCustomItemsTemplate,

  args: {
    ...defaultProps,
  },
};

export const FullyControlled = {
  render: FullyControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const OneThousandList = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Search...",
    numItems: 1000,
  },
};

export const TenThousandList = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Search...",
    numItems: 10000,
  },
};

export const CustomMaxListboxHeight = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Search...",
    numItems: 1000,
    maxListboxHeight: 400,
  },
};

export const CustomItemHeight = {
  render: LargeDatasetTemplate,
  args: {
    ...defaultProps,
    placeholder: "Search...",
    numItems: 1000,
    maxListboxHeight: 400,
    itemHeight: 40,
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
