/**
 * @param {Object} obj
 * @param {String} path
 * @returns extracted property
 */
const get = (obj = {}, path = "") => {
  return path
    ?.replace(/\[([^[\]]*)\]/g, ".$1.")
    .split(".")
    .filter((t) => t !== "")
    .reduce((prev, current) => prev && prev[current], obj);
};
export default get;
