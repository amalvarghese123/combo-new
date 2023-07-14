import { useState, useEffect } from "react";

const useChangeDropdownPosition = (inputContainerRef, dropdownHeight = 200) => {
  const [isReverse, setIsReverse] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      if (inputContainerRef.current) {
        const distanceFromInputToBottom =
          window.innerHeight -
          inputContainerRef.current.getBoundingClientRect().bottom;
        if (distanceFromInputToBottom < dropdownHeight) {
          setIsReverse(true);
        } else {
          setIsReverse(false);
        }
      }
    };
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
    /*eslint-disable react-hooks/exhaustive-deps */
  }, []);
  return { isReverse };
};
export default useChangeDropdownPosition;
