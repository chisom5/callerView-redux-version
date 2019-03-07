import type from '../types';

const { FETCH_VIDEO_PER_PAGE, FETCH_ALL_USERS, SEE_ALL_VIDEOS, SHOW_MODAL } = type;

const initialState = {
    availableVideos: "",
    Content: null,
    allUsers: "",
    allContent: [],
    AllVideo: false
}

const overViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VIDEO_PER_PAGE:
            return {
                ...state,
                availableVideos: action.payload.count,
                Content: [...action.payload.video]
            }

        case FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
            }

        case SEE_ALL_VIDEOS:
            return {
                ...state,
                allContent: [...state.allContent, ...action.payload],
                AllVideo: !state.AllVideo

            }

        case SHOW_MODAL:
            return {
                ...state,
                AllVideo: !state.AllVideo
            }

        default:
            return state
    }
}

export default overViewReducer;