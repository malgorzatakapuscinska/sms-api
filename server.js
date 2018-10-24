var express=require('express');
var request=require('request');
var rp=require('request-promise');
var path=require('path');
var cors=require('cors');
var bodyParser = require('body-parser');
var SMSAPI = require('smsapi');

smsapi = new SMSAPI({
  oauth: {
      accessToken: 'b1HYcodZJ0swHqQt25It32EknkSGNBO6X9XurwbU'
  }
});

var app = express();
app.use(bodyParser.json())


app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.get("/contacts", function(req, res){
  function getContactsList() {
    return smsapi.contacts
    .list()
    .execute()
    .then (function(result) {
      console.log(result.collection);
      res.send(result.collection);
    })
    .catch(function(error) {
      console.log(error);
      res.send("404 not found");
    })
  }
  getContactsList();
});

app.get("/groups", function(request, response){
  function getContactsGroups() {
    return smsapi.contacts.groups
    .list()
    .execute()
    .then(function(result) {
      console.log(result);
      response.send(result.collection);
    })
    .catch(function(error) {
      console.log(error);
      response.send("404 not found")
    })
  }
  getContactsGroups();
});

app.post("/contacts/add", function(request, response) {
  console.log(request.body);
  function addContact() {
    return smsapi.contacts
    .add()
    .params(request.body)
    .execute()
    .then(function(result) {
      console.log(result);
      /*response.send(result);*/
    })
    .catch(function(error) {
      response.send('500 Internal Server Error');
      console.log(error.message);
    })
  }

  addContact();
})



var server = app.listen(3001, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
  console.log(port);
  console.log('Aplikacja nasłuchuje na http://' + host + ':' + port);
});
