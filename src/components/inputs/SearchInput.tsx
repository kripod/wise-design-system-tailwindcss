import { Search } from "@transferwise/icons";
import * as React from "react";

import { InputGroup } from "./InputGroup";
import { TextInput } from "./TextInput";

export interface SearchInputProps
  extends Pick<
    React.ComponentPropsWithRef<"input">,
    | "ref"
    | "name"
    | "placeholder"
    | "defaultValue"
    | "value"
    | "disabled"
    | "className"
    | "onKeyDown"
    | "onChange"
    | "onBlur"
  > {
  size?: "sm" | "md";
  shape?: "rectangle" | "pill";
}

export const SearchInput = React.forwardRef(function SearchInput(
  { shape = "pill", disabled, className, ...restProps }: SearchInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <InputGroup
      addonStart={{
        content: <Search size={24} />,
        initialContentWidth: 24,
      }}
      disabled={disabled}
      className={className}
    >
      <TextInput
        ref={ref}
        role="searchbox"
        inputMode="search"
        shape={shape}
        {...restProps}
      />
    </InputGroup>
  );
});
