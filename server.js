const express = require("express");
const cors = require("cors");

const app = express();
const request = require("request");
const port = 5000;

// const webURL = "http://localhost:3001";
const webURL = "https://fredboat.com";
// const webURL = "http://localhost:8000";
app.use(cors());
// app.use(require("prerender-node"));
app.use(
  require("prerender-node")
    .set("prerenderToken", "Zgq04S9ttlPHDj4gXPeT")
    .set("protocol", "https")
    .set("host", "fredboat.com")
);
// app
// .use(require("prerender-node").set("forwardHeaders", true))

// app.use(require("prerender-node").whitelisted("/"));
app.get("*", (req, res) => {
  console.log(req.originalUrl);
  // if (req.originalUrl == "/static/media/logo.79b4fd81.svg") {
  // console.log("if");
  console.log("****", req.headers);
  // console.log(req.get("User-Agent"));
  // console.log(" prerendere req headers", req.headers);

  request(
    { method: "GET", uri: webURL + req.originalUrl },
    function (error, response, body) {
      // body is the decompressed response body

      //   console.log("the decoded data is: " + body);
      //   if (req.originalUrl == "/static/media/logo.79b4fd81.svg") {
      // console.log("res header", response.headers["content-type"]);
      // res.removeHeader("Content-Type");
      res.set("Content-Type", response.headers["content-type"] || "text/html");
      //   }
      res.send(body);
    }
  )
    .on("data", function (data) {
      // decompressed data as it is received
      // console.log("decoded chunk: " + data);
    })
    .on("response", function (response) {
      // unmodified http.IncomingMessage object
      response.on("data", function (data) {
        // compressed data as it is received
        // console.log("received " + data.length + " bytes of compressed data");
      });
    });
});

// export PRERENDER_SERVICE_URL=http://localhost:3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
