import { useState } from "react";
import { Combobox } from "@headlessui/react";
import VirtualizedDropdownNew from ".";

const MyCombobox = ({ items = [], dropdownHeight, isVirtualized = false }) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [query, setQuery] = useState("");
  const [scrollElement, setScrollElement] = useState();

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  const activeClass = ({ active }) =>
    active
      ? "bg-teal-600 text-white border-solid border-green-800 border-2"
      : "text-gray-900 border-solid border-green-800 border-2";

  const handleChange = (e) => setQuery(e.target.value);
  return (
    <Combobox
      value={selectedItem}
      onChange={setSelectedItem}
      className="border-solid border-gray-800 border-2 w-96"
      as="div"
    >
      {({ activeIndex, activeOption }) => {
        console.log("act option:", activeIndex, activeOption);
        return (
          <>
            <Combobox.Input
              onChange={handleChange}
              className="border-solid border-red-800 border-1 w-full"
            />
            <Combobox.Options
              unmount={true}
              className="bg-gray-100 border-2 overflow-auto"
              style={{ height: dropdownHeight }}
              ref={setScrollElement}
            >
              {isVirtualized ? (
                <VirtualizedDropdownNew
                  dropdownHeight={dropdownHeight}
                  options={filteredItems}
                  isCombobox={true}
                  scrollElement={scrollElement}
                />
              ) : (
                // <div
                //   style={{ height: dropdownHeight }}
                //   className="overflow-auto"
                // >
                <>
                  {filteredItems.map((el) => (
                    <Combobox.Option
                      className={activeClass}
                      key={el}
                      value={el}
                    >
                      {el}
                    </Combobox.Option>
                  ))}
                </>
              )}
              {/* </div> */}
            </Combobox.Options>
          </>
        );
      }}
    </Combobox>
  );
};
export default MyCombobox;
