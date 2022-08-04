
const axios=require('axios');

const keyMovie=process.env.KEY_MOVIE;

const MovieCache={};

async function movie(req, res){
    const searchQuery=req.query.searchQuery;
    if(MovieCache[searchQuery]!==undefined){
        res.status(200).send(MovieCache[searchQuery]);

    }

    else{
    const moviesArr=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keyMovie}&query=${searchQuery}`);
    try{
      const arrayOfmovies=moviesArr.data.results.map((movie=>new Movie(movie)));
      MovieCache[searchQuery]=arrayOfmovies;
      res.status(200).send(arrayOfmovies);
    }
    catch(err){
        handleError(err, res);
    }
}
}
function handleError(error, res){
    res.status(500).send('Somthing went wrong');

}


module.exports=movie;

class Movie{
    constructor(movie){
        this.title = movie.title;
        this.overview =movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = movie.poster_path;
        this.popularity = movie.popularity;
        this.release_date = movie.release_date;
    }
}