import { combineReducers } from 'redux';
import AlbumReducer from './reducer_album';
import IndexReducer from './reducer_index';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  album: AlbumReducer,
  index: IndexReducer,
  form: FormReducer
});

export default rootReducer;
