// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const months = [
  'Jan', 'Feb',	'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',	'Oct',	'Nov',	'Dec'
];

function validDate(data) {
  return !isNaN(new Date(data).getTime());
}

app.get("/api", (req,res) => {
  res.json({
    unix: new Date().getTime(),
    utf: new Date()
  });
});

app.get("/api/:date", (req,res) => {

  if(!isNaN(req.params.date))
  {
    res.json({
      unix: req.params.date,
      utf: new Date(req.params.date)
    });
  } else {
    if(validDate(req.params.date))
      {
        const unix = new Date(req.params.date).getTime();
  
        res.json({
          unix: unix,
          utf: new Date(req.params.date)
        });
      } else {
        res.send({ 
          error : "Invalid Date"
        });
      }
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
