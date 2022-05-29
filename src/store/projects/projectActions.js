// Libraries
import axios from "axios";
import { NotificationManager } from 'react-notifications';

// Types
import { GET_PROJECTS, GET_ALL_PROJECTS, GET_SINGLE_PROJECT } from "./projectTypes";

// Action Methods
export const getProjects = (payload) => {
    return {
        type: GET_PROJECTS,
        payload,
    }
}

export const getAllProjects = (payload) => {
    return {
        type: GET_ALL_PROJECTS,
        payload,
    }
}

export const getSingleProject = (payload) => {
    return {
        type: GET_SINGLE_PROJECT,
        payload,
    }
}

// Redux Thunk
export const fetchGetProjects = (limit) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/project/getProjects?limit=${limit}`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getProjects(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchGetAllProjects = (limit) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/project/getAllProjects`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getAllProjects(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}

export const fetchGetSingleProject = (id) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/project/${id}`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getSingleProject(response.data.data));
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}