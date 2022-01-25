const bodyparser = require('body-parser');
const { Router } = require('express');
const express = require('express');
const uuid = require('uuid');
// const { parseTwoDigitYear } = require('moment');
const members = require('../../Members')

const router = Router();

// Update member
router.put('/:id',(req,res) =>{
    const updMember = req.body;
    members.forEach(member =>{
        if(member.id === parseInt(req.params.id)){
            member.color =updMember.color ? updMember.color : member.name;
            member.type =updMember.type ? updMember.type : member.type;
            member.registration =updMember.registration ? updMember.color: member.registration;
            member.capacity =updMember.capacity ? updMember.capacity : member.capacity;


            res.json({msg:`Data updated. `,member})
        }
    });
});

// Get all members
router.get('/',(req,res)=>{
    res.json(members);
});

// get single member
router.get('/:color',(req,res)=>{
    const foundColor= members.some(member =>member.color === (req.params.color));

    if(foundColor){
        res.json(members.filter(member =>member.color === (req.params.color)));
    }else{
        res.status(400).json({mssg:`No member with this color ${req.params.color}`});
    }
}); 
//get single entry based on id
router.get('/:id',(req,res)=>{
    const foundColor= members.some(member =>member.id === parseInt(req.params.id));

    if(foundColor){
        res.json(members.filter(member =>member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({mssg:`No member with this id ${req.params.id}`});
    }
});


// Create Member
router.post('/', (req,res) =>{
    //  console.log(req.body);
    const newMember ={
        id : uuid.v4(),
        color : req.body.color,
        type :req.body.type,
        registration :req.body.registration,
        capacity:req.body.capacity
    }
    console.log(req.body)
   if(!newMember.registration || !newMember.color || !newMember.capacity || !newMember.type){
      return res.status(400).json({msg:'Plz enter full details.'});
   }else{
      members.push(newMember);
      res.json(members);
   }
});

// Delete member
router.delete('/:id',(req,res)=>{
    const foundColor= members.some(member =>member.id === parseInt(req.params.id));
    console.log(req.params.id)

    if(foundColor){
        res.json({
            mssg:"deleted",
            members:members.filter(member =>member.id !== parseInt(req.params.id))
        });
    }else{
        res.status(400).json({mssg:`No member with this id ${req.params.id}`});
    }
});

module.exports = router;