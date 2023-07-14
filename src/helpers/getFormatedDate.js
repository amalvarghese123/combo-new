import format from "date-fns/format";

import addMinutes from "date-fns/addMinutes";
import isValid from "date-fns/isValid";

const getFormattedDate = (date, formatInput) => {
  if (!isValid(new Date(date))) {
    return "Not provided";
  }
  // const isDev = process.env.NODE_ENV === "development";
  let dt = new Date(date);
  const formatted = format(addMinutes(dt, dt.getTimezoneOffset()), formatInput);
  // console.log(addMinutes(dt, dt.getTimezoneOffset()));
  return formatted;
};

export default getFormattedDate;
