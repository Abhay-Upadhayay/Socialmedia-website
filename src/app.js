const express = require('express');
const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');
const postRoute = require('./routes/post.routes')
const path = require("path");
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const config = require('../src/config/config');

const app = express();

const MongoStoreInstance = MongoStore.default || MongoStore;

app.use(
  session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: true,
      store: MongoStoreInstance.create({mongoUrl : config.DB_CONNECTION_STRING}),
  })
);


app.use(flash());
app.use(cookieParser());


app.use((req,res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "../public")))

app.use('/', authRoute);

app.use('/user',userRoute);

app.use('/post', postRoute);

module.exports = app;

