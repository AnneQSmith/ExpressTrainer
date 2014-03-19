var Sequelize = require('sequelize')
  , sequelize = new Sequelize('pgtest', 'demorole1', 'password1', {
       dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
       port:    5432, // or 5432 (for postgres)
       host: 'localhost'
    })

  // sequelize
  // .authenticate()
  // .complete(function(err) {
  //   if (!!err) {
  //     console.log('Unable to connect to the database:', err)
  //   } else {
  //     console.log('Connection has been established successfully in model.');
  //     createTables();
  //     console.log('after calling createTables in model authenticate');

  //   }
  // })



function createTables (){

  console.log("Hello from within createTables");

  User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    age: Sequelize.INTEGER,
    teamId: Sequelize.INTEGER,
    goal: Sequelize.STRING,
    goalDate: Sequelize.DATE,
    boulderPar: Sequelize.INTEGER,
    boulderBest: Sequelize.INTEGER,
    routePar: Sequelize.INTEGER,
    routeBest: Sequelize.INTEGER
  })

  Coach = sequelize.define('coach', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  })

  Team = sequelize.define('team', {
    teamName: Sequelize.STRING,
    teamGoal: Sequelize.STRING
  })

  Workouts = sequelize.define('workout',{
    workoutName: Sequelize.STRING,
    workoutTheme: Sequelize.STRING,
    workoutDescription: Sequelize.TEXT,
    workoutExercises: Sequelize.ARRAY(Sequelize.INTEGER),
    exerciseReps: Sequelize.ARRAY(Sequelize.INTEGER)
  })

  Exercises = sequelize.define('exercise',{
    exerciseName: Sequelize.STRING,
    exerciseDescription: Sequelize.TEXT
  })
  syncUp();
}

function syncUp(){

  sequelize
    // .sync({ force: true })
    .authenticate()
    .complete(function(err) {
       if (!!err) {
         console.log('An error occurred while creating the tables:', err)
       } else {
         console.log('It worked!, within syncUI')           
       }
    })

}

exports.sequelize = sequelize;
exports.createTables = createTables;
