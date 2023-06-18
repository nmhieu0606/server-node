const pool=require('../../db');
const role=require('../../src/roles/controller')

var acl = require('acl');
acl = new acl(new acl.memoryBackend(), {
    debug: (msg) => {
      console.log('-DEBUG-', msg);
    }
});
const local='http://localhost:3001';

const getRoles=async()=>{
    //console.log(req);
    var test=null;
    await pool.query('select * from roles').then(res=>{
        test=res.rows;
    });
    //console.log(test);
    
    const av=await test.map((item)=>{
        const temp=JSON.parse(item.resources);
    //   item.resources.map((i)=>{
    //     console.log(i);
    //   });
      

        return{
            roles:item.name,
            allows:[
                temp.map((i)=>{
                    return{
                        resources:local+i.path,
                        permissions:i.method
                    }
                })

            ]
        }
       
   });
   

   
   
    await av.map((item,index)=>{
        item.allows[0].map((i)=>{
          acl.allow(item.roles,i.resources,i.permissions);
           //console.log(item.roles);
        })
    })
   
    console.log(acl.backend._buckets);
   console.log(av[0].roles);
    
}

acl.userRoles('hieuggoag1234a@gmail.com',(error,roles)=>{
    // console.log(error);
    // console.log(roles);
})

// acl.allow([
    
//     {
//         roles:['user'],
//         allows:[
//             {resources:[local+'/api/category/private/'], permissions:['GET','POST']},
            
//             {resources:[local+'/api/users/'], permissions:['GET']},
//             {resources:[local+'/api/roles/private/'], permissions:['GET','POST']},
//             {resources:[local+'/api/roles/private/update/'], permissions:['POST']},
//             {resources:[local+'/api/roles/private/find/'], permissions:['POST']},
//             {resources:[local+'/api/roles/private/destroy/'], permissions:['POST']},
//            // {resources:['forums', 'news'], permissions:['get', 'put', 'delete']}
//         ]
//     },
//     {
//         roles:['admin'],
//         allows:[
//             {resources:'user', permissions:['sell', 'exchange']},
//             {resources:['account', 'deposit'], permissions:['put', 'delete']}
//         ]
//     }
// ]);

const gantPermission=async (email,role)=>{
    getRoles();
    await  acl.addUserRoles(email, role);
}

const checkRoles=async (email,resources)=>{
    var demo=null;
   
    await acl.allowedPermissions(email, resources, function(err, permissions){
        if(err) throw console.log(err);
       
        demo=permissions;
        
    });
    console.log(demo);
    return demo;
    
}

module.exports={checkRoles,gantPermission,getRoles};