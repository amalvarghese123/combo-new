import { Transition, Combobox } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Virtu from "./Virtu";

const Combo = ({
  dropdownHeight = "400px",
  items = [],
  getValue = (el) => el,
  getLabel = (el) => el,
  onSelect = () => {},
  initialValue,
  isLoading,
  isVirtualized = false,
  isMultiSelect = false,
}) => {
  const [scrollElement, setScrollElement] = useState(null);
  const [selectedValue, setSelectedValue] = useState(isMultiSelect ? [] : "");
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log({ initialValue });
    if (isMultiSelect && initialValue?.length) {
      const initialValuesTransformed = initialValue.map((el) => getValue(el)); //for multi select
      setSelectedValue((prev) => [...prev, ...initialValuesTransformed]);
    } else if (!isMultiSelect && initialValue !== "") {
      setSelectedValue(getValue(initialValue)); //for single select
    }
  }, [initialValue]);

  const filteredItems = useMemo(
    () =>
      query === ""
        ? items
        : items.filter((item) => {
            return getValue(item).toLowerCase() === query.toLowerCase();
          }),
    [query, items]
  );

  const activeClass = ({ active }) =>
    active ? "bg-teal-600 text-white" : "text-gray-900";

  const handleSelect = (e) => {
    setSelectedValue(e); //changing combobox value
    onSelect(e); //passing value to parent
  };

  const getLabelFromValue = (val) => {
    if (Array.isArray(val)) {
      return val.map((el) => getLabelFromValue(el)); //calling recursively
    } else {
      const selectedItem = items.find((item) => getValue(item) === val); //getting selected item from selected value
      return getLabel(selectedItem); //getting selected label from selected item
    }
  };

  useEffect(() => {
    console.log("selectedValue: ", selectedValue);
  }, [selectedValue]);

  return (
    <>
      <Combobox
        value={selectedValue}
        onChange={handleSelect}
        name="ad-category"
        className="relative mt-4"
        multiple={isMultiSelect}
      >
        <>
          <div className="border relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              placeholder="Select items"
              className=" w-full px-4 py-2.5 focus:outline-none h-16"
              // displayValue={getLabelFromValue}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              +
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options
              unmount={true}
              ref={setScrollElement}
              style={{ height: dropdownHeight }}
              className="absolute z-10 w-full mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {isLoading ? (
                "Loading..."
              ) : isVirtualized ? (
                <Virtu
                  scrollElement={scrollElement}
                  activeClass={activeClass}
                  filteredItems={filteredItems}
                  getLabel={getLabel}
                  getValue={getValue}
                />
              ) : (
                filteredItems.map((el) => (
                  <Combobox.Option
                    className={activeClass}
                    key={el}
                    value={getValue(el)}
                  >
                    {getLabel(el)}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </>
      </Combobox>
      {isMultiSelect && (
        <ul className="flex gap-2 w-96">
          {getLabelFromValue(selectedValue).map((label, idx) => (
            <li key={idx} className="bg-green-300 rounded-lg px-2 py-1">
              {label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Combo;
