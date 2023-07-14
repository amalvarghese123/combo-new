const getScheduleStatusWithCounts = (schedules = []) => {
  let newSchedules = [];
  let statuses = ["Processing", "Rejected", "Selected"];

  for (let status of statuses) {
    let scheduleIndex = schedules?.findIndex(
      (schedule) =>
        schedule?._id?.status?.toLowerCase?.() === status?.toLowerCase?.()
    );
    if (scheduleIndex > -1) {
      newSchedules.push({
        count: schedules[scheduleIndex]?.count,
        status: schedules[scheduleIndex]?._id?.status,
      });
    } else {
      newSchedules.push({
        count: 0,
        status: status,
      });
    }
  }
  return newSchedules;
};
export default getScheduleStatusWithCounts;
