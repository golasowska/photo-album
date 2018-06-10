import axios from 'axios';

export const GET_ALBUM = 'GET_ALBUM';
export const SET_INDEX = 'SET_INDEX';

const apiKey = '7b6170c348dd41415881242592ddaa4e';

export function downloadGallery(value) {
  const pageNum = 1;
  return dispatch => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&format=json&nojsoncallback=1&&per_page=50&page=${pageNum}&text=${value}`
      )
      .then(function(response) {
        dispatch({
          type: GET_ALBUM,
          payload: response.data.photos.photo
        });
      })
      .catch(function(error) {
        console.log(error.message);
      });
  };
}

export function setIndex(index) {
  return {
    type: SET_INDEX,
    payload: index
  };
}
