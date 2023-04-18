const express=require('express');
const app=express();
const port=3001;
const categoryRoute=require('./src/category/routes'); 
const permisionsRoute=require('./src/permisions/routes'); 
const UsersRoute=require('./src/users/routes'); 
const bodyParser = require('body-parser'); // CSRF Body parsing
// const csurf = require('csurf');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// const csrfMiddleware = csurf({
//     cookie: true
// });

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(cookieParser());
// app.use(csrfMiddleware);


app.use(express.json());

// app.get('/', (req, res) => {
//     res.send(req.csrfToken());
// });
app.use('/api/category',categoryRoute);
app.use('/api/permisions',permisionsRoute);
app.use('/api/users',UsersRoute);
app.listen(port,(req,res)=>{console.log('server running');})