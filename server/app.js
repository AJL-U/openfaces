"use strict";

let express = require("express");
let app = express();

//  ./ connect to local module 
let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );
var sample_limit = 150;


//creating end point to retrive all sets
app.get("/sets", (request,response) => {

  let sets = mongoUtil.sets();
  sets.find().toArray((err,docs) => {
    if(err) {
      response.sendStatus(400);
    }
    console.log(JSON.stringify(docs));
    let setNames = docs.map((set) => set.name);
    response.json( setNames );
  });
  
  //response.json(["LFW","IMDB-WIKI","AJL"])
}); 


//get up to sample_limit photos from a set
app.get("/sets/:name", (request, response) => {
  let setName = request.params.name;

  let subjects = mongoUtil.subjects();
 // subjects.find({set: setName}, {limit:sample_limit}).toArray((err,docs) => {
  subjects.aggregate(  [ { $match : { set : setName } }, { $sample: { size: sample_limit  } } ]  ).toArray((err,docs) => {
    if(err) {
      response.sendStatus(400);
    }

    console.log( "Set ", setName );
    console.log( "Subjects docs: ", docs );
    response.json(docs);
  });

});


//get up to sample_limit photos from a set with given origin
app.get("/sets/:name/origin/:origin", (request, response) => {
  let setName = request.params.name;
  let subjectOrigin = request.params.origin;

  let subjects = mongoUtil.subjects();
  //subjects.find({set: setName, origin: subjectOrigin}, {limit:sample_limit}).toArray((err,docs) => {
  subjects.aggregate(  [ { $match: { $and: [ { set: setName }, { origin: subjectOrigin} ] } }, { $sample: { size: sample_limit  } } ]  ).toArray((err,docs) => {
  
    if(err) {
      response.sendStatus(400);
    }

    console.log( "Set ", setName );
    console.log( "Origin: ", subjectOrigin );
    console.log( "Subjects docs: ", docs );
    response.json(docs);
  });

});


//get up to sample_limit photos from any set with a given origin
app.get("/sets/origin/:origin", (request, response) => {
  let subjectOrigin = request.params.origin;

  let subjects = mongoUtil.subjects();
  //subjects.find({origin: subjectOrigin}, {limit:sample_limit}).toArray((err,docs) => {
  subjects.aggregate(  [ { $match : { origin : subjectOrigin } }, { $sample: { size: sample_limit  } } ]  ).toArray((err,docs) => {
    if(err) {
      response.sendStatus(400);
    }
    console.log( "Origin: ", subjectOrigin );
    console.log( "Subjects docs: ", docs );
    response.json(docs);
  });

});


//get up to sample_limit photos from a set with given gender
app.get("/sets/:name/gender/:gender", (request, response) => {
  let setName = request.params.name;
  let subjectGender= request.params.gender;

  let subjects = mongoUtil.subjects();
  //subjects.find({set: setName, gender: subjectGender}, {limit:sample_limit}).toArray((err,docs) => {
  subjects.aggregate(  [ { $match: { $and: [ { set: setName }, { gender: subjectGender} ] } }, { $sample: { size: sample_limit  } } ]  ).toArray((err,docs) => {
  
    if(err) {
      response.sendStatus(400);
    }

    console.log( "Set ", setName );
    console.log( "Gender: ", subjectGender );
    console.log( "Subjects docs: ", docs );
    response.json(docs);
  });

});

//get up to sample_limit photos from any set with a given origin
app.get("/sets/gender/:gender", (request, response) => {
  let subjectGender= request.params.gender;

  let subjects = mongoUtil.subjects();
  subjects.aggregate(  [ { $match : { gender : subjectGender } }, { $sample: { size: sample_limit  } } ]  ).toArray((err,docs) => {
    if(err) {
      response.sendStatus(400);
    }
    console.log( "Gender: ", subjectGender );
    console.log( "Subjects docs: ", docs );
    response.json(docs);
  });

});


app.listen(8181, () => console.log("Listening on port 8181"));