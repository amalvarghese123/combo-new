export const getYears = (s = 1998) => {
  const years = [];
  let start = s || 1998;
  const current = new Date().getFullYear();
  while (start < current) {
    start = start + 1;
    years.push(start.toString());
  }
  return years;
};
