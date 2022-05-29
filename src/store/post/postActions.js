// Libraries
import axios from "axios";
import { NotificationManager } from 'react-notifications';

// Types
import { GET_POSTS, GET_ALL_POSTS, GET_SINGLE_POST } from "./postTypes";

// Constants
import { history } from "../../history";

// Action Methods
export const getPosts = (payload) => {
    return {
        type: GET_POSTS,
        payload,
    }
}

export const getAllPosts = (payload) => {
    return {
        type: GET_ALL_POSTS,
        payload,
    }
}

export const getSinglePost = (payload) => {
    return {
        type: GET_SINGLE_POST,
        payload,
    }
}


// Redux Thunk
export const fetchGetPosts = (limit) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/post/getPosts?limit=${limit}`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getPosts(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchGetAllPosts = () => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/post/getAllPosts`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getAllPosts(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchGetSinglePost = (id) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/post/${id}`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getSinglePost(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchAddComment = (id, payload) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/comment/${id}/create`;

        axios
            .post(url, payload)
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchGetSinglePost(id));
                    NotificationManager.success(response.data.message, 'Success', 3000);
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchCreatePost = (payload, formData) => {
    return (dispatch, getState) => {
        let url = `${process.env.REACT_APP_API_URL}/post/create`;

        axios
            .post(url, payload, { headers: { 'Authorization': `Bearer: ${getState().auth.token}` } })
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchUploadPostImage(response.data.data._id, formData))
                    dispatch(fetchGetAllPosts());
                    NotificationManager.success(response.data.message, 'Success', 3000);
                    history.push("/admin/posts");
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchUploadPostImage = (id, payload) => {
    return (dispatch, getState) => {
        let url = `${process.env.REACT_APP_API_URL}/post/${id}/uploadImage`;

        axios
            .post(url, payload, { headers: { 'Authorization': `Bearer: ${getState().auth.token}` } })
            .then(response => {
                if (response.status === 200) {
                    NotificationManager.success(response.data.message, 'Success', 2000);
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchDeletePost = (id) => {
    return (dispatch, getState) => {
        let url = `${process.env.REACT_APP_API_URL}/post/${id}`;

        axios
            .delete(url, { headers: { 'Authorization': `Bearer: ${getState().auth.token}` } })
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchGetAllPosts());
                    NotificationManager.success(response.data.message, 'Success', 3000);
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}