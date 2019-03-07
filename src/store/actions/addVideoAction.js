import type from '../types';
import axios from 'axios';
import API from '../../api/constant';
import toastr from 'toastr';

const {
    UPLOAD_CSV,
    ADD_VIDEO,
    UPLOAD_VIDEO,
    TOGGLE_CSV,
    CANCEL_CSV,
    END_ADD_VIDEO,
    DISMISS_MODAL,
    OPEN_MODAL,
    NEW_CATEGORY,
    NEW_REGION,
    ADD_REGION,
    ADD_CATEGORY,
} = type;

const addVideo = () => ({
    type: ADD_VIDEO,
})

export const NewRegion = (data) => ({
    type: NEW_REGION,
    payload: data
})

export const NewCategory = (data) => ({
    type: NEW_CATEGORY,
    payload: data
})

export const AddCategory = (data) => ({
    type: ADD_CATEGORY,
    payload: data
})

export const AddRegion = (data) => ({
    type: ADD_REGION,
    payload: data
})
export const csvUpload = (csvObj) => ({
    type: UPLOAD_CSV,
    payload: csvObj
})

export const UploadVideo = (data) => ({
    type: UPLOAD_VIDEO,
    payload: data
})
export const OpenModal = () => ({
    type: OPEN_MODAL,
})

export const EndAdd_Video = () => ({
    type: END_ADD_VIDEO
})
export const toggleCsv = () => ({
    type: TOGGLE_CSV,
})

export const cancelCsv = () => ({
    type: CANCEL_CSV
})
export const dismissModal = () => ({
    type: DISMISS_MODAL
})

export const add_VideoSuccessful = (Details) => dispatch => {
    const token = localStorage.getItem('CallerView-XXX');
    return axios({
            url: `${API.baseUrl}/video/create`,
            method: "POST",
            data: Details,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {

            dispatch(addVideo());
            toastr.success('Video details successfully added');

        })
        .catch(err => toastr.error(err))
}