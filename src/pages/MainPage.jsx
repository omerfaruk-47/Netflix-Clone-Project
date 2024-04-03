import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopuler } from "../redux/actions/movieActions";
import Hero from "../components/Hero";
import { getGenres } from "../redux/actions/genreActions";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const MainPage = () => {
  const genreState = useSelector((store) => store.genreReducer);

  const dispatch = useDispatch();

  //api den popüler filmleri al ve store aktar
  useEffect(() => {
    dispatch(getPopuler());
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Hero />

      {genreState.isLoading ? (
        <Loader />
      ) : genreState.isError ? (
        <p>{genreState.isError}</p>
      ) : (
        genreState.genres.map((genre) => (
          <MovieList genre={genre} key={genre.id} />
        ))
      )}
    </div>
  );
};

export default MainPage;
