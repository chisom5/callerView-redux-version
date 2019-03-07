import type from '../types';
import axios from 'axios';
import API from '../../api/constant';
import toastr from 'toastr';


const {
    FETCH_VIDEO_PER_PAGE,
    FETCH_ALL_USERS,
    SEE_ALL_VIDEOS,
    SHOW_MODAL
} = type;

// video per page action
const VideoPerPage = (video) => ({
    type: FETCH_VIDEO_PER_PAGE,
    payload: video
})

// all users action
const AllUsers = (users) => ({
    type: FETCH_ALL_USERS,
    payload: users
})

// see all action
const SeeAll = (videos) => ({
    type: SEE_ALL_VIDEOS,
    payload: videos
})

// action for toggle view
export const toggleView = () => ({
    type: SHOW_MODAL
})

// fetch all videos per page
export const fetchVideoPerPage = () => dispatch => {
    const token = localStorage.getItem("CallerView-XXX");

    return axios({
            url: `${API.baseUrl}/video/view/1?limit=6`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {

            const resultObj = {
                video: res.data.data.video,
                count: res.data.data.count
            }

            dispatch(VideoPerPage(resultObj))
        })
        .catch(err => toastr.error(err));
}

// fetch allUsers
export const fetchAllUsers = () => dispatch => {
        const token = localStorage.getItem("CallerView-XXX");

        return axios({
            url: `${API.baseUrl}/total/users`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let result = res.data.data.totalUsers;
            dispatch(AllUsers(result))

        }).catch
    }
    // see all videos fetched
export const fetchAllVideos = () => dispatch => {
    const token = localStorage.getItem("CallerView-XXX");

    return axios({
            url: `${API.baseUrl}/video/all`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let result = res.data.data.videos
            console.log(result)
                // dispatch action here
            dispatch(SeeAll(result))
        })
        .catch(err => toastr.error(err))
}