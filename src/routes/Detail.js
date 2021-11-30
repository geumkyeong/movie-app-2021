import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


function Detail(){
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    const {id} = useParams();

    const getMovies = async() => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    };

    useEffect(() => {
        getMovies();
    }, []);

    return ( loading ? <h1>Loading...</h1> :
        (<div>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <h2>{movie.title_long}</h2>
            <p>⭐ {movie.rating} | {movie.runtime} minutes</p>
            <p>{movie.description_full}</p>
            <ul>
                {movie.genres.map((genre) => <li key={genre}>{genre}</li>)}
            </ul>
        </div>)
    );
}

export default Detail;