var express = require('express');
var { expressjwt: jwt }=require('express-jwt');
var sign =require('jsonwebtoken').sign;
var router = express.Router();

router.post('/login', (req,res,next)=>{
  res.json({
    code:0,
    token:sign({name:req.body.name},'jwt_secret',{
      expiresIn:'600s'
    })
  });
})

router.post('/validate', jwt({secret:'jwt_secret',algorithms: ["HS256"]}), (req, res, next)=>{
  res.json({code:0, msg:JSON.stringify(req.user)})
});

module.exports = router;
