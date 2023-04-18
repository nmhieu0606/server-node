var bcrypt = require("bcrypt");
var { validationResult } = require("express-validator");
var errorMsg=require('../error/msg')
var sendMail= require('../../mail/sendmail')
var jwtTokens =require('../utils/jwt-helpers')
// import jwt from '../utils/jwt-helpers';
const pool = require("../../db");
const getUsers = (req, res) => {
  pool.query("select * from users", (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const addCategory = (req, res) => {
  const { name } = req.body;

  pool.query(
    "insert into users(fistname,lastname,username,password,email,key) values ($1,$2,$3,$4,$5,$6)",
    [name],
    (error, result) => {
      if (error) throw error;
      res
        .status(200)
        .send(
          `CSRF token used: ${req.body._csrf}, Message received: ${req.body.message}`
        );
    }
  );
};
const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors);
  }
  else {
    const { email } = req.body;

    const { password } = req.body;

    pool.query('select username from users where email=($1) and status=1',[email],(error,result)=>{
      if(error) throw error;
      if(result.rows[0]!=null){
        pool.query(
          "select password,username from users where email=($1) and status=1",
          [email],
          (error, result) => {
           
            if (error) throw error;
            
            if(result.rows[0].password!=null){
              const pass=result.rows[0].password;
              const username=result.rows[0].username;
             
              if(bcrypt.compareSync(password, pass)){
               
                let tokens=jwtTokens(username);
                console.log(tokens);
                res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
                res.json(tokens);
               
              }
              else{
                res.send(errorMsg.error500());
    
              }
            }
             else{
              res.send(errorMsg.error500());
             }
            
          }
        );
      }
      else{
        res.send(errorMsg.error500());
      }
      
    })
  
    
  }
};

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors);
  } else {
    const { username,email } = req.body;
    pool.query(
      "select * from users where username=($1) and email=($2)",
      [username,email],
      (error, result) => {
        if (error) throw error;

        if (result.rows[0] == null) {
          const jwt = require("jsonwebtoken");
          const { firstname, lastname, email, username, password } = req.body;
          var salt = bcrypt.genSaltSync(10);
          var hashPassword = bcrypt.hashSync(password, salt);
          const token = jwt.sign({ email, username }, "yoursecretkey");
          pool.query(
            "insert into users(firstname,lastname,username,password,email,token,status) values ($1,$2,$3,$4,$5,$6,$7)",
            [firstname, lastname, username, hashPassword, email, token,0],
            (error, result) => {
              if (error) throw error;
              res.status(200).send("Đăng kí tài khoản thành công vui lòng check email để kích hoạt tài khoản");
              sendMail(email,'<a type="button" href="http://localhost:3001/api/users/verify/'+token+'">Nhấp vô đi</a>');
             
            }
          );
        } else {
          res.status(402).send("Tài khoản đã tồn tại");
        }
      }
    );
  }
};

const verifyEmail=(req,res)=>{
    const token=req.params.token;
    pool.query('select id from users where token=($1)',[token],(error,result)=>{
        if(error) throw error;
        if(result.rows[0]!=null){
          const id= result.rows[0].id;
          pool.query('update users set status=($1), token=($2) where id=($3)',[1,null,id],(error,result)=>{
            if(error) throw error
            res.send(200);
          })
        }   
        else{
            res.send(404);
        }
    })
}



module.exports = {
  getUsers,
  register,
  login,
  verifyEmail
};
