const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const app = express ();
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/usersdb");
app.locals.collection = mongoClient.db("usersdb").collection("users");
app.use(express.json());
const User = require("../models/user.js");

exports.getUsers = async(req, res) => {
           
    const collection = req.app.locals.collection;
    try{
        const users = await collection.find({}).toArray();
        res.send(users);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }  
};
exports.getId = async(req, res) => {
           
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const user = await collection.findOne({_id: id});
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};
      
exports.postUser = async(req, res)=> {
          
    if(!req.body) return res.sendStatus(400);
          
    const userName = req.body.name;
    const userDay = req.body.day;
    const userMonth = req.body.month;
    const userYear = req.body.year;
    const userHour = req.body.hour;
    const userMinute = req.body.minute;
    const user = {name: userName, day: userDay, month: userMonth, year: userYear, hour: userHour, minute: userMinute};
          
    const collection = req.app.locals.collection;
       
    try{
        await collection.insertOne(user);
        res.send(user);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    await user.save();
};
       
exports.deleteUser = async(req, res)=>{
           
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const user = await collection.findOneAndDelete({_id: id});
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};
      
exports.modifyUser = async(req, res)=>{
           
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userDay = req.body.day;
    const userMonth = req.body.month;
    const userYear = req.body.year;
    const userHour = req.body.hour;
    const userMinute = req.body.minute;
          
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.body.id);
        const user = await collection.findOneAndUpdate({_id: id}, { $set: {name: userName, day: userDay, month: userMonth, year: userYear, hour: userHour, minute: userMinute}},
         {returnDocument: "after" });
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};