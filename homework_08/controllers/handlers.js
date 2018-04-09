const fs = require('fs');
const readRockstars = () => fs.readFileSync("data/storage.json");
const findById = id => JSON.parse(readRockstars()).find(rockstar => rockstar.id === id);
const writeToJson = data => {
    fs.writeFile("data/storage.json", JSON.stringify(data.sort((a,b) => a.id - b.id)), err => {
        if(err) throw err;
    });
};
const validation = rockstar => !!(rockstar.id && rockstar.name && rockstar.band && rockstar.instrument);

exports.create = (req, res) => {
    let body = req.body;
    if (!validation(body)) {
        return res.sendStatus(400);
    }
    const rockstar = findById(Number(req.body.id));

    if(rockstar){
        return res.status(409).send({"message": "Musician already exist."});
    }

    let arr = JSON.parse(readRockstars());
    arr.push(body);
    writeToJson(arr);
    res.sendStatus(201);
};

exports.findAll = (req, res) => {
    res.status(200).send(JSON.parse(readRockstars()));
};

exports.findById = (req, res) => {
    const rockstar = findById(Number(req.params.id));
    if(!rockstar){
        return res.sendStatus(404);
    }
    res.status(200).send(rockstar);
};

exports.update = (req, res) => {
    let rockstar = findById(Number(req.params.id));
    if(!rockstar){
        return res.sendStatus(404);
    }
    rockstar.name = req.body.name;
    rockstar.band = req.body.band;
    rockstar.instrument = req.body.instrument;
    let rocktars = JSON.parse(readRockstars());
    let newArr = rocktars.filter(rockstar => rockstar.id !== Number(req.params.id));
    newArr.push(rockstar);
    writeToJson(newArr);
    res.status(200).send(rockstar);
};

exports.delete = (req, res) => {
    const rockstar = findById(Number(req.params.id));

    if(!rockstar){
        return res.sendStatus(404);
    }

    let arr = JSON.parse(readRockstars());
    let newArr = arr.filter(rockstar => rockstar.id !== Number(req.params.id));
    writeToJson(newArr);
    res.status(200).send({"message": "Musician has been successfully remove"});
};