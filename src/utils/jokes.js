module.exports = jokes = {
    // distinguish between browsers and show differnt jokes
    browser : browser => {
        let message = null;
        switch (browser) {
          case "Chrome":
            message =
              "What happens when a Google employee breaks his arm? He gets a Chrome Cast.";
            break;
          case "Safari":
            message =
              "What happened when the lion ate the safari guide’s joke book? He felt funny.";
            break;
          default:
            message = "Your Browser is lame.";
        }
        return message;
      },
    
      // distinguish between Operation Systems and show differnt jokes
      osSystem: osSystem => {
        let message = "Your Operation system is wack.";
        if (osSystem.toLowerCase().includes("mac")) {
          message =
            "I tried cooking mac and cheese last week - The Apple Store are still refusing to fix my laptop";
        }
        if (osSystem.toLowerCase().includes("windows")) {
          message = "Someone stole my Microsoft Office and they're gonna pay. You have my Word.";
        }
        return message;
      },
    
      // distinguish between Languages and show differnt jokes
      language: lang => {
          console.log(lang)
        let message = "Your Language Setting is gnarly.";
        if (lang.toLowerCase().startsWith("de")) {
          message = "Hans Get Ze Flammenwerfer";
        }
        if (lang.toLowerCase().startsWith("en")) {
          message = "What does the Fox say? EN EN EN EN E EN EN E";
        }
        return message;
      }
}