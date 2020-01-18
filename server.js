const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use((req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next()
})

server.get('/', (req, res) => {
    res.json({it: "works"})
})

server.get('/api/accounts/', async (req, res, next) => {
    try{
        console.log('try get')
        // res.json(await db("accounts").select())
        res.json(await db.select("*").from("accounts"))
        console.log(await db("accounts").select())
    }
    catch(err){
        next(err)
    }
})

server.get('/api/accounts/:id', async (req, res, next) => {
    try{
        console.log('try get id')
        const account = await db("accounts").where("id", req.params.id).first()
        res.json(account)
    }
    catch(err){
        next(err)
    }
})

server.post('/api/accounts/', async (req, res, next) => {
    try{
        const payload ={
            name: req.body.name,
            budget: req.body.budget,
        }
        const [id] = await db("accounts").insert(payload)
        res.json(await db("accounts").where("id", id).first())
    }
    catch(err){
        next(err)
    }
})

server.put('/api/accounts/:id', async (req, res, next) => {
    try{
        const payload ={
            name: req.body.name,
            budget: req.body.budget,
        }

        await db("accounts").where("id", req.params.id).update(payload)
        res.json(await db("accounts").where("id", req.params.id).first())
    }
    catch(err){
        next(err)
    }
})

server.delete('/api/accounts/:id', async (req, res, next) => {
    try{
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
    } catch(err){
        next(err)
    }
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "something went wrong"
    })
})

module.exports = server;