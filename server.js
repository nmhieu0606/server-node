const express=require('express');
const app=express();
const port=3001;
const categoryRoute=require('./src/category/routes'); 
const permisionsRoute=require('./src/permisions/routes'); 
const UsersRoute=require('./src/users/routes'); 
const bodyParser = require('body-parser');



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
  
console.log(JSON.stringify(availableRoutes(), null, 2));
// app.get('/', (req, res) => {
//     res.send(req.csrfToken());
// });

app.get("/get-all-routes", (req, res) => {  
    let get = app._router.stack.filter(r => r.route && r.route.methods.get).map(r => r.route.path);
    let post = app._router.stack.filter(r => r.route && r.route.methods.post).map(r => r.route.path);
    res.send({ get: get, post: post });
});
app.use('/api/category',categoryRoute);
app.use('/api/permisions',permisionsRoute);
app.use('/api/users',UsersRoute);

app.listen(port,(req,res)=>{console.log('server running');})