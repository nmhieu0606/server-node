

const pool=require('../../db');
const getCategory=(req,res)=>{
    pool.query('select * from category',(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}

const addCategory=(req,res)=>{
    
    const {name}=req.body;
    console.log(req.body);
    pool.query('insert into category (name) values ($1)',[name],(error,result)=>{
        if(error) throw error;
        res.status(200).send(`CSRF token used: ${req.body._csrf}, Message received: ${req.body.message}`);
    })

}

module.exports={
    getCategory,
    addCategory
}