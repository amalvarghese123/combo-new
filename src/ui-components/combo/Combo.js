import { Transition, Combobox } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Virtu from "./Virtu";

const removeArrayItem = (arr, idx) => {
  const array = [...arr];
  array.splice(idx, 1);
  return array;
};

const Combo = ({
  dropdownHeight = "400px",
  options = [],
  getValue = (el) => el.toLowerCase(),
  getLabel = (el) => el,
  keyOfValue = "value",
  keyOfLabel = "id",
  onSelect = () => {},
  onApply = () => {},
  onCreateNew,
  customInput: CustomInput,
  initialValue,
  isLoading,
  isVirtualized = false,
  isMultiSelect = false,
}) => {
  const [scrollElement, setScrollElement] = useState(null);
  const [selectedValue, setSelectedValue] = useState(isMultiSelect ? [] : "");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(options); //dropdown items

  //check if array of objects or strings
  const itemType = useMemo(() => {
    if (items.length) {
      if (typeof items[0] === "string") return "string";
      else return "object";
    }
  }, [items]);

  //removeDuplicate values from array of strings or objects
  const unique = (values = []) => {
    if (!values.length) return [];
    if (typeof values[0] === "string") {
      return [...new Set(values)];
    } else {
      //if aray of objects
      const temp = [...values];
      values.forEach((obj, idx) => {
        if (
          values.some(
            (o, index) => getValue(o) === getValue(obj) && idx !== index
          )
        ) {
          temp.splice(idx, 1);
        }
      });
      return temp;
    }
  };

  //split csv string to separate strings
  const splitComma = (optionItems = []) => {
    const temp = [];
    optionItems.forEach((item, idx) => {
      if (itemType === "string") {
        temp.push(...item.split(",")); //even if comma not present it will be array with single value(OR we can do if contains , check)
      } else {
        //if item is object
        console.log("getLabel(item)", typeof getLabel(item));
        if (getLabel(item).contains(",")) {
          const splitValues = getValue(item).split(",");
          const splitLabels = getLabel(item).split(",");
          splitValues.forEach((val, idx) => {
            const obj = { ...item };
            obj[keyOfValue] = val;
            obj[keyOfLabel] = splitLabels[idx];
            temp.push(obj);
          });
        } else {
          temp.push(item);
        }
      }
    });
    setItems(unique(temp));
  };

  useEffect(() => {
    splitComma(options);
  }, [options]);

  useEffect(() => {
    console.log({ initialValue });
    if (isMultiSelect && initialValue?.length) {
      const initialValuesTransformed = initialValue.map((el) => getValue(el)); //for multi select
      setSelectedValue((prev) =>
        unique([...prev, ...initialValuesTransformed])
      );
    } else if (!isMultiSelect && initialValue !== "") {
      setSelectedValue(getValue(initialValue)); //for single select
    }
  }, [initialValue]);

  const filteredItems = useMemo(
    () =>
      query === ""
        ? items
        : items.filter((item) => getValue(item).includes(query)),
    [query, items]
  );
  const activeClass = ({ active }) =>
    active ? "bg-teal-600 text-white" : "text-gray-900";

  const handleSelect = (e) => {
    setSelectedValue(e); //changing combobox value
    if (isMultiSelect && onApply) return;
    onSelect(e); //passing value to parent
  };
  //chips handling for multi select
  const getSelectedItemFromValue = useCallback(
    (val) => {
      return items.find((item) => getValue(item) === val);
    },
    [items, getValue]
  );
  const getLabelsFromStringValue = (val) => {
    const selectedItem = getSelectedItemFromValue(val); //getting selected item from selected value
    console.log({ selectedItem });
    return getLabel(selectedItem); //getting selected label from selected item
  };
  const labelsFromValue = useMemo(
    () =>
      isMultiSelect &&
      selectedValue.map((el) =>
        itemType === "string" ? getLabel(el) : getLabelsFromStringValue(el)
      ), //calling recursively not possible inside usecallback, usememo
    [selectedValue] //ismultiselect above is just to check if it is array. same as Array.isArray
  );

  const removeValue = (valueIdx) => {
    const updatedValues = removeArrayItem(selectedValue, valueIdx);
    setSelectedValue((prev) => updatedValues);
  };

  const addNewItemToOptions = (val) => {
    const newValue =
      itemType === "string"
        ? val
        : {
            [keyOfValue]: val,
            [keyOfLabel]: val,
          };
    setItems((prev) => [...prev, newValue]);
  };
  const addNewItem = (e) => {
    onCreateNew(e); //sending value to parent. dispatch action to add to database
    addNewItemToOptions(e); //adding new item to dropdown
    setSelectedValue((prev) => [...prev, e]); //add new value to chip
    setQuery("");
  };
  const shouldRenderApply = useMemo(
    () => isMultiSelect && onApply,
    [isMultiSelect, onApply]
  );
  const shouldRenderCreateNewOption = useMemo(
    () => !isLoading && query && !filteredItems.length,
    [isLoading, query, filteredItems]
  );
  const renderSearchInput = useMemo(
    () =>
      CustomInput ? <CustomInput /> : <input type="text" className="w-full" />,
    [CustomInput]
  );
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
              // className="w-full px-4 py-2.5 focus:outline-none h-16"
              // displayValue={labelsFromValue}
              as={Fragment}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            >
              {renderSearchInput}
            </Combobox.Input>
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
              {shouldRenderCreateNewOption &&
                (onCreateNew ? (
                  <CreateNewOption addNewItem={addNewItem} query={query} />
                ) : (
                  <div>No items found</div>
                ))}
              {shouldRenderApply && (
                <ApplyFilter
                  className="absolute top-3 right-5"
                  onClick={() => onApply(selectedValue)}
                />
              )}
            </Combobox.Options>
          </Transition>
        </>
      </Combobox>
      {isMultiSelect && (
        <SelectedItemsChips
          labelsFromValue={labelsFromValue}
          selectedValue={selectedValue}
          removeValue={removeValue}
        />
      )}
    </>
  );
};

export default Combo;

const SelectedItemsChips = ({
  labelsFromValue,
  selectedValue,
  removeValue,
}) => {
  return (
    <ul className="flex gap-2 w-96">
      {selectedValue.map((val, idx) => (
        <li
          key={idx}
          className="bg-green-300 rounded-lg px-2 py-1"
          onClick={() => removeValue(idx)}
        >
          {labelsFromValue[idx]}
        </li>
      ))}
    </ul>
  );
};

const ApplyFilter = ({ onClick, ...rest }) => {
  return (
    <section {...rest}>
      <button
        className="bg-blue-400 text-white p-2 rounded-md"
        onClick={onClick}
      >
        Apply
      </button>
    </section>
  );
};

const CreateNewOption = ({ addNewItem, query }) => {
  return (
    <button
      className="bg-green-300 p-2 rounded-md"
      onClick={() => addNewItem(query)}
    >
      Add new option
    </button>
  );
};
