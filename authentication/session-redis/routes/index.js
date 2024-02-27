var express = require('express');
var router = express.Router();

var requireLogin=(req,res,next)=>{
  if(!req.session.user){
    res.json({code:2,msg:'未登录'});
  }else{
    next();
  }
};
/* GET home page. */
router.get('/', requireLogin, (req,res,next)=>{
  res.json({code:0,msg:"访问首页"});
});

module.exports = router;
