const Reminder = require('../models/set_reminder');

const express = require('express'),
  router = express.Router();


  router.get('/reminder/:subject', function(request, response) {
    let subject = request.params.subject;
    let reminder = Reminder.getReminder(subject);
    if(reminder){
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("cover/archive",{
        user: request.user,
        reminder: reminder
      });
    }else{
      response.redirect('/error?code=404');
    }
  });

  router.get('/setReminder', function(request, response) {
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("cover/setReminder");

  });

  router.post('/setReminder', function(request, response) {
      let subject = request.body.subject;
      let message = request.body.message;
      let date = request.body.date;
      let time = request.body.time;
      if(subject&&message&&date&&time){
        Reminder.createReminder(subject, message, date, time);
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.redirect("/reminder/"+subject);
      }else{
        response.redirect('/error?code=400');
      }
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
