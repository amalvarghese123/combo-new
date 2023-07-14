const classNames = (...args) => {
  let hasOwn = {}.hasOwnProperty;
  let classes = [];
  for (let argIndex = 0; argIndex <= args.length; argIndex++) {
    let argument = args[argIndex];
    let isString = typeof argument === "string";
    let isObject =
      Object.prototype.toString.call(argument) === "[object Object]";
    if (isString) classes.push(argument);
    if (isObject) {
      for (let i in argument) {
        if (hasOwn.call(argument, i) && argument[i]) {
          classes.push(i);
        }
      }
    }
  }
  return classes.join(" ");
};

export default classNames;
