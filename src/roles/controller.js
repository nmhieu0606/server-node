

const pool=require('../../db');
const express=require('express');
const app=express();
const expressListRoutes = require('express-list-routes');
const roleData =require('../../src/data/roles')
const PAGE_SIZE=1;
const getRoles=async (req,res)=>{
    //console.log(req);

    let sum,tongSoPage;
    var request=req.body.page!=null?req.body.page:1;
  
    var offset=(request-1)*PAGE_SIZE;
    //console.log(offset);
    
  
    
    await pool.query("select count(id) from roles").then((res)=>{
      //console.log(res.rows[0].count);
      sum=res.rows[0].count;
    });



    pool.query('select * from roles limit $1 offset $2',[PAGE_SIZE,offset],(error,result)=>{
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
        roleData.updateRoleSV();
        res.json({
            code:200,
            msg:'Cập nhật thành công'
        })
        console.log(result.rows);
    })

}

const destroy=(req,res)=>{
    const {id}=req.body;
    pool.query('delete from roles where id=$1',[id],(error,result)=>{
        if(error) throw error,
        roleData
        res.json({
            code:200,
            msg:'Xóa thành công',
        });
    })
}
module.exports={
    getRoles,
    
    addRoles,
    
    findRole,
    updateRole,
    destroy
}