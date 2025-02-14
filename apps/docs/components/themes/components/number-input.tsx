import {Input} from "@heroui/react";

import {floatNumberPattern} from "../constants";

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function NumberInput({label, value, onChange}: NumberInputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (floatNumberPattern.test(value) || !value) {
      onChange(value);
    }
  }

  return <Input label={label} size="sm" value={value.toString()} onChange={handleChange} />;
}
