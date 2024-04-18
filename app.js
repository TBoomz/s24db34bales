var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user){
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err){
        return done(err)
      })
    })
  )

  var Fossil = require("./models/fossil");

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error:'));
db.once("open", function(){
        console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fossilRouter = require('./routes/fossil');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fossil', fossilRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

var Account =require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


async function recreateDB(){
  await Fossil.deleteMany();

  let instance1 = new
  Fossil({era:"Jurassic", species:"Tyrannosaurus rex", age:150000000 });
    instance1.save().then(doc=>{
    console.log("First object saved")}).catch(err=>{
    console.error(err)
    });

  let instance2 = new
  Fossil({ era:"Cretaceous", species:"Triceratops", age:70000000 });
    instance2.save().then(doc=>{
    console.log("Second object saved")}).catch(err=>{
    console.error(err)
    });

  let instance3= new
  Fossil({ era:"Triassic", species:"Stegosaurus", age:200000000 });
    instance3.save().then(doc=>{
    console.log("Third object saved")}).catch(err=>{
    console.error(err)
    });
}
let reseed = false;
if (reseed){
  recreateDB();
}