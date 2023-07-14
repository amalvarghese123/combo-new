import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Combobox } from "@headlessui/react";

const Virtu = ({
  scrollElement,
  activeClass,
  filteredItems = [],
  getLabel,
  getValue,
}) => {
  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    // debug: true,
    getScrollElement: () => scrollElement,
    estimateSize: () => 36,
    overscan: 5,
  });
  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <Combobox.Option
          key={virtualRow.index}
          style={{
            top: "0",
            left: "0",
            position: "absolute",
            width: "100%",
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }}
          value={getValue(filteredItems[virtualRow.index])}
          className={activeClass}
        >
          <span className="font-normal block truncate">
            {getLabel(filteredItems[virtualRow.index])}
          </span>
        </Combobox.Option>
      ))}
    </div>
  );
};
export default Virtu;
