// Types
import {
    SET_ALL_PROJECTS_OVERLAY, SET_ALL_POSTS_OVERLAY, SET_CREATE_CATEGORY_OVERLAY,
    GET_ALL_CATEGORIES, GET_CATEGORIES,
} from "./generalTypes";
import { NotificationManager } from 'react-notifications';
import axios from "axios";

// Action Methods
export const setAllProjectsOverlay = (payload) => {
    return {
        type: SET_ALL_PROJECTS_OVERLAY,
        payload,
    }
}

export const setAllPostsOverlay = (payload) => {
    return {
        type: SET_ALL_POSTS_OVERLAY,
        payload,
    }
}

export const setCreateCategoryOverlay = (payload) => {
    return {
        type: SET_CREATE_CATEGORY_OVERLAY,
        payload
    }
}

export const getAllCategories = (payload) => {
    return {
        type: GET_ALL_CATEGORIES,
        payload,
    }
}

export const getCategories = (payload) => {
    return {
        type: GET_CATEGORIES,
        payload,
    }
}

// Redux Thunk
export const fetchCreateCategory = (payload) => {
    return (dispatch, getState) => {
        let url = `${process.env.REACT_APP_API_URL}/category/create`;

        axios
            .post(url, payload, { headers: { 'Authorization': `Bearer: ${getState().auth.token}` } })
            .then(response => {
                if (response.status === 200) {
                    NotificationManager.success(response.data.message, 'Success', 3000);
                    dispatch(fetchGetAllCategories());
                    dispatch(setCreateCategoryOverlay(false));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchGetAllCategories = () => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/category/getAll`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getAllCategories(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchGetCategories = (limit) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/category/getCategories?limit=${limit}`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getCategories(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchDeleteCategory = (id) => {
    return (dispatch, getState) => {
        let url = `${process.env.REACT_APP_API_URL}/category/${id}`;

        axios
            .delete(url, { headers: { 'Authorization': `Bearer: ${getState().auth.token}` } })
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchGetAllCategories());
                    NotificationManager.success(response.data.message, 'Success', 3000);
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}