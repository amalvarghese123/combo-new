const coloring =
  (fn) =>
  ({ background }) =>
  (...text) =>
    fn(
      `%c${text.join("")}`,
      `color:${background};font-weight:bold;font-size:16px`
    );
const colors = {
  primary: "#007bff",
  success: "#28a745",
  warning: "#ffc107",
  error: "#f10000",
  info: "#17a2b8",
};
// const dir = (key = "", value = {}) => {
//   logs.primary(`++++++++++++start:${key}++++++++++++++`);
//   console.dir(value);
//   logs.primary(`++++++++++++end:${key}++++++++++++++`);
// };
const log = Object.keys(colors).reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: coloring(console.log)({ background: colors[curr] }),
  }),
  {}
);
export default log;
