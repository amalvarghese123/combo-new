const hasOwn = (object, key) => {
  return object ? Object.prototype.hasOwnProperty.call(object, key) : "";
};
export default hasOwn;
