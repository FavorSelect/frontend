"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useMemo, useState } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import Select, { SelectInstance } from "react-select";

const controlStyles = {
  base: "border rounded-lg bg-white hover:cursor-pointer",
  focus:
    "border-gray-300 hover:border-gray-300 focus:border-gray-300 focus:ring-0 focus:outline-none",
  nonFocus: "border-gray-300 hover:border-gray-400",
};
const placeholderStyles = "text-gray-500 pl-1 py-0.5 text-sm";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1 text-sm";
const dropdownIndicatorStyles = "text-gray-500 p-1 cursor-pointer";
const menuStyles = "mt-2 border border-gray-300 bg-white rounded-md text-sm";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles = "text-gray-500 p-1 cursor-pointer";
const indicatorSeparatorStyles = "bg-gray-300";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded hover:bg-scarlet-red hover:text-white",
  focus: "bg-gray-100 active:bg-gray-200",
  selected: "after:content-['✔'] after:ml-2 after:text-gray-500 text-gray-500",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

type SelectOption = {
  label: string;
  value: string;
};

type SingleSelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<
  React.ComponentProps<ControllerProps<TFieldValues, TName>["render"]>,
  "field"
> & {
  field: Omit<
    React.ComponentProps<
      ControllerProps<TFieldValues, TName>["render"]
    >["field"],
    "value"
  >;
} & {
  field: {
    value?: string;
  };
  options: SelectOption[];
  placeholder?: string;
};

export function SingleSelectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field: { onChange, ...field },
  options,
  placeholder,
}: SingleSelectFieldProps<TFieldValues, TName>) {
  const defaultOption = useMemo<SelectOption | null>(
    function () {
      if (!field.value) {
        return null;
      }
      if (!options || options.length === 0) {
        return null;
      }
      const selectedOption = options.find((option) => {
        return option.value === field.value;
      });
      return selectedOption || null;
    },
    [field.value, options]
  );

  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    defaultOption
  );

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const handleChange = (newValue: SelectOption | null) => {
    const selectedValue = newValue?.value;
    setSelectedOption(newValue);
    onChange(selectedValue);
  };
  const selectRef = React.useRef<SelectInstance<SelectOption, false> | null>(
    null
  );
  return (
    <Select
      isClearable
      isSearchable
      options={options}
      placeholder={placeholder || "Select an option"}
      value={selectedOption}
      onChange={handleChange}
      onBlur={field.onBlur}
      onMenuClose={() => {
        setTimeout(() => {
          selectRef.current?.blur();
        }, 0);
      }}
      ref={selectRef}
      closeMenuOnSelect={true}
      menuShouldBlockScroll={false}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          cn(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
    />
  );
}
