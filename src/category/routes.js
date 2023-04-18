const {Router}=require('express');
const controller=require('./controller');

const router=Router();
router.get('/',controller.getCategory);
router.post('/',controller.addCategory);
module.exports=router;