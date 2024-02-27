var express = require('express');
var router = express.Router();

router.post('/login',(req,res)=>{
  if(req.body.name==='admin' && req.body.password==='admin'){
    req.session.user=req.body.name;
    res.json({code:0,msg:"登录成功"});
  }else{
    res.json({code:1,msg:"账号或密码错误"});
  }
})

router.get('/logout', (req,res)=>{
  req.session.destroy();
  res.json({code:0,msg:"注销成功"});
});

module.exports = router;
