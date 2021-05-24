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
const appRoutes = require("./routes/app");
app.post('/signIn', authRoutes)
app.post('/signOut', authRoutes)

app.post('/postMessage',appRoutes);
app.post('/deleteMessage',appRoutes);
app.post('/likeMessage',appRoutes);
app.post('/getMessage',appRoutes);

app.post('/retweetMessage',appRoutes);
app.post('/delete_retweetMessage',appRoutes);



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})