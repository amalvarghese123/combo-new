import React from "react";

const SaveSelectedItemsInState = ({ onClear, onApplyClick }) => {
  return (
    <div className="d-flex align-items-center actions">
      <div className="ms-auto">
        <button className="btn btn-light me-2 border-0" onClick={onClear}>
          Clear
        </button>
        <button className="btn btn-primary border-0" onClick={onApplyClick}>
          Apply
        </button>
      </div>
    </div>
  );
};
export default SaveSelectedItemsInState;
