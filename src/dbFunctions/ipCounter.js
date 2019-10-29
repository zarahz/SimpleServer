// access db model
let dbSetup = require("../dbModels/dbSetup");

// functions to modify the ip Counter Data
module.exports = ipCounterFunctions = {
  //deletes entry with ip
  delete: ip => {
    dbSetup
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

  // updates or creates entries with the ip for the counter
  updateCounter: (ip) => {
    dbSetup
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
  },

  updatePixelAccess: (ip) => {
    dbSetup
    .findOneAndUpdate(
      {
        ip: ip // search query
      },
      {
        ip: ip, // update with
        pixel_access: new Date()
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


