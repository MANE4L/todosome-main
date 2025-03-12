const express = require("express");
const app = express ();

app.use(express.json());
// после того, как mongoose подключен, можем исплоьзовать модели по всему проекту, без повторного подключения
const Todo = require("../models/todo.js");

exports.getTodos = async(req, res) => {
    try{
        // хорошо бы еще для памяти приложки указывать lean, означающий, что ты не хочешь модифицировать ответ
        const todos = await Todo.find({}).lean();
        res.send(todos);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }  
};

exports.getId = async(req, res) => {
    try{
        const id = req.params.id;
        const todo = await Todo.findOne({_id: id});
        if(todo) res.send(todo);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};
      
exports.postTodo = async(req, res)=> {
    console.log(req)
    if(!req.body) return res.sendStatus(400);
          
    // можно вот так. называется деструктуризация
    const {name, day, month, year, hour, minute} = req.body
    console.log(req.body, name)
    // const userName = req.body.name;
    // const userDay = req.body.day;
    // const userMonth = req.body.month;
    // const userYear = req.body.year;
    // const userHour = req.body.hour;
    // const userMinute = req.body.minute;
    const todo = {name, day, month, year, hour, minute};
          
    try{
        await Todo.insertOne(todo);
        res.send(todo);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};
       
exports.deleteTodo = async(req, res)=> {
    try{
        const id = req.params.id;
        const todo = await Todo.findOneAndDelete({_id: id});
        if(todo) res.send(todo);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};
      
exports.modifyTodo = async(req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const {id, name, day, month, year, hour, minute} = req.body
    // const userName = req.body.name;
    // const userDay = req.body.day;
    // const userMonth = req.body.month;
    // const userYear = req.body.year;
    // const userHour = req.body.hour;
    // const userMinute = req.body.minute;
          
    try{
        const todo = await Todo.findOneAndUpdate({_id: id}, { $set: {name, day, month, year, hour, minute}},
         {returnOriginal: true });
        if(todo) res.send(todo);
        else res.sendStatus(404); 
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};