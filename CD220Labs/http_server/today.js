module.exports.getDate = function getDate() {
  let aestTime = new Date().toLocaleString("en-US", {
    timeZone: "Australia/Brisbane",
  });
  return new Date(aestTime);
};

//to find out if now is in morning, afternoo or evening
module.exports.getTimeOfDay = function getTimeOfDay() {
  let aestTime = new Date().toLocaleString("en-US", {
    timeZone: "Australia/Brisbane",
  });
  let hour = new Date(aestTime).getHours();
  if (hour < 12 && hour > 4) {
    return "morning";
  } else if (hour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
};
