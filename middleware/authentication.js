var jwt = require("jsonwebtoken");
const check = require("../src/data/roles");
const pool = require("../db");
const local = "http://localhost:3001";

const authenticateToken = async (req, res, next) => {
  
  const method = req.method;
  const url = req.originalUrl;
  var checkNext=false;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ error: "null Token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    const decode = jwt.decode(token);

    pool.query(
      "select roles,email from users where username=($1) and status=1 limit 1",
      [decode.username],
      (error, result) => {
        if (error) throw error;
        //const roles = result.rows[0].roles;
        
        const email = result.rows[0].email;
        const getRoles = check.checkRoles(email, [local + url]);
        getRoles.then((res2) => {
          const value = Object.values(res2);
          if (value[0] != null) {
             value[0].map((item) => {
              if (item === method) {
                checkNext=true;
              }
            });
           
          }
        }).then(()=>{
           if(checkNext===true){
            next();
           }
           else{
            return res.status(400).json('Không có quyền truy cập');
           }
        });
      }
    );
    
  });
  
  
};

module.exports = authenticateToken;
