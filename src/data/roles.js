
var acl = require('acl');
acl = new acl(new acl.memoryBackend(), {
    debug: (msg) => {
      console.log('-DEBUG-', msg);
    }
});
const local='http://localhost:3001';

acl.allow([
    {
        roles:['user'],
        allows:[
            {resources:[local+'/api/category/private/'], permissions:['GET','POST']},
            
            {resources:[local+'/api/users/'], permissions:['GET']},
            {resources:[local+'/api/roles/private/'], permissions:['GET','POST']},
            {resources:[local+'/api/roles/private/find/'], permissions:['POST']},
           // {resources:['forums', 'news'], permissions:['get', 'put', 'delete']}
        ]
    },
    {
        roles:['admin'],
        allows:[
            {resources:'user', permissions:['sell', 'exchange']},
            {resources:['account', 'deposit'], permissions:['put', 'delete']}
        ]
    }
]);
acl.addUserRoles('hieuggoag1234a@gmail.com', 'user');
const checkRoles=async (email,resources)=>{
    var demo=null;
   
    await acl.allowedPermissions(email, resources, function(err, permissions){
        if(err) throw console.log(err);
       
        demo=permissions;
        
    });
    //console.log(demo);
    return demo;
    
}

module.exports={checkRoles};