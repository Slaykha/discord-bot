const Discord = require("discord.js");

var seconds = 0
var mins = 0
var hours = 0
var currentSeconds = 0
const count = (minutes) =>{
   seconds = minutes * 6

   interval = setInterval(function() {
      seconds--

      if(seconds === 0){
         return stop()
      }
   },1000)

   return minutes + " minutes of pomodoro started!"
}

const stop = () =>{
   clearInterval(interval)

   return "Pomodoro finished"
}

const left = () =>{
   hours = seconds >= 3600 ? seconds / 3600 : 0 
   mins = (seconds % 3600) / 60
   currentSeconds = seconds % 60

   if(seconds === 0){
      return "No current pomodoro!"
   }else{
      return ("hours: " + parseInt(hours) + "\nminutes: " + parseInt(mins) + "\nseconds: " + currentSeconds)
   }
}

exports.count = count
exports.left = left
exports.stop = stop

