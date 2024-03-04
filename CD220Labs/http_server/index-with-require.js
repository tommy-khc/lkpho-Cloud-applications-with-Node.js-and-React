const http = require("http");
const today = require("./today");

const requestListener = function (req, res) {
  res.writeHead(200);
  if (today.getTimeOfDay() === "morning") {
    res.end(`Good morning, World! The date today is ${today.getDate()}`);
  } else if (today.getTimeOfDay() === "afternoon") {
    res.end(`Good afternoon, World! The date today is ${today.getDate()}`);
  } else {
    res.end(`Good evening, World! The date today is ${today.getDate()}`);
  }
};

const port = 8080;
const server = http.createServer(requestListener);
console.log("server listening on port: " + port);
server.listen(port);
