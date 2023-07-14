import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import isValid from "date-fns/isValid";

export const timeAgo = (date) => {
  if (!isValid(new Date(date))) return date;
  return formatDistance(new Date(), new Date(date), { addSuffix: true });
};
export const formatDate = (date, formatTo) => {
  if (!isValid(new Date(date))) return date;
  if (process.env.NODE_ENV === "production")
    return format(new Date(date), formatTo);
  if (process.env.NODE_ENV === "development")
    return format(new Date(date), formatTo);
  return "ITS-INVALID";
};
