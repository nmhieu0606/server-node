const {Router}=require('express');
const controller=require('./controller');
const authenticateToken=require('../../middleware/authentication');
const router=Router();
router.get('/private/',authenticateToken,controller.getCategory);
router.post('/private/',authenticateToken,controller.addCategory);
router.delete('/',authenticateToken,controller.deleteCategory);
module.exports=router;