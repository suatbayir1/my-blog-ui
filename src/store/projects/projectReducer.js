// TYPES
import { GET_PROJECTS, GET_ALL_PROJECTS, GET_SINGLE_PROJECT } from "./projectTypes";

const initialState = {
    projects: [],
    allProjects: [],
    selectedProject: {},
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case GET_ALL_PROJECTS:
            return {
                ...state,
                allProjects: action.payload
            }
        case GET_SINGLE_PROJECT:
            return {
                ...state,
                selectedProject: action.payload
            }
        default:
            return state;
    }
}

export default projectReducer;