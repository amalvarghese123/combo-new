import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, useRef, useState } from "react";
import { Combobox } from "@headlessui/react";

const VirtualizedDropdownNew = ({
  options = [],
  isCombobox = false,
  dropdownHeight = "400px",
  scrollElement,
}) => {
  const parentRef = useRef();
  // const [scrollElement, setScrollElement] = useState();

  const rowVirtualizer = useVirtualizer({
    count: options.length, //total no. of items
    getScrollElement: () => scrollElement,
    // getScrollElement: () => parentRef.current,
    estimateSize: () => 35, //height of one item in px
    overscan: 5,
  });

  return (
    <>
      {/* <div
        ref={setScrollElement}
        // ref={parentRef}
        style={{
          height: dropdownHeight,
          overflow: "auto",
        }}
      > */}
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) =>
          isCombobox ? (
            <Combobox.Option
              className={({ active }) => {
                if (active) {
                  console.log("active item:", options[virtualItem.index]);
                }
                return active
                  ? "bg-red-500 border-solid border-green-800 border-2"
                  : "bg-inherit border-solid border-green-800 border-2";
              }}
              // className={activeClass}
              key={virtualItem.index}
              value={options[virtualItem.index]}
              ref={virtualItem.measureElement}
              as="li"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                // height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div
                className=""
                style={{ height: options?.[virtualItem.index] }}
              >
                {options[virtualItem.index]}
              </div>
            </Combobox.Option>
          ) : (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {options[virtualItem.index]}
            </div>
          )
        )}
      </div>
      {/* </div> */}
    </>
  );
};
export default VirtualizedDropdownNew;
