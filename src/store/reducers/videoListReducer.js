import type from '../types';

const {
    FETCH_ALL_REGION,
    FETCH_ALL_CATEGORY,
    FETCH_ALL_VIDEOS,
    OPEN_MODAL,
    STATUS_NO,
    STATUS_YES,
    DELETE_ROW,
    OPEN_EDIT_ROW,
    DISMISS_MODAL,
    UPDATE_VIDEO_DETAILS,
    SELECT_CHANGE
} = type;

const initialState = {
    content: [],
    region: [],
    category: [],
    modal: false,
    activeRow: null,
    modalText: "",
    style: false,

}

const videoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_VIDEOS:
            return {
                ...state,
                content: action.payload
            }
        case FETCH_ALL_REGION:
            return {
                ...state,
                region: action.payload
            }
        case FETCH_ALL_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case OPEN_MODAL:
            return {
                ...state,
                modal: true,
                activeRow: action.payload.id,
                modalText: action.payload.title
            }
        case STATUS_NO:
            return {
                ...state,
                modal: false,
                activeRow: null
            }
        case STATUS_YES:
            return {
                ...state,
                modal: false,
                modalText: ""
            }
        case DELETE_ROW:
            return {
                ...state
            }
        case OPEN_EDIT_ROW:
            return {
                ...state,
                modal: true,
                modalText: action.payload.title,
                style: !state.style
            }
        case UPDATE_VIDEO_DETAILS:
            return {
                ...state,
                content: action.payload,
                modal: false
            }
        case SELECT_CHANGE:
            return {
                ...state,
                content: action.payload
            }
        case DISMISS_MODAL:
            return {
                ...state,
                modal: false,
                activeId: '',
                style: false
            }

        default:
            return state;
    }
}

export default videoListReducer;