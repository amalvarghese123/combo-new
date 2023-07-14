import React, { useCallback, useRef } from "react";
import { Combobox } from "@headlessui/react";
import isStr from "utils/isString";
import { useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const ComboboxVirtualization = ({
  isSingleSelect,
  getLabel,
  items,
  getValue,
  isSelected,
  selectedItems,
  setSelectedItems,
  onClick,
  onCreateNewOption,
  creatable,
}) => {
  useEffect(() => {
    console.log("virtualized");
  }, []);
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: items?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 20,
  });

  const transformedValue = useCallback(
    (inp) =>
      ["number", "string", "Number"]?.includes(typeof inp)
        ? inp?.toLowerCase()
        : getValue(inp)?.toLowerCase(),
    [getValue]
  );
  const handleClick = (e, val) => {
    onClick();
    e.stopPropagation();
    const itemIndex = selectedItems.findIndex((el) => {
      return transformedValue(el) === transformedValue(val);
    });
    if (itemIndex !== -1) {
      setSelectedItems((prev) => {
        const copy = [...prev];
        copy.splice(itemIndex, 1);
        return copy;
      });
    } else
      setSelectedItems((prev) => {
        const copy = [...prev];
        copy.push(val);
        return copy;
      });
  };
  return (
    <div ref={parentRef} className="virutalized-list">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().length === 0 && !creatable
          ? "No data found"
          : rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <Combobox.Option
                onClickCapture={(e) =>
                  handleClick(e, items?.[virtualRow.index])
                }
                key={virtualRow.index}
                ref={virtualRow.measureElement}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={({ active }) =>
                  ` absolute top-0 left-0 w-full hover:bg-gray-100  cursor-pointer select-none py-2 px-4 ${
                    active ? "bg-gray-100 " : ""
                  }`
                }
                value={items?.[virtualRow.index]}
              >
                {({ selected, active }) => (
                  <Option
                    virtualRow={virtualRow}
                    items={items}
                    active={active}
                    getValue={getValue}
                    getLabel={getLabel}
                    isSelected={isSelected}
                    selected={selected}
                    isSingleSelect={isSingleSelect}
                  />
                )}
              </Combobox.Option>
            ))}
      </div>
    </div>
  );
};
export default ComboboxVirtualization;
const Option = ({
  virtualRow,
  items,
  getValue,
  isSelected,
  getLabel,
  isSingleSelect,
  selected,
}) => {
  return (
    <div style={{ height: items?.[virtualRow.index] }}>
      <span className={`block text-start combobox-option-state`}>
        {!isSingleSelect
          ? isSelected(
              isStr(items?.[virtualRow.index])
                ? items?.[virtualRow.index]
                : getValue(items?.[virtualRow.index]) || selected
            ) && <i className="far fa-check  text-end me-2  "></i>
          : null}
        {isStr(items?.[virtualRow.index])
          ? items?.[virtualRow.index]
          : getLabel(items?.[virtualRow.index])}
      </span>
    </div>
  );
};
