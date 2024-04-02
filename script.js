import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import bodyParser from 'body-parser';

const PORT=1000;
const app=express();
const dir=dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(dir+"/index.html")
})

app.post('/weather',async (req,res)=>{
    var city=req.body.city
    const API= await axios.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=53f1e4eba743eb0c44a0de7bb3b909b9&units=metric")
    var description=API.data.weather[0].description;
    var temp=API.data.main.temp.toString()
    var speed=API.data.wind.speed;
    res.render("index.ejs",{
        city:city,
        temp:temp,
        description:description,
        speed:speed
    })
})

app.listen(PORT,()=>{
    console.log("Server Started")
})