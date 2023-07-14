// import React, { useState, useRef } from "react";
// import "./index.css";

// const VirtualizedDropdownOld = ({ options, onSelect = () => {} }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const dropdownRef = useRef(null);
//   const [loadedOptions, setLoadedOptions] = useState(options.slice(0, 50)); // Initial loaded options

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     onSelect(option);
//     setIsOpen(false);
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleScroll = () => {
//     if (dropdownRef.current) {
//       const { scrollTop } = dropdownRef.current;
//       const { offsetHeight, scrollHeight } = dropdownRef.current.parentNode;

//       if (scrollTop >= scrollHeight - offsetHeight) {
//         // Reached the bottom, load more options
//         const remainingOptions = options.slice(
//           loadedOptions.length,
//           loadedOptions.length + 50
//         ); // Load additional 50 options
//         setLoadedOptions((prevOptions) => [
//           ...prevOptions,
//           ...remainingOptions,
//         ]);
//       }
//     }
//   };

//   return (
//     <div className="dropdown">
//       <div className="selected-option" onClick={toggleDropdown}>
//         {selectedOption ? selectedOption.label : "Select an option"}
//       </div>
//       {isOpen && (
//         <div
//           className="dropdown-options"
//           onScroll={handleScroll}
//           ref={dropdownRef}
//         >
//           {loadedOptions.map((option) => (
//             <div
//               key={option.value}
//               className="dropdown-option"
//               onClick={() => handleOptionClick(option)}
//             >
//               {option.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VirtualizedDropdownOld;

import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const VirtualizedDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const optionsContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen && highlightedIndex !== -1) {
      const highlightedOption =
        optionsContainerRef.current.children[highlightedIndex];
      if (highlightedOption) {
        highlightedOption.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (dropdownRef.current) {
      const { scrollTop } = dropdownRef.current;
      const { offsetHeight, scrollHeight } = dropdownRef.current.parentNode;

      if (scrollTop >= scrollHeight - offsetHeight) {
        // Reached the bottom, load more options
        // You can implement a pagination or lazy loading mechanism here
      }
    }
  };

  const handleKeyDown = (event) => {
    const { keyCode } = event;

    switch (keyCode) {
      case 38: // Up arrow key
        event.preventDefault();
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case 40: // Down arrow key
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          Math.min(prevIndex + 1, options.length - 1)
        );
        break;
      case 13: // Enter key
        event.preventDefault();
        if (highlightedIndex !== -1) {
          handleOptionClick(options[highlightedIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="dropdown">
      <div
        className="selected-option"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {selectedOption ? selectedOption.label : "Select an option"}
      </div>
      {isOpen && (
        <div
          className="dropdown-options"
          onScroll={handleScroll}
          ref={dropdownRef}
        >
          <div className="options-container" ref={optionsContainerRef}>
            {options.map((option, index) => (
              <div
                key={option.value}
                className={`dropdown-option ${
                  index === highlightedIndex ? "highlighted" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualizedDropdown;
