

const pool=require('../../db');
const express=require('express');
const app=express();
const expressListRoutes = require('express-list-routes');
const roldeData=require('../data/roles')

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
        getRoles();
        res.status(200).json('Thêm thành công');
    });

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
const updateRole=async (req,res)=>{
    const {id,name,resources}=req.body;
    pool.query('update roles set name=$1 ,resources=$2 where id=$3',[name,resources,id],(error,result)=>{
        if(error) throw error;
        //roldeData.getRoles();
        res.json({
            code:200,
            msg:'Cập nhật thành công'
        })
        console.log(result.rows);
    })

}
const getApi=(req,res)=>{
    
   
    
}
const destroy=(req,res)=>{
    const {id}=req.body;
    pool.query('delete from roles where id=$1',[id],(error,result)=>{
        if(error) throw error,
        getRoles();
        res.json({
            code:200,
            msg:'Xóa thành công',
        });
    })
}
module.exports={
    getRoles,
    getApi,
    addRoles,
    
    findRole,
    updateRole,
    destroy
}