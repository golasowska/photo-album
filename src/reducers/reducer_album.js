import { GET_ALBUM } from '../actions';

export default function display(state = null, action) {
  switch (action.type) {
    case GET_ALBUM:
      return [action.payload];
    default:
      return state;
  }
}
