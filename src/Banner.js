import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import "./Banner.css";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchActionMovies);
            const len = request.data.results.length;
            const item = Math.floor(Math.random() * len);
            setMovie(request.data.results[item]);
        }
        fetchData();
    }, []);
    console.log(movie);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
            autoplay: 1,
        }
    }

    function HandleClick(movie) {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.title || movie?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error));
        }
    }

    return (
        // background-image
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("http://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }} >
            {/* title */}
            <div className="banner-contents">
                <h1 className="banner-title">{`${movie?.title || movie?.name || movie?.original_name}`}</h1>
                {/* 2 buttons */}
                {/* description */}
                <br />
                <h1 className="banner-description">{truncate(movie?.overview, 200)}</h1>
                <button className="banner-button" onClick={() => HandleClick(movie)}><i class="fa fa-play fa-fw" aria-hidden="true"></i> Play</button>
                <button className="banner-button"><i class="fa fa-info-circle fa-fw" aria-hidden="true"></i> More Info</button>
            </div>
            <div className="banner-fade-bottom"></div>
            <div style={{ padding: "40px", position:"relative" ,zIndex:1 }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </header>
    );
}

export default Banner;