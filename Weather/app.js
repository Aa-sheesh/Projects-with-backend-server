const express = require("express");
const app = express();
const https = require("node:https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=8fb9de0123727034665d3ba3fc2f80ef&units=metric";
    
    https.get(url,function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const code = weatherData.weather[0].icon;
            const codeUrl ="https://openweathermap.org/img/wn/"+code+"@2x.png";
            res.write("<h1>The temperature is "+temp+ " .</h1>");
            res.write("<h3>It would have "+desc+" today.</h3>");
            res.write("<img src="+codeUrl+">");
            res.send();
        });
    });
})

app.listen(3000,function(){
    console.log("Port has started!");
})



