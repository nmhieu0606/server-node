const {Router}=require('express');
const controller=require('./controller');
const {validate}=require('./validate');
const { check } = require("express-validator");
const authenticateToken=require('../../middleware/authentication');
const router=Router();


var roles=require('../data/roles');
var acl = require('acl');
acl = new acl(new acl.memoryBackend());




router.get('/',authenticateToken,controller.getUsers);
router.post('/login',[ 
    check('email', 'Email length should be 10 to 30 characters').isLength({ min: 10, max: 1000 }).notEmpty(),
    check('password', 'Password length should be 8 to 10 characters')
    .isLength({ min: 3, max: 1000 }).notEmpty(),
],controller.login);

router.post('/register',[
    check('firstname','Họ không được bỏ trống và không được quá dài').notEmpty().isLength({mỉn:3,max:100}),
    check('lastname','Tên không được bỏ trống và không được quá dài').notEmpty().isLength({mỉn:3,max:100}),
    check('username','Tên tài khoản không được bỏ trống').notEmpty().isLength({mỉn:3,max:100}).trim().isSlug(),
    check('password','Mật khẩu không được bỏ trống').isLength({min:3,max:100}).notEmpty(),
    check('confirm_password','Nhập lại mật khẩu không được bỏ trống').isLength({min:3,max:100}).notEmpty()
    .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match")
],controller.register);

router.get('/verify/:token',[
    check('token','ERROR').notEmpty().trim().isSlug(),
    
    
],controller.verifyEmail);

router.post('/resetpassword',[
    // check('_token','ERROR').notEmpty().trim().isSlug(),
    check('password_new','Mật khẩu mới không được bỏ trống').isLength({min:3,max:100}).notEmpty(),
    check('confirm_password','Nhập lại mật khẩu mới không được bỏ trống').isLength({min:3,max:100}).notEmpty()
    .custom((value, {req}) => value === req.body.password_new).withMessage("The passwords do not match")
],controller.resetPassword);
router.get('/refreshtoken',acl.middleware(),controller.refreshToken);
router.post('/forgot',controller.forgotPassword);
router.delete('/logout',controller.deleteRefreshToken);
module.exports=router;