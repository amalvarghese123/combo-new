const { Fragment } = require("react");

const ComboxBoxSelectedChips = ({
  selectedItems,
  transformedLabel,
  removeItem,
  currentIndex,
  tagsCountLimit,
  setIsShowTags,
  isShowTags,
}) => (
  <ul className="list-none flex flex-wrap gap-2 mt-2">
    {selectedItems.map((el, idx) => (
      <Fragment key={idx}>
        <li
          className={`cursor-pointer border px-3 py-1 text-sm hover:bg-gray-100 bg-white rounded-2xl inline-flex items-center fs-12 ${
            idx === currentIndex ? "highlight bg-gray-100" : ""
          }`}
          data-hidden={
            !isShowTags && selectedItems.length - idx > tagsCountLimit
              ? "hide"
              : ""
          }>
          {transformedLabel(el)}
          <span className="ms-1 hover:light" onClick={() => removeItem(el)}>
            &times;
          </span>
        </li>
      </Fragment>
    ))}
    {selectedItems.length > tagsCountLimit && (
      <button
        type="button"
        style={{
          border: "0px solid rgb(85, 85, 85)",
          padding: "0px 0px",
          borderRadius: "6px",
          backgroundColor: "transparent",
          color: "#0077b6",
          fontSize: "12px",
        }}
        onClick={() => setIsShowTags((prev) => !prev)}>
        Show {!isShowTags ? "more" : "less"}...
      </button>
    )}
  </ul>
);
export default ComboxBoxSelectedChips;
