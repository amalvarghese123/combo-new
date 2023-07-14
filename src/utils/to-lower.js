const lower = (str) =>
  typeof str === "string" ? str.toLowerCase().replace(/\s+/g, " ") : "";

// const toLower = (str) => {
//   const convert = (item) =>
//     item
//       .toLowerCase()
//       .trim()
//       .replace(/\s{2,}/g, " ");
//   if (typeof str === "string") {
//     return convert(str);
//   } else if (Array.isArray(str)) {
//     return str.map((el) => convert(el));
//   } else {
//     return "";
//   }
// };

export default lower;
