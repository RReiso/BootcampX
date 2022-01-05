const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .connect()
  .then(() => {
    console.log("DATABASE STATUS: Connected");
  })
  .catch((e) => {
    console.log(e);
  });

pool
  .query(
    "SELECT students.id as student_id, students.name as name, cohorts.name as cohort FROM students JOIN cohorts ON cohorts.id = cohort_id WHERE cohorts.name LIKE '%' || $1 || '%' LIMIT $2;",
    [process.argv[2], process.argv[3]]
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((e) => console.log(e.message));
