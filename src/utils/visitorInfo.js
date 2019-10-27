// imports for whoami
// iplocation enables info about the location data
const iplocation = require("iplocation").default;
// user agent enables information about the browser and operating system
const useragent = require("useragent");
// speed test enables information about the provider, internet speed and more
const speedTest = require("speedtest-net");

// exports an object filled with functions
module.exports = visitorInfo = {
  //returns location info
  location: ip => {
    return new Promise((resolve, reject) => {
      iplocation(ip)
        .then(ipLocationres => {
          resolve(ipLocationres);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // returns browser info
  browser: req => {
    return useragent.parse(req.headers["user-agent"]);
  },

  // returns internet provider infos and speed
  speedTest: () => {
    let test = speedTest({ maxTime: 5000 });
    return new Promise(resolve => {
      test.on("data", data => {
        resolve(data);
      });
    });
  }
};
