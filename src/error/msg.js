const sucess=()=>{
    return JSON.stringify({
        code:200,
        msg:'Thành công'
    });
}
const error500=()=>{
    return JSON.stringify({
        code:500,
        msg:'Thất bại'
    });
}
module.exports={
    sucess,
    error500
}