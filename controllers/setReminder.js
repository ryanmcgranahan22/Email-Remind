const Reminder = require('../models/set_reminder');
const fs = require('fs');

const express = require('express'),
router = express.Router();

  router.get('/setReminder', function(request, response) {
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("cover/setReminder");
  });

  router.get('/archive', function(request, response){
    let reminders = JSON.parse(fs.readFileSync("./data/reminders.json"));
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render("cover/archive", {
      reminders: reminders
    })
  });

  router.post('/setReminder', function(request, response) {
    let reminders = JSON.parse(fs.readFileSync('./data/reminders.json'));
    let newReminder = {
    "subject": request.body.subject.trim(),
    "message": request.body.message.trim(),
    "date": request.body.date.trim(),
    "time": request.body.time.trim()
  };
  reminders["Reminder_"+(Object.keys(reminders).length+1).toString()]=newReminder;
  fs.writeFileSync('./data/reminders.json', JSON.stringify(reminders));
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
  if (!errorCode) errorCode = 400;
  const errors = {
    '400': "Unknown Client Error",
    '401': "Invlaid Login",
    '404': "Resource Not Found",
    '500': "Server problem"
  }

  response.status(errorCode);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode": errorCode,
    "details": errors[errorCode]
  });
});



module.exports = router
