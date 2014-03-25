var Sequelize = require('sequelize')
  , sequelize = new Sequelize('pgtest', 'demorole1', 'password1', {
       dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
       port:    5432, // or 5432 (for postgres)
       host: 'localhost'
    })


exports.syncUp = syncUp = function syncUp(){

  sequelize
    .sync({ force: false})
    // .authenticate()
    .complete(function(err) {
       if (!!err) {
         console.log('An error occurred while creating the tables:', err)
       } else {
         console.log('It worked!')           
       }
    })

}

exports.sequelize = sequelize;

exports.Athlete = Athlete = sequelize.define('athlete', {
    athleteId: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    age: Sequelize.INTEGER,
    teamId: Sequelize.INTEGER,
    goal: Sequelize.STRING,
    goalDate: Sequelize.DATE,
    boulderPar: Sequelize.INTEGER,
    boulderBest: Sequelize.INTEGER,
    routePar: Sequelize.INTEGER,
    routeBest: Sequelize.INTEGER,
    spokenName: Sequelize.STRING
  })

exports.Coach = Coach = sequelize.define('coach', {
    coachId: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    spokenName: Sequelize.STRING
  })


exports.Team = Team = sequelize.define('team', {
    teamId: Sequelize.INTEGER,
    coachId: Sequelize.INTEGER,
    teamName: Sequelize.STRING,
    teamGoal: Sequelize.STRING
  })

// Athlete.hasOne(Team, { foreignKey: team_teamId});
// Team.hasOne(Coach, {foreignKey: coachId});
// Team.belongsTo(Coach);
// Athlete.belongsTo(Team);

exports.Exercise = Exercise = sequelize.define('exercise',{
    exerciseId: Sequelize.INTEGER,
    exerciseCode: Sequelize.STRING,
    exerciseName: Sequelize.STRING,
    compareToPar: Sequelize.STRING,
    relativeToPar: Sequelize.INTEGER,
    exerciseDescription: Sequelize.TEXT
  })


exports.Workout = Workout = sequelize.define('workout',{
    workoutId: Sequelize.INTEGER,
    createdBy: Sequelize.INTEGER,
    workoutName: Sequelize.STRING,
    workoutTheme: Sequelize.STRING,
    workoutDescription: Sequelize.TEXT,
    workoutExercises: Sequelize.STRING,
    exerciseReps: Sequelize.STRING,
    targetTime: Sequelize.INTEGER
  })

exports.WorkoutHistory = WorkoutHistory = sequelize.define('workouthistory',{
    athleteId: Sequelize.INTEGER,
    workoutId: Sequelize.INTEGER,
    workoutActual: Sequelize.STRING,
    workoutDate: Sequelize.DATE,
    athleteNotes: Sequelize.TEXT,
    coachNotes: Sequelize.TEXT

})

exports.WorkoutSchedule = WorkoutSchedule = sequelize.define('workoutschedule',{
    athleteId: Sequelize.INTEGER,
    teamId: Sequelize.INTEGER,
    workouts: Sequelize.STRING,
    workoutDaysFromStart: Sequelize.STRING,
    scheduleStartDate: Sequelize.DATE,
    coachNotes: Sequelize.TEXT
})

exports.RouteGrade = RouteGrade = sequelize.define('routegrade', {
  gradeNumber: Sequelize.INTEGER,
  gradeString: Sequelize.STRING
})
