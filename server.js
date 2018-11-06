const express=require('express');
const request=require('request');
const path=require('path');
const cors=require('cors');
const bodyParser = require('body-parser');
const SMSAPI = require('smsapi');

const options = {
  root: __dirname + '/build',
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

smsapi = new SMSAPI({
  oauth: {
    accessToken: 'b1HYcodZJ0swHqQt25It32EknkSGNBO6X9XurwbU'
  }
});

const app = express();
app.use(bodyParser.json())

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

/* SIGN IN FORM ENDPOINTS */

app.get('/sign-in-form', function(request, response) {
  response.sendFile('index.html', options, function(error) {
    if(error) throw error;
    else {console.log("File sent");
    }
  });
})
app.get('/sign-in-form/css/style.css', function(request, response) {
  response.sendFile('/css/style.css', options, function(error) {
    if(error) throw error;
    else {console.log("File sent");}
  });
})

app.get('/index-compiled.js', function(request, response) {
  response.sendFile('index-compiled.js', options, function(error) {
    if(error) throw error;
    else {console.log("File index-complied.js sent");}
  });
})

app.get('/zgoda.pdf', function(request, response) {
  response.sendFile('zgoda.pdf', options, function(error) {
    if(error) throw error;
    else {console.log("File zgoda.pdf sent");}
  });
})

app.post('/validation', function(request, response) {
  let checkResults = {};
  function validateEmailandPhone() {
    return smsapi.contacts
    .list()
    .phoneNumber(request.body.phone_number)
    .execute()
    .then(function(result) {
      if (result.size !== 0) {
        checkResults.phone_number = 'exists';
        isEmailExist();
      }
      else {
        checkResults.phone_number = 'ok';
        isEmailExist();
      }
    })
    .catch(function(error) {checkResults.phone_number = 'exists';
      isEmailExist();
      response.send('500 Internal Server Error');
    })
  }

  function isEmailExist () {
    return smsapi.contacts
    .list()
    .email(request.body.email)
    .execute()
    .then(function(result) {
      if (result.size !== 0) {
        checkResults.email = 'exists';
        response.send(checkResults);
        }
      else {
        checkResults.email = 'ok';
        response.send(checkResults);
      }
    })
    .catch(function(error) {
      console.log(error);
      response.send('500 Internal Server Error');
    })
  }

  validateEmailandPhone();
})

app.get("/groups", function(request, response){
  function getContactsGroups() {
    return smsapi.contacts.groups
    .list()
    .execute()
    .then(function(result) {
      response.send(result.collection);
    })
    .catch(function(error){
      console.log(error);
      response.status('404').send("404 not found");
    })
  }
  getContactsGroups();
});

app.post("/contacts/add", function(request, response) {
  function addContact() {
    return smsapi.contacts
    .add()
    .params(request.body)
    .execute()
    .then(function(result) {
      response.send("Data saved correct");
    })
    .catch(function(error) {
      console.log(error);
      response.send('500 Internal Server Error');
    })
  }

  addContact();
});

/* SIGN OUT FORM ENDPOINTS*/

app.get('/sign-out-form', (request, response) => {
  response.sendFile('index.html', options, (error) => {
    if(error) throw errror;
    else {console.log("File sent");}
  });
})
app.get('/sign-out-form/css/style.css', (request, response) => {
  response.sendFile('css/style.css', options, function(error) {
    if(error) throw error;
    else {console.log("File sent");}
  });
})

app.get('/index-compiled1.js', (request, response) => {
  response.sendFile('index-compiled.js', options, (error) => {
    if(error) throw error;
    else {console.log("File index-complied.js sent");}
  });
})

app.delete("/contacts/:phone", (request, response) => {
  let contactId = '';
  console.log(request);
  function getContactIdandDelete() {
    return smsapi.contacts
    .list()
    .phoneNumber(request.params.phone)
    .execute()
    .then(function(result) {
      if (result && result.size !== 0) {
        contactId = result.collection[0].id;
        contactDelete(contactId);
      } else {
        if (!result) response.status('503').send('Service unavailable');
        else response.status('404').send('Not found');
      console.log(result);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
  function contactDelete(id) {
    return smsapi.contacts
    .delete(id)
    .execute()
    .then(function(result) {
      console.log(result);
      response.status('200').send('Deleted');
    })
    .catch(function(error) {
      console.log(error);
      response.status('404').send("Not found")
    })
  }
  getContactIdandDelete();
})

var server = app.listen(3001, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
  console.log(port);
  console.log('Aplikacja nasłuchuje na http://' + host + ':' + port);
});
