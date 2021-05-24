const { pool } = require("../dbConfig");

const signIn = (req, res) => {
  var { username, password } = req.body;
 
  pool.query(
    `SELECT * from users where LOWER(name) = $1`,
    [username.toLowerCase()],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      if (results.rows.length > 0) {
        var user = results.rows[0];
        if (
          username.toLowerCase() === user.name.toLowerCase() &&
          password === user.password
        ) {

          req.session.username = user.name;
          req.session.user_id = user.id;
          req.session.isAuth = true;

          var user  = {
              name : user.name,
              id : user.id
          }
/*           console.log(req.session.username)
          console.log(req.session.user_id)
          console.log(req.session.isAuth) */
          res.status(200).send({user})
        }
      } else {
        console.log("im here")
        res.status(400).send({message: "Sign in  : error"})
      }
    }
  );
 
};


const signOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
  });
};

module.exports = {
    signIn,
    signOut,
};
