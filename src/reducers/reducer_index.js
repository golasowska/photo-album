import { SET_INDEX } from '../actions';
const initialState = 0;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INDEX:
      return action.payload;
    default:
      return state;
  }
}
