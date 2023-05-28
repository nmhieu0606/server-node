const {Router}=require('express');
const controller=require('./controller');
const authenticateToken=require('../../middleware/authentication');
const router=Router();
router.get('/private/',authenticateToken,controller.getRoles);
router.post('/private/',authenticateToken,controller.addRoles);
router.post('/private/find/',authenticateToken,controller.findRole);
module.exports=router;