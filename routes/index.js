var model = require('../model')
var Sequelize = require('sequelize')
var _ = require('underscore')


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  console.log('in index')
};

exports.coachindex = function(req,res){
  res.render('coachindex', { title: 'Coach'});
  console.log('in coach index')
}




exports.add_coachmail = function(req, res) {
  var email = (req.body.email).substr(0,256);
    console.log ('email enterd = '+email);
    db = model.sequelize;
    uname = email;
    db
      .authenticate()
      .complete(function(err) {
         if (!!err) {
           console.log('An error occurred while authenticating:', err)
         } else {         
           model.Coach
            .find({ where: { username: uname} })
            .complete(function(err, coach) {
              if (!!err) {
                console.log('An error occurred while searching for uname:', err);
                res.render('index', { title: 'Coach'});
              } else if (!Coach) {
                console.log('No coach with the username ' + uname + ' has been found.');
                res.render('coachindex', { title: 'Coach' });
              } else {
                model.Team
 //bad bug -- doesn't handle the case of more than one team

                 .find({ where: {coachId: coach.coachId} })
                 .complete (function(err,team) {
                  model.Athlete
                  .findAll({ where: {teamId: team.teamId } })
                  .complete (function(err,athletes) {
                    res.render('coach_page', {title: 'Coach'
                                            ,coachname: coach.spokenName
                                            ,athletes: athletes});

                    })
                 })  
              }
            })
         }
      })
  };

exports.add_mail = function(req, res) {
	var email = (req.body.email).substr(0,256);
    console.log ('email enterd = '+email);
    db = model.sequelize;
    uname = email;
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
                console.log('An error occurred while searching for uname:', err);
                res.render('index', { title: 'Express'});
              } else if (!athlete) {
                console.log('No user with the username ' + uname + ' has been found.');
                res.render('index', { title: uname});
              } else {

//TODO add error handling; for prototype implementation ensure dataset is clean 
//so a coach and team will be found; saving time/space until foreign keys are working in sequelize

                model.Team
                  .find({ where: { teamId: athlete.teamId} })
                  .complete(function(err,team) {
                  model.Coach
                    .find({ where: {coachId: team.teamId} })
                    .complete(function(err, coach){
                      model.RouteGrade
                        .find( { where: {gradeNumber: athlete.routePar}})
                        .complete(function(err,routegradeP){
                        model.RouteGrade
                        .find( { where: {gradeNumber: athlete.routeBest}})
                        .complete(function(err,routegradeB){

                        res.render('athlete_page', {title: athlete.SpokenName
                                                    ,current_athlete: athlete.spokenName
                                                    ,athleteId: athlete.athleteId
                                                    ,tn: team.teamName
                                                    ,cn: coach.spokenName
                                                    ,goal: athlete.goal
                                                    ,gd: athlete.goalDate.toDateString()
                                                    ,bp: athlete.boulderPar
                                                    ,bb: athlete.boulderBest
                                                    ,sp: routegradeP.gradeString
                                                    ,sb: routegradeB.gradeString});    
                                                    }) 
                          })           
                              
                      })
                   })
              }
            })
         }
      })
  };


//trying to get button from athlete page to redirect here, so far without success
// goal is to pass parameters from templates to various callbacks.  When this works a list
// of workouts for a specific athlete can be fetched/displayed

exports.see_workouts = function(req, res) {
  var athleteId = req.params.athleteId;
  console.log (req.params);
  console.log ('In see_workouts trying to get an id  '+ athleteId);   
    //res.render('workout_page', {title: 'Express', aname: name})

    
  };
exports.see_aworkouts = function(req, res) {
  var aId = req.params.athleteId;
  var athleteName = req.params.athleteName;
  console.log (req.body);
  console.log (req.params);
  var workouttime = req.body.workouttime;

  db.
    authenticate()
    .complete(function(err) {
      if (!!err) {
        console.log('oops authentication error', err)
      }
      else {
        model.WorkoutSchedule
          .findAll({ where: { athleteId: aId} })
          .complete(function(err,workoutschedules){
              console.log('workout schedules', workoutschedules);
              var dates = []
              for (i = 0; i <_.size(workoutschedules);i++){
                dates.push(workoutschedules[i].scheduledDate.toDateString());
                console.log(i,dates[i]);
              }
             res.render('workout_page', {title: 'Workouts', aname: athleteName, workouts: workoutschedules, wd: dates});
          })
      }
    })


    
  };

