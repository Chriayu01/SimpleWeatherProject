const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apikey = "48aa469e25e2f325bd9c791d9b98e517";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1>The temperature in " + query + " is " + temp + "degree celcius</h1>");
      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write("<img src="+ imageURL +">");

      res.send();
    })
  });
})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
