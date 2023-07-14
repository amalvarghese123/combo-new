import React, { Fragment } from "react";

const ComboboxInput = React.forwardRef(function CI(
  {
    combobox: Combobox,
    valueHandler,
    addNewItemHandler,
    additionalProps,
    inputPlaceholder,
    onKeyDownCapture,
    hasInputControl,
    placeholder,
    components,
    value,
    ...rest
  },
  ref
) {
  return (
    <Combobox.Input
      as={Fragment}
      autoComplete="off"
      onChange={valueHandler}
      onKeyDownCapture={onKeyDownCapture}
      onKeyDown={addNewItemHandler}
      placeholder={inputPlaceholder}
      value={value}
      ref={ref}
      {...additionalProps}
      {...rest}
    >
      {hasInputControl ? (
        <components.InputControl
          value={value || ""}
          label={placeholder || `Select ${placeholder} `}
          placeholder={placeholder || `Select ${placeholder} `}
        />
      ) : (
        <input style={{ border: "1px solid #000" }} />
      )}
    </Combobox.Input>
  );
});
export default ComboboxInput;
