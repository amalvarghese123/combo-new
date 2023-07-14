import React, {
  useEffect,
  Fragment,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Combobox } from "@headlessui/react";
import ComboboxVirtualization from "./VirtualList";
import lower from "utils/to-lower";
import isStr from "utils/isString";
import separateStringByComma from "utils/separateStringByComma";
import useChangeDropdownPosition from "hooks/useChangeDropdownPosition";
import SaveSelectedItemsInState from "./SaveSelectedItemsInState";
import ComboboxButton from "./ComboBoxButton";
import ComboboxInput from "./ComboBoxInput";
import ComboxBoxSelectedChips from "./ComboxBoxSelectedChips";
import classNames from "helpers/classNames";

const ComboBoxAutocomplete = ({
  isTagsInside = false,
  tagsCountLimit = 6,
  virtualized,
  isSingleSelect,
  getLabel = (o) => o,
  getValue = (o) => o,
  // transformResponse,
  apiCallInfo,
  // inputPlaceholder,
  creatable = (o) => o,
  options,
  components,
  onSelect,
  getData,
  onApply,
  hideChips,
  placeholder,
  isLoading: loading,
  type,
  onCreateNewOption,
  maxDropdownHeight,
  disabled,
  fieldTouched,
  onTouch = () => {},
  ...rest
}) => {
  const { value } = rest;
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [isShowTags, setIsShowTags] = useState(false);
  const [query, setQuery] = useState("");
  const addListItemRef = useRef();
  const [data, setData] = useState(
    options?.map((el) =>
      (typeof el === "string" ? el : getLabel(el)).toLowerCase()
    ) || []
  );
  /*eslint-disable  no-unused-vars*/
  // const [isLoading] = useState(loading || false);
  const isLoading = useMemo(() => loading, [loading]);
  const timeout = useRef();
  const inputContainerRef = useRef();
  const { isReverse } = useChangeDropdownPosition(inputContainerRef);
  const dropdownOpenButtonRef = useRef();
  const newOptionRef = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    if (newOptionRef.current) onCreateNewOption(newOptionRef.current);
    /*eslint-disable react-hooks/exhaustive-deps */
  }, [newOptionRef.current]);

  const isMounted = useRef(false);
  useEffect(() => {
    // if (isMounted.current && !value?.length) {
    //   setSelectedItems(value);
    // }
    if (value?.length) {
      setSelectedItems(value);
    }
    isMounted.current = true;
    // if (value?.length) setSelectedItems(value);
  }, [value]);

  useEffect(() => {
    if (!apiCallInfo)
      setData(
        // options?.map((el) =>
        //   typeof el === "string" ? el.toLowerCase() : getLabel(el).toLowerCase()
        options
      );
  }, [options]);
  const valueHandler = (e) => {
    clearTimeout(timeout.current);
    const typedValue = e.target.value;
    setQuery(typedValue);
  };

  const transformedLabel = useCallback(
    (ele) => {
      return isStr(ele) ? ele : getLabel(ele);
    },
    [getLabel]
  );

  const transformedValue = useCallback(
    (option) => {
      return isStr(option)
        ? option?.toLowerCase()
        : getValue(option)?.toLowerCase();
    },
    [getValue]
  );

  const filteredData = useMemo(
    () => {
      return apiCallInfo || getData || query === ""
        ? data
        : data.filter((option) =>
            lower(transformedLabel(option)).includes(lower(query))
          );
    },
    /* eslint-disable  react-hooks/exhaustive-deps*/
    [query, data, apiCallInfo, transformedLabel]
  );

  const isObjectValue = useMemo(() => type === "object", [type]);
  const isSelected = useCallback(
    (currentItem) =>
      !isSingleSelect
        ? selectedItems.some(
            (item) => transformedValue(item) === transformedValue(currentItem)
          )
        : isObjectValue
        ? getValue(selectedItems) === currentItem
        : selectedItems === currentItem,
    [selectedItems, transformedValue]
  );

  const onSelection = (items) => {
    const isItemsArray = Array.isArray(items);
    if (isItemsArray) {
      const itemsArray = items.map((item) => transformedValue(item));
      const separatedItemsArray = [];

      const trueBlockFn = (value) => {
        value.length && separatedItemsArray.push(value.replace(/\.$/, ""));
      };
      const falseBlockFn = (el) => separatedItemsArray.push(el);

      itemsArray.forEach((el) => {
        separateStringByComma(el, trueBlockFn, falseBlockFn);
      });
      const uniqueItemsArray = [...new Set(separatedItemsArray)];

      const caseSensitiveArray = uniqueItemsArray.filter(
        (el, idx, array) =>
          !array.some(
            (item, index) =>
              item.toLowerCase() === el.toLowerCase() &&
              // (typeof el === "string" ? el : getValue(el)).toLowerCase() &&
              idx > index
          )
      );

      setSelectedItems(caseSensitiveArray);
    } else {
      setSelectedItems(isObjectValue ? items : transformedValue(items));
    }
  };
  const removeItem = (item) => {
    const index = selectedItems.indexOf(item);
    const removableItems = [...selectedItems];
    removableItems.splice(index, 1);
    setSelectedItems(removableItems);
    if (onApply) {
      onApply(removableItems);
    }
  };
  const captureOnKeyDown = (e, activeOption, activeIndex, open) => {
    if (e.key === "Enter" && !query && currentIndex !== undefined) {
      setSelectedItems((prev) => prev.filter((_, idx) => idx !== currentIndex));
    } else if (e.key === "Backspace" && selectedItems.length && !query.length) {
      setSelectedItems((prev) => {
        const copy = [...prev];
        copy.pop();
        return copy;
      });
    } else if (e.key === "ArrowLeft" && selectedItems.length) {
      if (open) dropdownOpenButtonRef?.current?.click();
      if (isShowTags) {
        setCurrentIndex((prev) => (prev ? prev - 1 : selectedItems.length - 1));
      } else {
        setCurrentIndex((prev) =>
          prev
            ? prev > selectedItems.length - tagsCountLimit
              ? prev - 1
              : selectedItems.length - 1
            : selectedItems.length - 1
        );
      }
    } else if (e.key === "ArrowRight" && selectedItems.length) {
      if (open) dropdownOpenButtonRef?.current?.click();
      if (isShowTags) {
        setCurrentIndex((prev) =>
          prev !== undefined && prev < selectedItems.length - 1 ? prev + 1 : 0
        );
      } else {
        setCurrentIndex((prev) =>
          prev !== undefined && prev < selectedItems.length - 1
            ? prev + 1
            : selectedItems.length - tagsCountLimit > 0
            ? selectedItems.length - tagsCountLimit
            : 0
        );
      }
    } else if (e.key === "Escape") {
      setIsShowTags(false);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      setCurrentIndex(undefined);
    }
  };

  const createOptionUtility = useCallback(
    (prevState) => {
      let arr = [...prevState];
      query.replace(/\s+|\?|\$/, "");
      const trueBlockFn = (value) => {
        if (!arr.includes(value) && value.length) {
          arr.push(creatable(value));
          // onCreateNewOption(creatable(value));
          newOptionRef.current = creatable(value);
        }
      };
      const falseBlockFn = (value) => {
        if (!arr.includes(value)) {
          arr.push(creatable(value));
          console.log("cccccccreateable(val)", creatable(value));
          newOptionRef.current = creatable(value);
        }
      };
      separateStringByComma(query, trueBlockFn, falseBlockFn);
      return arr;
    },
    [query]
  );

  const handleCreateNewOption = () => {
    setQuery("");
    if (isSingleSelect) {
      onCreateNewOption(query);
      // setSelectedItems(query);
    } else {
      setSelectedItems((prev) => createOptionUtility(prev));
    }
  };
  const hasInputControl = useMemo(
    () => (components?.hasOwnProperty("InputControl") ? true : false),
    [components]
  );
  const hasAddNewBtn = useMemo(
    () => (components?.hasOwnProperty("AddNewBtn") ? true : false),
    [components]
  );
  const additionalProps = {};
  if (!hasInputControl) {
    additionalProps.className = `rounded py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 ${
      isTagsInside ? "tagsinput" : ""
    }`;
  }
  const isMountedRef = useRef(false);

  useEffect(() => {
    //clearing query once option has been selected
    setQuery("");
    if (isMountedRef.current) {
      if (isSingleSelect) {
        onApply?.(selectedItems[0]);
      }
      if (onSelect) {
        onSelect(selectedItems);
      }
    } else {
      isMountedRef.current = true;
    }
  }, [selectedItems]);

  const addNewItemHandler = (e) => {
    if (filteredData?.length === 0 && query.length >= 2 && e.key === "Enter") {
      //eslint-disable no-unused-expressions
      addListItemRef?.current?.click();
    }
  };

  const onApplyClick = () => {
    if (!selectedItems.length) return;
    onApply(selectedItems);
    dropdownOpenButtonRef?.current?.click();
  };
  const onClear = () => {
    if (!selectedItems.length) {
      dropdownOpenButtonRef?.current?.click();
      return;
    }
    if (onApply) onApply([]);
    else onSelect([]);
    setSelectedItems([]);
    dropdownOpenButtonRef?.current?.click();
  };
  const comboboxBtnHandler = () => {
    addListItemRef?.current?.click();
    setQuery("");
  };
  const onClickControl = (open) => {
    if (!open) dropdownOpenButtonRef?.current?.click();
  };
  const AddNewOption = useMemo(
    () =>
      !isLoading &&
      filteredData?.length === 0 &&
      query.length >= 2 && (
        <div
          className="relative cursor-default select-none py-2 px-4 text-gray-700"
          ref={addListItemRef}
          onClick={handleCreateNewOption}
        >
          {hasAddNewBtn ? (
            <components.AddNewBtn label={query} />
          ) : (
            ` Add ${query}`
          )}
        </div>
      ),
    [isLoading, filteredData, query, handleCreateNewOption]
  );
  const EnterMinTwoCharacters = useMemo(
    () =>
      filteredData?.length === 0 &&
      query.length < 2 &&
      !isLoading &&
      apiCallInfo && <span>Please enter at least 2 characters</span>,
    [filteredData, query, isLoading, apiCallInfo]
  );
  const focusOnInput = () => {
    if (isSingleSelect) {
      dropdownOpenButtonRef?.current?.click();
    } else {
      inputRef.current?.focus();
    }
  };
  const getDisplayByValue = useMemo(() => {
    let displayValue = filteredData?.find(
      (option) => getValue?.(option) === value
    );
    return query ? query : getLabel(displayValue);
  }, [options, getLabel, getValue, value, query]);

  const shouldShowTagsOutside = useMemo(
    () =>
      !isTagsInside && !hideChips && !!selectedItems.length && !isSingleSelect
  );
  const shouldShowTagsInputInside = useMemo(
    () =>
      isTagsInside && !hideChips && !!selectedItems.length && !isSingleSelect
  );
  return (
    <div className="combo-wrapper w-full">
      <Combobox
        value={selectedItems}
        onChange={onSelection}
        multiple={!isSingleSelect}
        disabled={disabled}
      >
        {({ open, activeIndex, activeOption }) => {
          return (
            <>
              <div className="relative flex justify-start margin-s-0">
                <div
                  ref={inputContainerRef}
                  className={classNames(
                    `flex flex-wrap rounded-lg w-full relative cursor-default bg-white text-left sm:text-sm ${
                      !isTagsInside ? "p-0" : " p-2"
                    }`,
                    {
                      "tagsinput-wrapper border": isTagsInside,
                    }
                  )}
                >
                  {shouldShowTagsInputInside && (
                    <ComboxBoxSelectedChips
                      {...{
                        selectedItems,
                        transformedLabel,
                        removeItem,
                        currentIndex,
                        tagsCountLimit,
                        setIsShowTags,
                        isShowTags,
                      }}
                    />
                  )}
                  <ComboboxInput
                    combobox={Combobox}
                    ref={inputRef}
                    data-testid="comboinput"
                    additionalProps={additionalProps}
                    valueHandler={valueHandler}
                    addNewItemHandler={addNewItemHandler}
                    onClick={() => onClickControl(open)}
                    onKeyDownCapture={(e) => {
                      captureOnKeyDown(e, activeOption, activeIndex /* open */);
                    }}
                    onBlur={() => {
                      if (!fieldTouched) onTouch();
                    }}
                    placeholder={placeholder}
                    hasInputControl={hasInputControl}
                    components={components}
                    {...rest}
                    value={getDisplayByValue}
                  />

                  <ComboboxButton
                    combobox={Combobox}
                    ref={dropdownOpenButtonRef}
                    isLoading={isLoading}
                    filteredData={filteredData}
                    query={query}
                    onClick={comboboxBtnHandler}
                  />
                </div>
                <Combobox.Options
                  style={{
                    maxHeight: maxDropdownHeight ? maxDropdownHeight : "",
                    bottom: isReverse ? "100%" : "",
                  }}
                  className={`z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                >
                  {EnterMinTwoCharacters}
                  {isLoading && <Loader />}
                  {(creatable || onCreateNewOption) && AddNewOption}
                  {!isLoading &&
                    (virtualized ? (
                      <ComboboxVirtualization
                        items={filteredData}
                        getValue={getValue}
                        getLabel={getLabel}
                        isSelected={isSelected}
                        isSingleSelect={isSingleSelect}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        onClick={focusOnInput}
                        creatable={creatable}
                      />
                    ) : filteredData?.length === 0 && !creatable ? (
                      "No data found"
                    ) : (
                      filteredData?.map((item, idx) => (
                        <Combobox.Option
                          onClick={focusOnInput}
                          key={idx}
                          className={({ active }) =>
                            ` hover:bg-gray-100 relative cursor-pointer select-none py-2 px-4 ${
                              active ? "hover:bg-gray-100 " : ""
                            }`
                          }
                          value={transformedValue(item)}
                        >
                          {transformedLabel(item)}
                        </Combobox.Option>
                      ))
                    ))}
                  {!isSingleSelect &&
                    onApply &&
                    !(filteredData.length === 0 && !onCreateNewOption) && (
                      <SaveSelectedItemsInState
                        onApplyClick={onApplyClick}
                        onClear={onClear}
                      />
                    )}
                </Combobox.Options>
              </div>
              {shouldShowTagsOutside && (
                <ComboxBoxSelectedChips
                  {...{
                    selectedItems,
                    transformedLabel,
                    removeItem,
                    currentIndex,
                    tagsCountLimit,
                    setIsShowTags,
                    isShowTags,
                  }}
                />
              )}
            </>
          );
        }}
      </Combobox>
    </div>
  );
};
export default ComboBoxAutocomplete;

const Loader = () => (
  <div className="px-3 py-1 text-xs font-medium leading-none text-center text-primary-800 bg-blue-200 rounded-full animate-pulse ">
    loading...
  </div>
);
