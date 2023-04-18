var Jwt  =require("jsonwebtoken");

function jwtTokens({username,email}){
    const user={username,email};
    const accessToken=Jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'20s'});
    const refreshToken=Jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'5m'});
    return ({accessToken,refreshToken});

}
module.exports=jwtTokens;