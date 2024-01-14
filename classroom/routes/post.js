const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{
    res.send('Users');

});
router.get("/:id",(req,res)=>{
    res.send('User id is ${req.params.id}');
});

router.post('',(req,res)=>{
            res.send('User added');
});

router.delete('/:id',(req,res)=>{    
    res.send('User deleted');
});

module.exports=router;