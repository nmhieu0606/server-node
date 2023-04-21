const {Router}=require('express');
const controller=require('./controller');
const authenticateToken=require('../../middleware/authentication');
const router=Router();
router.get('/',authenticateToken,controller.getCategory);
router.post('/',authenticateToken,controller.addCategory);
router.delete('/',authenticateToken,controller.deleteCategory);
module.exports=router;