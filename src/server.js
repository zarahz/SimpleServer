// sources:
// - https://dev.to/lenmorld/quick-server-with-node-and-express-in-5-minutes-17m7

// express is used to simplify setup and api
const express = require("express");
const server = express();
// set the port here
const port = 10014;

// use the ipCounter object to access db functions
const ipCounterFunctions = require("./dbFunctions/ipCounter");

// use json file for server testing
const fs = require('fs');

//whoami functions
const visitorInfo = require("./utils/visitorInfo");
const jokes = require("./utils/jokes");

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

// default route should show message
server.get("/", (req, res) => {
  
  // update the counter by the ip address
  ipCounterFunctions.updateCounter(req.socket.address().address);
  res.sendFile("./views/Home.html", { root: __dirname });
});

// route /s shows users IP and its IP family
server.get("/s", (req, res) => {
  res.send(
    "Your IP address is: " +
      req.socket.address().address +
      " (" +
      req.socket.address().family +
      ")"
  );
});

// route /s2 show error if local IP is registered
server.get("/s2", (req, res) => {
  if (req.ip === "::1" || req.ip === "127.0.0.1") {
    res.send("404 - something went wrong.");
  } else {
    res.send("Congrats you have access! :)");
  }
});

// route /whoami shows multiple information about the visitor
server.get("/whoami", (req, res) => {
  let message = "visitor information \n\n";
  message += "user agent: " + JSON.stringify(visitorInfo.browser(req)) + "\n\n";

  // await all responses to create the message
  Promise.all([visitorInfo.speedTest(), visitorInfo.location(req.ip)]).then(
    values => {
      message += "speedtest: " + JSON.stringify(values[0]) + "\n\n";
      message += "location: " + JSON.stringify(values[1]) + "\n\n";
      res.send(message);
    }
  ).catch(e => {
      console.log(e);
  });
});

// route /adapt2user with different screens for different
// browsers, operating systems & different language settings
server.get("/adapt2user", (req, res) => {
  let message =
    "dynamic page, changing with different browser, operating systems and language settings. \n\n";

  // temp save important information
  let browser = visitorInfo.browser(req).family;
  let osSystem = visitorInfo.browser(req).os.family;
  let languageSetting = req.headers["accept-language"];

  // create the display message
  message += `Browser: ${jokes.browser(browser)}\n`;
  message += `Operating System: ${jokes.osSystem(osSystem)}\n`;
  message += `Language Setting: ${jokes.language(languageSetting)}`;
  res.send(message);
});

server.get("/trackingPixel", (req, res) => {
    console.log("getting dem PIXEL!")
    // saving data to Json file due to mongo db authorization issues
    //ipCounterFunctions.updatePixelAccess(req.socket.address().address);

    // Json File: 
  let file = 'tracking.json';

  // Check that the file exists locally
  if(!fs.existsSync(file)) {
    console.log("File not found");
  }// The file *does* exist
  else {
    // Read the file and do anything you want
    fs.readFile(file, 'utf8', function (err, content) {
      content = JSON.parse(content.toString())
      content[req.socket.address().address] = (new Date()).toString();
      console.log(`updating json with ${content}`);
      fs.writeFile(file, JSON.stringify(content), function(err, result) {
         if(err) console.log('error', err);
       });
     });
  }
});

// to run the application execute 'npm install' and 'npm start'
