const fs = require('fs');

exports.getReminder = function(){
  let reminders = JSON.parse(fs.readFileSync(__dirname+'/../data/reminders.json'));
  return reminders;
}

exports.isReminder = function(subject){
  let reminders = JSON.parse(fs.readFileSync(__dirname+'/../data/reminders.json'));
  if(reminders[subject]) return true;
  else return false;
}

exports.getSortedReminders = function(){
  let reminders = JSON.parse(fs.readFileSync(__dirname+'/../data/reminders.json'));
  let reminderArray=[];
}
  //create an array to use sort, and dynamically generate win percent
exports.getReminders = function(subject){
  let reminders = JSON.parse(fs.readFileSync(__dirname+'/../data/reminders.json'));
}

exports.createReminder =  function(subject, message){
  let allReminders = JSON.parse(fs.readFileSync(__dirname+'/../data/reminders.json'));

  let newReminder={
    "subject": subject,
    "message": message,
  }
  allReminders[subject] = newReminder;
  fs.writeFileSync(__dirname+'/../data/reminders.json', JSON.stringify(allReminders));

}
