const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function (req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
            }
        }]
    }

    const jsonData=JSON.stringify(data);
    
    const url="https://us21.api.mailchimp.com/3.0/lists/f66ab55bbd"
    const options = {
        method:"POST",
        auth:"Aashish:0b4b55f1043d39484663cefcd86d4d9b-us21"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure.html",function(req,res){ 
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Running at port 3000");
});

// ApI Key
// 0b4b55f1043d39484663cefcd86d4d9b-us21
// Audience ID
// f66ab55bbd.