import {Autocomplete, AutocompleteItem} from "@heroui/react";
import {useFilter} from "@heroui/react-aria-i18n";

export const animals = [
  {label: "Cat", key: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", key: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", key: "elephant", description: "The largest land animal"},
  {label: "Lion", key: "lion", description: "The king of the jungle"},
  {label: "Tiger", key: "tiger", description: "The largest cat species"},
  {label: "Giraffe", key: "giraffe", description: "The tallest land animal"},
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {label: "Penguin", key: "penguin", description: "A group of aquatic flightless birds"},
  {label: "Zebra", key: "zebra", description: "A several species of African equids"},
  {
    label: "Shark",
    key: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {label: "Otter", key: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
  {label: "Crocodile", key: "crocodile", description: "A large semiaquatic reptile"},
];

export default function App() {
  // Store Autocomplete input value, selected option, open state, and items
  // in a state tracker
  const [fieldState, setFieldState] = React.useState({
    selectedKey: "",
    inputValue: "",
    items: animals,
  });

  // Implement custom filtering logic and control what items are
  // available to the Autocomplete.
  const {startsWith} = useFilter({sensitivity: "base"});

  // Specify how each of the Autocomplete values should change when an
  // option is selected from the list box
  const onSelectionChange = (key) => {
    setFieldState((prevState) => {
      let selectedItem = prevState.items.find((option) => option.value === key);

      return {
        inputValue: selectedItem?.label || "",
        selectedKey: key,
        items: animals.filter((item) => startsWith(item.label, selectedItem?.label || "")),
      };
    });
  };

  // Specify how each of the Autocomplete values should change when the input
  // field is altered by the user
  const onInputChange = (value) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: animals.filter((item) => startsWith(item.label, value)),
    }));
  };

  // Show entire list if user opens the menu manually
  const onOpenChange = (isOpen, menuTrigger) => {
    if (menuTrigger === "manual" && isOpen) {
      setFieldState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items: animals,
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
      {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  );
}
