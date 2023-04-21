var Jwt  =require("jsonwebtoken");


function jwtTokens({username,email}){
    const user={username:username,email:email};
    console.log(username);
    const accessToken=Jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
    const refreshToken=Jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'2h'});
    return ({accessToken,refreshToken});

}
module.exports=jwtTokens;