import React from "react";

const ComboboxButton = React.forwardRef(function ComboboxBtn(
  { combobox: Combobox, isLoading, filteredData, query, onClick },
  ref
) {
  return (
    <Combobox.Button
      ref={ref}
      className="absolute combobox-arrow inset-y-0 right-0 flex items-center pr-2 bg-transparent"
    >
      {!isLoading && filteredData?.length === 0 && query.length >= 2 ? (
        <span className=" text-2xl" onClick={onClick}>
          &#43;
        </span>
      ) : (
        <div className="flex flex-col">
          <i className="fal fa-angle-up up_down_arrow leading-loose"></i>
          <i className="fal fa-angle-down up_down_arrow leading-loose"></i>
        </div>
      )}
    </Combobox.Button>
  );
});
export default ComboboxButton;
