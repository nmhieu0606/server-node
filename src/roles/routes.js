const {Router}=require('express');
const controller=require('./controller');
const authenticateToken=require('../../middleware/authentication');
const router=Router();
router.get('/',controller.getApi);
router.post('/',authenticateToken,controller.addRoles);
router.delete('/',authenticateToken,controller.deleteCategory);
module.exports=router;