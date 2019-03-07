import { combineReducers } from 'redux';
import authReducer from './authReducer';
import overViewReducer from './overViewReducer';
import addVideoReducer from './addVideoReducer';
import videoListReducer from './videoListReducer';

export default combineReducers({
    authReducer,
    overViewReducer,
    addVideoReducer,
    videoListReducer
});