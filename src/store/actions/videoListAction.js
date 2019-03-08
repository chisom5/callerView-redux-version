import type from '../types';
import axios from 'axios';
import API from '../../api/constant';
import toastr from 'toastr';

const {
    FETCH_ALL_VIDEOS,
    FETCH_ALL_CATEGORY,
    FETCH_ALL_REGION,
    OPEN_MODAL,
    STATUS_NO,
    STATUS_YES,
    DELETE_ROW,
    OPEN_EDIT_ROW,
    DISMISS_MODAL,
    SELECT_CHANGE,
    UPDATE_VIDEO_DETAILS
} = type;

const dispatchFetchVideo = (data) => ({
    type: FETCH_ALL_VIDEOS,
    payload: data
})

const dispatchFetchAllCategory = (data) => ({
    type: FETCH_ALL_CATEGORY,
    payload: data
})

const dispatchFetchAllRegion = (data) => ({
    type: FETCH_ALL_REGION,
    payload: data
})
const dispatchDeleteRow = (data) => ({
    type: DELETE_ROW,
    payload: data
})
export const handleupdateVideo = (data) => ({
    type: UPDATE_VIDEO_DETAILS,
    payload: data
})

export const openModal = (data) => ({
    type: OPEN_MODAL,
    payload: data
})
export const handleSelectChange = (data) => ({
    type: SELECT_CHANGE,
    payload: data
})
export const openEditRow = (data) => ({
    type: OPEN_EDIT_ROW,
    payload: data
})

export const statusNo = () => ({
    type: STATUS_NO,
})

export const statusYes = () => ({
    type: STATUS_YES
})

export const dissmissModal = () => ({
    type: DISMISS_MODAL
})


// fetch all videos
export const handleFetchVideos = () => dispatch => {
    const token = localStorage.getItem('CallerView-XXX');
    return axios({
            url: `${API.baseUrl}/video/all`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let result = res.data.data.videos;

            // dispatch action here
            dispatch(dispatchFetchVideo(result))

        })
        .catch(err => toastr.error(err))
}

// fetch all category
export const handleFetchAllCategory = () => dispatch => {
    const token = localStorage.getItem('CallerView-XXX');

    return axios({
        url: `${API.baseUrl}/category`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        let result = res.data.data;
        dispatch(dispatchFetchAllCategory(result))

    }).catch(err => toastr.error(err))
}

// fetch all region
export const handleFetchAllRegion = () => dispatch => {
    const token = localStorage.getItem('CallerView-XXX');

    return axios({
        url: `${API.baseUrl}/region`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        let result = [...new Set(res.data.data.regions)]
        dispatch(dispatchFetchAllRegion(result))
            // console.log(result)
    }).catch(err => toastr.error(err))
}

// delete a row
export const handleDeleteRow = (obj) => dispatch => {
    const token = localStorage.getItem('CallerView-XXX');
    return axios({
        url: `${API.baseUrl}/video/delete/${obj.index}`,
        method: "DELETE",
        data: obj.content,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        // console.log(res.data);

        dispatch(dispatchDeleteRow())

        toastr.success('Video Successfully Deleted');
    }).catch(err => toastr.err(err))
}