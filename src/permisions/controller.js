

const pool=require('../../db');
const getPermisions=(req,res)=>{
    pool.query('select * from permisions',(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}

const addCategory=(req,res)=>{
    
    const {name}=req.body;
    console.log(req.body);
    pool.query('insert into users(fistname,lastname,username,password,email,key) values ($1,$2,$3,$4,$5,$6)',[name],(error,result)=>{
        if(error) throw error;
        res.status(200).send(`CSRF token used: ${req.body._csrf}, Message received: ${req.body.message}`);
    })

}

module.exports={
    getPermisions,
    addCategory
}