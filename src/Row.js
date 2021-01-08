import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css";
import Tooltip from '@material-ui/core/Tooltip';
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

const img_Url = 'http://image.tmdb.org/t/p/w500';

function Row({ title, fetchUrl, isLarge }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
            autoplay: 1,
        }
    }

    function HandleClick(movie) {
        if (trailerUrl) {   //if trailerUrl already has something then set it to empty
            setTrailerUrl('')
          } else {
            movieTrailer(movie?.title || movie?.name || "")  //movieTrailer returns a promise
              .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search); //refer to the notebook
                setTrailerUrl(urlParams.get('v'));
              }).catch((error) => {console.log(error)});
          }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {movies.map((movie) => {
                    return (<Tooltip key={movie.id} title={`${movie?.title || movie?.name || movie?.original_name}`} arrow>
                        <img onClick={()=>HandleClick(movie)} className={`row_poster ${isLarge ? "row_poster_large" : null}`} src={`${img_Url}${isLarge ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    </Tooltip>);
                })}
            </div>
            <div style={{ padding: "40px" }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    );
}

export default Row;