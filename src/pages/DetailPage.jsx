import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgUrl, options } from "./../constants/index";
import Loader from "../components/Loader";
import DetailDisplay from "../components/DetailDisplay";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import PlayerCard from "../components/PlayerCard";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);
  //urlden film id sini al
  const { id } = useParams();

  //apiden filmin bilgilerini al
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits`,
        options
      )
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(res.err));
  }, []);

  return (
    <div>
      {!movie && <Loader />}
      {movie && (
        <div>
          <div className="relative h-[20vh]">
            <img
              className="object-cover w-full h-full"
              src={baseImgUrl + movie.backdrop_path}
              alt=""
            />
            <div className="absolute bg-black inset-0 bg-opacity-50 grid place-items-center">
              <span className="text-3xl font-semibold">{movie.title}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 my-5">
            {/*sol taraf */}
            <div>
              <DetailDisplay title="Kategoriler" data={movie.genres} />

              <DetailDisplay
                title="Konuşulan Diller"
                data={movie.spoken_languages}
              />

              <DetailDisplay
                title="Yapımcı Şirketler"
                data={movie.production_companies}
              />

              <DetailDisplay
                title="Yapılan Ülkeler"
                data={movie.production_countries}
              />
            </div>
            {/*sağ taraf */}
            <div>
              <p>{movie.overview}</p>

              <p className="my-4">
                <span>Bütçe:</span>
                <span className="text-green-500 ms-2">
                  {movie.budget === 0
                    ? "Bilinmiyor"
                    : millify(movie.budget) + "$"}
                </span>
              </p>
              <p className="my-4">
                <span>Gelir:</span>
                <span className="text-green-500 ms-2">
                  {movie.revenue === 0
                    ? "Bilinmiyor"
                    : millify(movie.revenue) + "$"}
                </span>
              </p>
            </div>

            {/*alt kısım */}

            <div>
              <Splide
                options={{
                  autoWidth: true,
                  gap: "10px",
                  rewind: true,
                  lazyLoad: true,
                }}
              >
                {movie.credits.cast.map((player) => (
                  <SplideSlide key={player.credit_id}>
                    <PlayerCard player={player} />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
