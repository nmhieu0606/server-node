

const pool=require('../../db');
const express=require('express');
const app=express();
const expressListRoutes = require('express-list-routes');
const getRoles=(req,res)=>{
    //console.log(req);
    pool.query('select * from roles',(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}

const addRoles=(req,res)=>{
    
    
    const {name,resources}=req.body;
    
    pool.query('insert into roles (name,resources) values ($1,$2)',[name,resources],(error,result)=>{
        if(error) throw error;
        res.status(200).json('Thêm thành công');
    });

}
const deleteCategory=(req,res)=>{
    const id=req.params.id;
    console.log(id);
}
const findRole=async (req,res)=>{
   
    const {id}=req.body;
    pool.query('select *from roles where id=$1',[id],(error,result)=>{
        if(error) throw error;
        if(result.rows[0]!=null) res.json(result.rows[0]);
        else{
             res.json('Không tìm thấy kết quả');
        }
       
    })
}

const getApi=(req,res)=>{
    
   
    
}
module.exports={
    getRoles,
    getApi,
    addRoles,
    deleteCategory,
    findRole
}