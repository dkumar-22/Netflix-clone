const API_KEY = "99f0804c6f2bec51ca070b310ecd258d";

const requests = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US&region=IN`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123&region=IN`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&region=IN`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&region=IN`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&region=IN`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&region=IN`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&region=IN`,
	fetchTvSeries: `/tv/popular?api_key=${API_KEY}&language=en-US`
};

export default requests;
