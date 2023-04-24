const express=require('express');
const app=express();
const port=3001;
const categoryRoute=require('./src/category/routes'); 
const permisionsRoute=require('./src/permisions/routes'); 
const UsersRoute=require('./src/users/routes'); 
const bodyParser = require('body-parser');
var cors = require('cors');


var session = require('express-session');
// const csurf = require('csurf');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// const csrfMiddleware = csurf({
//     cookie: true
// });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('MY SECRET'));
// app.use(csrfMiddleware);
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.json());

function availableRoutes() {
    return app._router.stack
      .filter(r => r.route)
      .map(r => {
        return {
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: r.route.path
        };
      });
  }
  
app.get('/', (req, res) => {
    //res.send(req.csrfToken());
   
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use('/api/category',categoryRoute);
app.use('/api/permisions',permisionsRoute);
app.use('/api/users',UsersRoute);
app.use(
  cors({origin: ['http://localhost:3001', 'http://127.0.0.1:3001']})
);
app.listen(port,(req,res)=>{console.log('server running');})