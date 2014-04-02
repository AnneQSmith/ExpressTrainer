
var Sequelize = require('sequelize')

if (process.env.HEROKU_POSTGRESQL_CYAN_URL) {
    // the application is executed on Heroku .. use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_CYAN_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
    console.log('match ', match[1]);
    console.log('match ', match[2]);
    console.log('match ', match[3]);
    console.log('match ', match[4]);
    console.log('match ', match[5]);

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
  })
} 
else {
  console.log('local db variables rather than Heroku');
  var app_db = process.env.EXPRESSTRAINER_DB_NAME;
  var app_user = process.env.EXPRESSTRAINER_DB_USER;
  var app_pwd = process.env.EXPRESSTRAINER_DB_PWD;
  var db_port = process.env.EXPRESSTRAINER_DB_PORT;
  var db_host = process.env.EXPRESSTRAINER_DB_HOST;
  var db_dialect = process.env.EXPRESSTRAINER_DB_DIALECT;


  
  sequelize = new Sequelize(app_db, app_user, app_pwd, {
       dialect: db_dialect, // or 'sqlite', 'postgres', 'mariadb'
       port:    db_port, // or 5432 (for postgres)
       host: db_host
    })
}

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
    targetTime: Sequelize.INTEGER
  })


exports.WorkExAssoc = WorkExAssoc = sequelize.define('workexassoc', {
  workoutId: Sequelize.INTEGER,
  exerciseId: Sequelize.INTEGER,
  exerciseReps: Sequelize.INTEGER,
  exerciseOrder: Sequelize.INTEGER
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
    workoutId: Sequelize.INTEGER,
    scheduledDate: Sequelize.DATE,
    coachNotes: Sequelize.TEXT
})

exports.PastWorkExAssoc = PastWorkExAssoc = sequelize.define('pastworkexassoc', {
  athletId: Sequelize.INTEGER,
  workoutId: Sequelize.INTEGER,
  exerciseId: Sequelize.INTEGER,
  exerciseRepsPlanned: Sequelize.INTEGER,
  exerciseRepsComplete: Sequelize.INTEGER
})

exports.RouteGrade = RouteGrade = sequelize.define('routegrade', {
  gradeNumber: Sequelize.INTEGER,
  gradeString: Sequelize.STRING
})
