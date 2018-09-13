// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser({urlencoded: true}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/timestamp/:dateString', (req, res) => {
  let dateString = req.params.dateString;
  try {
    let date;
    if(dateString == '') date = new Date();
    else date = new Date(dateString);
    
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
    
  } catch(e) {
    res.json({"error": "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
