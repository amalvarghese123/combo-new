const flatPickerConfig = (
  time = true,
  calendar = false,
  putMinDate = true,
  staticValue = false
) => {
  let dateConf = {
    inline: false,
    mode: "single",
    enableTime: time,
    showInput: false,
    noCalendar: calendar,
    time_24hr: true,
    static: staticValue,
  };
  if (putMinDate) {
    dateConf["minDate"] = "today";
  }
  return dateConf;
};
export default flatPickerConfig;
