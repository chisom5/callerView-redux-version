import type from '../types';

const {
    UPLOAD_CSV,
    ADD_VIDEO,
    UPLOAD_VIDEO,
    NEW_REGION,
    NEW_CATEGORY,
    TOGGLE_CSV,
    CANCEL_CSV,
    ADD_REGION,
    ADD_CATEGORY,
    DISMISS_MODAL,
    OPEN_MODAL,
    END_ADD_VIDEO,
} = type;

const initialState = {
    csvButton: false,
    border: false,
    csvFile: "",
    isAddCsvButton: false,
    modal: false,
    modalTitle: "",
    csvContent: "",

    loading: false,

    storeDetails: {
        name: "",
        link: "",
        category: "",
        region: "",
        releaseDate: "",
        image: ""
    },
    optionsCategory: [
        { id: "music-video", name: "R&B" },
        { id: "music-video", name: "Hip-pop" }
    ],
    optionsRegion: [
        { id: "nigeria", name: "Nigeria" },
        { id: "kenya", name: "Kenya" }
    ],
}

const addVideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_VIDEO:
            return {
                ...state,
                loading: true,
                storeDetails: {
                    name: "",
                    link: "",
                    category: "",
                    region: "",
                    releaseDate: "",
                    image: ""
                }
            }
        case END_ADD_VIDEO:
            return {
                ...state,
                loading: false,
            }
        case ADD_CATEGORY:
            return {
                ...state,
                modal: action.payload.modal,
                modalTitle: action.payload.modalTitle
            }
        case ADD_REGION:
            return {
                ...state,
                modal: action.payload.modal,
                modalTitle: action.payload.modalTitle
            }

        case UPLOAD_VIDEO:
            return {
                ...state,
                storeDetails: {
                    ...state.storeDetails,
                    link: action.payload
                }
            }
        case UPLOAD_CSV:
            return {
                ...state,
                csvContent: action.payload.csvContent,
                border: !state.border,
                csvFile: action.payload.csvFile,
                isAddCsvButton: !state.isAddCsvButton
            }
        case OPEN_MODAL:
            return {
                ...state,
                modal: !state.modal,
            }
        case NEW_REGION:
            return {
                ...state,
                optionsRegion: [
                    ...state.optionsRegion,
                    { name: action.payload }
                ],
                modal: false
            }
        case NEW_CATEGORY:
            return {
                ...state,
                optionsCategory: [
                    ...state.optionsCategory,
                    { name: action.payload }
                ],
                modal: false
            }

        case TOGGLE_CSV:
            return {
                ...state,
                csvButton: !state.csvButton
            }
        case CANCEL_CSV:
            return {
                ...state,
                csvButton: false,
                modal: false,
                border: !state.border,
                csvFile: "Click to Select CSV File",
                csvContent: ""
            }
        case DISMISS_MODAL:
            return {
                ...state,
                modal: false,
                border: false
            }

        default:
            return state;
    }
}

export default addVideoReducer;