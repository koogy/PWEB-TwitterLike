const express = require('express')
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { pool } = require("./dbConfig");

const app = express()
const port = 3030
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: "Little flower",
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pool,
    }),
  })
);


const authRoutes = require("./routes/auth");
app.post('/signIn', authRoutes)
app.post('/signOut', authRoutes)

app.post('/postMessage', (req, res) => {
  console.log("Posting message..." + req.body.user_id)
  pool.query(
    `INSERT into message(user_id,message_content,message_date) VALUES($1,$2,$3)`,
    [req.body.user_id, req.body.message_content, req.body.date],
    (err, results) => {
      if (err) {
        console.log(err);

      }

      res.send("haha")
    }
  );
})

app.post('/followUser', (req, res) => {

  console.log("Follow user..." + req.body.follow.userid + " "+ req.body.follow.userToFollow_id)
  res.send("haha")
  pool.query(
    `insert into follow(user_id,userToFollow_id,followed) values($1,$2,'true') on CONFLICT(user_id,userToFollow_id) DO UPDATE SET followed = NOT follow.followed`,
    [req.body.follow.userid , req.body.follow.userToFollow_id],
    (err, results) => {
      if (err) {
        console.log(err);

      }

      res.status(200).send()
    }
  );
})

app.post("/deleteMessage", (req, res) => {
  console.log("Delete message n°" + req.body.messageID)
  pool.query(
    `delete FROM message WHERE message_id = $1`,
    [req.body.messageID],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.status(200).send()
    }
  );
})


app.post('/likeMessage', (req, res) => {
  console.log("Message liked" + req.body.messageID + " FROM user : " + req.body.user_id)
  pool.query(
    `insert into message_user_like(message_id,user_id,liked) values($1,$2,'true') on CONFLICT(message_id,user_id) DO UPDATE SET liked = NOT message_user_like.liked`,
    [req.body.messageID, req.body.user_id],
    (err, results) => {
      if (err) {
        console.log(err);
      }

      res.status(200).send()
    }
  );
})


app.post('/retweetMessage', (req, res) => {
  console.log("Retweet message" + req.body.messageID + " FROM user : " + req.body.user_id)
  pool.query(
    `insert into retweet(message_id,user_id) values($1,$2)`,
    [req.body.messageID, req.body.user_id],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results)

      res.status(200).send()
    }
  );
})

app.post('/getMessage', (req, res) => {
  console.log("Fetching messages...")
  var mentionFilter = req.body.mentionFilter
  var hashtagFilter = req.body.hashtagFilter
  var followFilter = req.body.followFilter
  console.log(mentionFilter)
  console.log(hashtagFilter)
  console.log(followFilter)
  
 
var query =`
SELECT message_id,
       user_id,
       username,
       message_content,
       message_date,

  (SELECT count(message_id)
   FROM message_user_like
   WHERE message_id = bigboi.message_id
     AND liked='t'
   GROUP BY message_id) AS liked ,

  (SELECT count(followed) AS followed
   FROM follow
   WHERE followed ='t'
     AND user_id= $1
     AND usertofollow_id = bigboi.user_id
   GROUP BY followed) AS follow ,
       retweet_username,
       retweet_message_id,
       retweet_user_id
FROM
  (SELECT message.message_id,
          message.user_id,
          name AS username,
          message_content,
          message_date,
          NULL AS retweet_username,
          NULL AS retweet_message_id,
          NULL AS retweet_user_id
   FROM message
   JOIN users ON message.user_id = users.id
   UNION SELECT message_id,
                id AS user_id,
                name AS username,
                message_content,
                message_date,
                retweet_username,
                retweet_message_id,
                retweet_user_id
   FROM users
   JOIN
     (SELECT m.message_id,
             m.user_id,
             m.message_content,
             message_date,
             name AS retweet_username,
             retweet.message_id AS retweet_message_id,
             retweet.user_id AS retweet_user_id
      FROM message m
      JOIN retweet ON m.message_id = retweet.message_id
      JOIN users ON retweet.user_id = users.id) AS SQ1 ON users.id = SQ1.user_id) AS bigboi
WHERE message_id != -1
`
  var filtersQuery =""
  for(var i = 0 ; i < mentionFilter.length ; i++){
    filtersQuery += "message_content like '%" + mentionFilter[i] + "%'"
    if(i+1 <mentionFilter.length){
      filtersQuery += ' AND '
    }
  }
  
  if(mentionFilter.length > 0 && hashtagFilter.length > 0){
    filtersQuery += ' AND '
  }
  for(var i = 0 ; i < hashtagFilter.length ; i++){
    filtersQuery += "message_content like '%" + hashtagFilter[i] + "' or message_content like '%" + hashtagFilter[i]+ " %' or message_content like '%" + hashtagFilter[i] + "#%'"
    if(i+1 <hashtagFilter.length){
      filtersQuery += ' OR '
    }
  }
  
  if(filtersQuery.length >0){
    filtersQuery = " AND (" + filtersQuery + ") "
  }
  
  query += filtersQuery
  if(followFilter){
      console.log("FOLLLOW FILTER !!")
      query += " AND ((select count(followed) AS followed FROM follow WHERE followed ='t' AND user_id= $1 AND usertofollow_id = bigboi.user_id group by followed)) =1"
    }
  
    query += ' ORDER BY message_date DESC LIMIT 10' 
 
  pool.query(
    query,
    [req.body.user_id] ,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      var array = results.rows
      res.status(200).send({ array })

    }
  );
})


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})