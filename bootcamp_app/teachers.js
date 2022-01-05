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
    ` SELECT DISTINCT teachers.name AS teacher,
    cohorts.name AS cohort
    FROM teachers
    JOIN assistance_requests ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name = 'JUL02'
    ORDER BY teachers.name;`
  )
  .then((res) => {
    res.rows.forEach((entry) => {
      console.log(`${entry.cohort}: ${entry.teacher}`);
    });
  })
  .catch((e) => console.log(e.message));
