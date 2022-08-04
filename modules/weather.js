const axios=require('axios');
const weatherDate={};

let keyweather=process.env.KEY_WEARTHER
async function weather(req, res){
    const searchQuery=req.query.searchQuery;
    const lat=req.query.lat;
    const lon=req.query.lon;
    if(weatherDate[searchQuery]!==undefined){
       res.status(200).send(weatherDate[searchQuery]);
    }
    else{
        const cityArr=await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${keyweather}`);
    try{
        const weatherArr=cityArr.data.data.map((item=>new Forecast(item)));
        weatherDate[searchQuery]=weatherArr;
        res.status(200).send(weatherArr);
        }
    catch(err){
          handleError(err, res);
        }
    
    }
}
function handleError(error, res){
    res.status(500).send('Somthing went wrong');

}

module.exports=weather;
class Forecast{
    constructor(day){
        this.data=day.valid_date;
        this.description=day.weather.description;
    }
}