import axios from "axios";
import { ActionTypes } from "../actionTypes";
import { options } from "../../constants";

//apiden filmleri alan ve store aktaran aksiyon
export const getPopuler = () => (dispatch) => {
  //yüklenme durumunu reducer bildir

  dispatch({ type: ActionTypes.MOVIES_LOADING });

  //APİDEN POPÜLER FİLMLERİ AL
  axios
    .get("https://api.themoviedb.org/3/movie/popular", options)
    //başarılı olursa reduce bildir
    .then((res) =>
      dispatch({
        type: ActionTypes.MOVIES_SUCCESS,
        payload: res.data.results,
      })
    )
    .catch((err) =>
      dispatch({
        type: ActionTypes.MOVIES_ERROR,
        payload: err.message,
      })
    );
};
