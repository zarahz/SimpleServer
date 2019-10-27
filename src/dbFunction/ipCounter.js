// access db model
let ipCounter = require("../dbModel/ipCounter");

// functions to modify the ip Counter Data
module.exports = ipCounterFunctions = {
  //deletes entry with ip
  delete: ip => {
    ipCounter
      .findOneAndDelete({
        ip: ip
      })
      .then(doc => {
        console.log(doc);
      })
      .catch(err => {
        console.error(err);
      });
  },

  // updates or creates entries with the ip
  update: ip => {
    ipCounter
      .findOneAndUpdate(
        {
          ip: ip // search query
        },
        {
          ip: ip, // update with
          $inc: { counter: 1 }
        },
        {
          upsert: true // add new entry if ip not found
        }
      )
      .then(doc => {
        console.log(doc);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
