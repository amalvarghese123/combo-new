export const getTodaysDate = () => {
  const current = new Date();
  const yr = current.getFullYear();
  const month = current.getMonth() + 1;
  const date = current.getDate();
  return `${yr}-${month < 10 ? `0${month}` : month}-${date}`;
};
