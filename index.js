import fetch from "node-fetch";
// Server Code
import express from "express";
import nedb from "nedb";
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
// console.log('process.env');
// console.log(process.env);
// const express = require("express");
// Function that creates a database or a datastore
// const Datastore = require("nedb");

const app = express();
app.listen(80, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));
// setting up an application programming interface for clients to sends data to the server

const database = new nedb("database.db");
// Load the existing data from the time the previous server ran into memory.
// If hasn't run it will create the databas file.
database.loadDatabase();
// View checkins
// Getting data from the database to post to the view checkins markers
app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
  // response.json({ test: 123 });
});
// Posting data to the database
app.post("/api", (request, response) => {
  // console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);

  response.json(data);
});

// Getting data from the APIs

// we are making the api call here in the node file and sending it back to the client to be displayed to the UI using DOM manipulation eg document.getElementById();
// the server acts as a proxy server for openweathermap.org
app.get("/weather/:latlon", async (request, response) => {
  // console.log(request.params);
  const latlon = request.params.latlon.split(",");
  // console.log("latlon is");
  // console.log(latlon);
  // This is the lat lon from the scripts.js file
  // lat and lon are sent to the api
  const api_key = process.env.API_KEY;
  const lat = latlon[0];
  const lon = latlon[1];
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`;
  // Weather information
  // console.log(weather_url);
  //  console.log(weather_url);
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();
  //   response.json(weather_data);
  const aq_url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}`;
  // console.log(weather_url);
  //  console.log(weather_url);
  // Air quality information
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();
  //   response.json(aq_data);
  const data = {
    weather: weather_data,
    air_quality: aq_data,
  };
  console.log('data from the node index.js file');
  console.log(data);
  response.json(data);
});