//code to demonstrate looping construct in Jade
exports.userlist = function(req, res) {
  console.log('in user list');
        db
          .authenticate()
          .complete(function(err) {
            if (!!err){
              console.log('An error occurred while authenticating:', err)
            } else {  
              console.log('in userlist');
              model.Coach
                .findAll()
                .complete(function(err,coaches){
                  res.render('userlist', {
                    "userlist" : coaches
                  })
                })
            }
         })
  };


exports.newworkout = function(req, res) {
  //get list of existing exercises from db
    console.log('in new workout');
        db
          .authenticate()
          .complete(function(err) {
            if (!!err){
              console.log('An error occurred while authenticating:', err)
            } else {  
              model.Exercise
                .findAll()
                .complete(function(err,exercises){
                  res.render('newworkout', {"exerciselist": exercises})
                  })
                }
            })
         };



exports.addworkout = function(req,res) {

      // Get our form values. These rely on the "name" attributes
      var workoutId = req.body.workoutid;
      var createdBy = 1;   // TODO: use currently logged in coach
      var workoutName = req.body.workoutname;
      var workoutTheme = req.body.workouttheme;  // should have dropdown choice of existing themes
      var workoutDescription = req.body.workoutdescription; 
      var workoutExercises = req.body.workoutexercises; //can't be freeform, need dropdown list of existing exercises
      var exerciseReps = req.body.exercisereps; //ditto
      var targetTime = req.body.targettime;

 //TODO  Major error cheking!!!
//Immediate -- there is a bug in exerciseReps
      console.log(workoutId, createdBy, workoutName, workoutTheme, 
        workoutDescription,workoutExercises,exerciseReps, targetTime);

      // model.Workout
      //   .create ({
      //     workoutId: workoutId,
      //     createdBy: createdBy,
      //     workoutName: workoutName,
      //     workoutTheme: workoutTheme,
      //     workoutDescription: workoutDescription,
      //     workoutExercises: workoutExercises,
      //     exerciseReps: exerciseReps,
      //     targetTime: targetTime
      //   })
      //   .complete(function(err) {
      //     if (!!err) {
      //       console.log('That big old mess failed to save!', err)
      //     }
      //     else {
      //       console.log('Did we just put junk in the database?')
      //       res.location("userlist");
      //       res.redirect("userlist");
      //     }
      //   })
    res.redirect('newworkout');

 };



//   findThatAthlete('kaherson@yahoo.com');
//     uname = email;
//     db
//       .authenticate()
//       .complete(function(err) {
//          if (!!err) {
//            console.log('An error occurred while authenticating:', err)
//          } else {
           
//            model.Athlete
//             .find({ where: { username: uname} })
//             .complete(function(err, athlete) {
//               if (!!err) {
//                 console.log('An error occurred while searching for uname:', err)
//               } else if (!athlete) {
//                 console.log('No user with the username ' + uname + ' has been found.')
//                 res.send('No user with the username ' + uname + ' has been found; please go back.')
//               } else {
//                 db
//                     .query('SELECT * FROM teams where "teamId" = '+ athlete.teamId +'', Team)
//                     .success(function(team){

//                     db.query('SELECT * FROM coaches where "coachId" = '+team[0].coachId+'', Coach)
//                       .success(function(coach){

//                         console.log('Hello ' + coach.spokenName + '!');
//                         res.render('athlete_page', {title: 'Express'
//                                                 ,current_athlete: athlete.spokenName
//                                                 ,tn: team[0].teamName
//                                                 ,cn: coach[0].spokenName
//                                                 ,goal: athlete.goal
//                                                 ,gd: athlete.goalDate.toDateString()
//                                                 ,bp: athlete.boulderPar
//                                                 ,bb: athlete.boulderBest
//                                                 ,sp: athlete.routePar
//                                                 ,sb: athlete.routeBest});
//                         })
//                       })
//               }
//             })
//          }
//         })
//};



exports.athlete_home = function(req, res) {
    console.log("in athlete home page");
    db = model.sequelize;
//    findThatAthlete('kaherson@yahoo.com');
    uname = 'kaherson@yahoo.com';
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
                console.log('No user with the username ' + uname + ' has been found.')
              } else {
                console.log('Hello ' + athlete.spokenName + '!');
                res.render('athlete_page', {title: uname});
                res.send('Home Page for: ' + athlete.spokenName);
              }
            })
         }
        })
    
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
            console.log('Hello ' + athlete.spokenName + '!');

          }
        })
 }
})
}