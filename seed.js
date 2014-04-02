var model = require("./model")
var Sequelize = require('sequelize')
var fs = require("fs")

// database connection:

db = model.sequelize;

//catch changes to tables:

model.syncUp();

// model.createTables();

db.authenticate().complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully in seed.js')

        getAthletes();
        getCoaches();
        getExercises();
        getTeams();
        getWorkouts();
        getWorkoutSchedules();
        getRouteGrades();
        getWorkoutExerciseAssociations();
    }
  });


//For now, functions to test that we can retrieve data.

function getWorkoutSchedules(){
  fs.readFileSync('./seedData/WorkoutSchedule.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");  
    console.log(splitline);
    model.WorkoutSchedule
     .create({
      athleteId: parseInt(splitline[0]),
      teamId: parseInt(splitline[1]),
      workoutId: parseInt(splitline[2]),
      scheduledDate: new Date(Date.parse(splitline[3])),
      coachNotes: splitline[4]
     })

   .complete(function(err) {
      if (!!err) {
        console.log('workout not saved', err)
      } else {
        console.log('We have a persisted  '+splitline[4]+' instance now')
      }
    })
 });
}


function getCoaches(){
  fs.readFileSync('./seedData/Coaches.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");  
  //  console.log(splitline);
    model.Coach
     .create({
      coachId: parseInt(splitline[0]),
      username: splitline[1],
      password: splitline[2],
      spokenName: splitline[3]
     })

   .complete(function(err) {
      if (!!err) {
        console.log('The  '+splitline[1]+' instance has not been saved:', err)
      } else {
        console.log('We have a persisted  '+splitline[1]+' instance now')
       // findThatCoach(splitline[0]);
      }
    })
 });
}


function getExercises(){
  fs.readFileSync('./seedData/Exercises.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");  
    model.Exercise
     .create({
      exerciseId: parseInt(splitline[0]),
      exerciseCode: splitline[1],
      exerciseName: splitline[2],
      compareToPar: splitline[3],
      relativeToPar: parseInt(splitline[4]),
      exerciseDescription: splitline[5]
     })

   .complete(function(err) {
      if (!!err) {
        console.log('The  '+splitline[2]+' instance has not been saved:', err)
      } else {
        console.log('We have a persisted  '+splitline[2]+' instance now')
      }
    })
 });
}



function getTeams(){
  fs.readFileSync('./seedData/Teams.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");  
    model.Team
     .create({
      teamId: parseInt(splitline[0]),
      coachId: parseInt(splitline[1]),
      teamName: splitline[2],
      teamGoal: splitline[3]
     })

   .complete(function(err) {
      if (!!err) {
        console.log('The  '+splitline[2]+' instance has not been saved:', err)
      } else {
        console.log('We have a persisted  '+splitline[2]+' instance now')
      }
    })
 });
}



function getWorkouts(){
  fs.readFileSync('./seedData/Workouts.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");  
    model.Workout
     .create({
      workoutId: parseInt(splitline[0]),
      createdBy: parseInt(splitline[1]),
      workoutName: splitline[2],
      workoutTheme: splitline[3],
      workoutDescription: splitline[4],
      targetTime: parseInt(splitline[5])
     })

   .complete(function(err) {
      if (!!err) {
        console.log('The  '+splitline[2]+' instance has not been saved:', err)
      } else {
        console.log('We have a persisted  '+splitline[2]+' instance now')
      }
    })
 });
}



function getWorkoutExerciseAssociations(){
  fs.readFileSync('./seedData/WorkoutExerciseAssociations.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");  
    console.log(splitline);
    model.WorkExAssoc
     .create({
      workoutId: parseInt(splitline[0]),
      exerciseId: parseInt(splitline[1]),
      exerciseReps: parseInt(splitline[2]),
      exerciseOrder: parseInt(splitline[3])
     })

   .complete(function(err) {
      if (!!err) {
        console.log('The  '+splitline[1]+' instance has not been saved:', err)
      } else {
        console.log('We have a persisted  '+splitline[2]+' instance now')
      }
    })
 });
}

function getAthletes(){

fs.readFileSync('./seedData/Athletes.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");
    console.log(splitline);
    model.Athlete
      .create({
        athleteId: parseInt(splitline[0]),
        username: splitline[1],
        password: splitline[2],
        age: parseInt(splitline[3]),
        teamId: parseInt(splitline[4]),
        goal: splitline[5],
        goalDate: new Date(Date.parse(splitline[6])),
        boulderPar: parseInt(splitline[7]),
        boulderBest: parseInt(splitline[8]),
        routePar: parseInt(splitline[9]),
        routeBest: parseInt(splitline[10]),
        spokenName: splitline[11]
      })   
    .complete(function(err) {
        if (!!err) {
          console.log('The user instance '+splitline[1]+' has not been saved:', err)
        } else {
          console.log('We have a persisted  '+splitline[1]+' instance now')
          findThatAthlete(splitline[0]);
        }
      })
  });
}


function getRouteGrades(){
  fs.readFileSync('./seedData/RouteGrades.txt').toString().split('\n').forEach(function (line) { 
    splitline = line.split("|");  
    console.log(splitline[0],splitline[1]);
    model.RouteGrade
     .create({
      gradeNumber: parseInt(splitline[0]),
      gradeString: splitline[1]
     })

   .complete(function(err) {
      if (!!err) {
        console.log('The  '+splitline[1]+' instance has not been saved:', err)
      } else {
        console.log('We have a persisted  '+splitline[1]+' instance now')
      }
    })
 });
}


function findThatAthlete(uname){
  db
  .authenticate()
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while authenticating:', err)
     } else {
       
       model.Athlete
        .find({ where: { username: uname} })
        .complete(function(err, athlete) {
          if (!!err) {
            console.log('An error occurred while searching for uname:', err)
          } else if (!athlete) {
            console.log('No user with the username uname has been found.')
          } else {
            console.log('Hello ' + athlete.spokenName + '!')
          }
        })
 }
})
}


function findThatCoach(cname){
  db
  .authenticate()
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while authenticating:', err)
     } else {

       model.Coach
        .find({ where: { username: cname } })
        .complete(function(err, coach) {
          if (!!err) {
            console.log('An error occurred while searching for: ' +cname, err)
          } else if (!coach) {
            console.log('No user with the username '+cname+' has been found.')
          } else {
            console.log('Hello ' + coach.spokenName + '!')
          }
        })
     
  }
})
}




