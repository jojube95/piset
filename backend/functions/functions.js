"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();
// exports.calculateUsersPenalty = functions.pubsub.schedule('0 0 * * 0').onRun(context => {
//   //Loop into database users
//     //let penaltySum = 0;
//     //Get the current task
//       //Loop into the subtasks
//         //Check if the subtask is done
//           //If not done: add to penaltySum;
//     //Insert the penaltySum to user penalty month database
//     //Register the penalty into the user penalty history
//     //penaltySum = 0;
//
//
// });
exports.distributeTaskToUsers = functions.pubsub.schedule('0 1 * * 0').onRun(context => {
    console.log('distributeTaskToUsers start');
    //Retrieve database users into array
    let users = [];
    firestore.collection('users').get()
        .then(async function (querySnapshot) {
        querySnapshot.forEach(async function (doc) {
            // doc.data() is never undefined for query doc snapshots
            await console.log('1');
            await users.push(doc);
            await console.log(doc.id, " => ", doc.data());
            await console.log(users);
        });
        await console.log(users);
    });
    //Retrieve database tasks into array
    //Complete tasks array to users.length
    //Get week number
    //let weekNumber = getWeekNumber();
    //Loop the users array
    //find the task using function findTask(weekNumber%users.length, currentUserIndex, arrayTaks);
    //Delete all the current user task in database
    //Insert the current task in the current user database
});
//Return the task from a specific userArrayIndex and weekNumber
// function findTask(ciclo: number, userArrayIndex: number, tareas: Task[]) {
//   let remainder = (ciclo + userArrayIndex) % tareas.length;
//   return tareas[remainder === 0 ? tareas.length - 1 : remainder - 1];
// }
// function getWeekNumber() {
//   let d: Date = new Date();
//   // Copy date so don't modify original
//   d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
//   // Set to nearest Thursday: current date + 4 - current day number
//   // Make Sunday's day number 7
//   d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
//   // Get first day of year
//   var yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(),0,1));
//   // Calculate full weeks to nearest Thursday
//   var weekNo = Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
//   // Return array of year and week number
//   return weekNo;
// }
//# sourceMappingURL=index.js.map