import { combineReducers } from 'redux';
import AlbumReducer from './reducer_album';
import IndexReducer from './reducer_index';

const rootReducer = combineReducers({
  album: AlbumReducer,
  index: IndexReducer
});

export default rootReducer;
