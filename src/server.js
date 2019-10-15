// sources:
// - https://dev.to/lenmorld/quick-server-with-node-and-express-in-5-minutes-17m7

// express is used to simplify setup and api
const express = require('express');
const server = express();

// set the port here
const port = 3000;

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

// default route should show message
server.get("/", (req, res) => {
    res.send('Hello World!')
});
 
// route /s shows users IP and its IP family
server.get("/s", (req, res) => {
    res.send('Your IP address is: '+ req.socket.address().address + ' (' + req.socket.address().family + ')');
 });

// route /s2 show error if local IP is registered 
server.get("/s2", (req,res) => {
    if(req.ip === "::1" || req.ip === '127.0.0.1'){
        res.send("404 - something went wrong.")
    }else{
        res.send("Congrats you have access! :)")
    }
})

 // to run the application execute 'npm install' and 'npm start'