const bodyParser = require("body-parser");
const express = require("express");
const cool = require("cool-ascii-faces");
const app = express();
const port = process.env.PORT || 8080;

//const API_DOC_PORTAL = "https://documenter.getpostman.com/view/19586040/UVsPQkGD";

app.use(bodyParser.json());

const BASE_API_URL = "/api/v1"; 

app.use("/",express.static('public'));


app.get("/cool", (req,res) => {
    console.log("Requested / route");
    res.send(`<html>
                <body>
                    <h1>`+cool()+`</h1>
                </body>
            </html>`);
})



var contacts = [
    {
        name: "peter",
        phone: 12345
    },
    {
        name: "lucas",
        phone: 12494
    }
];

app.get(BASE_API_URL+"/contacts", (req, res)=>{
    res.send(JSON.stringify(contacts, null, 2));
});

app.get(BASE_API_URL+"/contacts/:name", (req, res)=>{
    var contactName = req.params.name;
    filteredContacts= contacts.filter((contacts)=>{
        return(contacts.name == contactName);
    });
    if(filteredContacts==0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredContacts[0],null,2));
    }
    
});

app.post(BASE_API_URL+"/contacts", (req,res)=>{
    contacts.push(req.body);
    res.sendStatus(201, "CREATED");
});

app.delete(BASE_API_URL+"/contacts", (req,res)=>{
    contacts = [];
    res.sendStatus(200, "OK");
});

app.delete(BASE_API_URL+"/contacts/:name", (req,res)=>{
    var contactName= req.params.name;
    contacts = contacts.filter((contact)=>{
        return (contact.name != contactName);
    });
    res.sendStatus(200,"Ok");
});

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});

//#### API TENNIS ###

var tennis = [
    {
        countries: "serbia",
        years: 2019,
        most_grand_slam: 2,
        masters_finals: 3,
        olympic_gold_medals: 0
    },
    {
        countries: "spain",
        years: 2019,
        most_grand_slam: 2,
        masters_finals: 2,
        olympic_gold_medals: 0
    },
    {
        countries: "great-britain",
        years: 2012,
        most_grand_slam: 1,
        masters_finals: 0,
        olympic_gold_medals: 1
    },
    {
        countries: "russia",
        years: 2021,
        most_grand_slam: 1,
        masters_finals: 1,
        olympic_gold_medals: 0
    },
    {
        countries: "swirtzeland",
        years: 2008,
        most_grand_slam: 1,
        masters_finals: 0,
        olympic_gold_medals: 0
    },
];

app.get(BASE_API_URL+"/tennis", (req, res)=>{
    res.send(JSON.stringify(tennis, null, 2));
});

app.post(BASE_API_URL+"/tennis", (req,res)=>{
    tennis.push(req.body);
    res.sendStatus(201, "CREATED");
});