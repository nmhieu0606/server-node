

const pool=require('../../db');
const getCategory=(req,res)=>{
    pool.query('select * from category',(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}

const addCategory=(req,res)=>{
    
    const {name}=req.body;
    
    pool.query('insert into category (name) values ($1)',[name],(error,result)=>{
        if(error) throw error;
        res.status(200).json('Thêm thành công');
    })

}
const deleteCategory=(req,res)=>{
    const id=req.params.id;
    console.log(id);
}

module.exports={
    getCategory,
    addCategory,
    deleteCategory
}