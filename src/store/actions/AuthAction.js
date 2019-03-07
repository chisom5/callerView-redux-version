import type from '../types';
import axios from 'axios';
import API from '../../api/constant';
import toastr from 'toastr';

const { ADMIN_LOGIN } = type;

// action creators
const loginSuccessful = user => ({
    type: ADMIN_LOGIN,
    payload: user.data,
})


// A thunk is a function that return another function
export const authAction = (userInput, history) => dispatch => {

    return axios({
        url: `${API.baseUrl}/admin/login`,
        method: "POST",
        data: userInput
    }).then(res => {
        let result = res.data;
        toastr.success('Admin successfully Logged In');

        //   dispatch loginSuccessful here
        dispatch(loginSuccessful(result))

        // save token in local storage
        localStorage.setItem('CallerView-XXX', `${res.data.data.token}`);

        // and redirect to the main page
        window.location.reload()

    }).catch(err => {
        toastr.error(err)
    })
}