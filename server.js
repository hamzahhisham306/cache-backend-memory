'use strict';

require('dotenv').config();

const express=require('express');
const cors=require('cors');

const app=express();

app.use(cors());

const PORT=process.env.PORT||3001;

const weather=require('./modules/weather');
const movie=require('./modules/movie');






app.get('/', (_req, res) => {
    res.send('I am working')
}
)


app.listen(PORT,()=>{
    console.log(`Working Server!!!${PORT}`)
})

app.get('/weather', weather);
app.get('/movies', movie);