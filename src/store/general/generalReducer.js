// TYPES
import {
    SET_ALL_PROJECTS_OVERLAY, SET_ALL_POSTS_OVERLAY, SET_CREATE_CATEGORY_OVERLAY,
    GET_ALL_CATEGORIES, GET_CATEGORIES
} from "./generalTypes";

const initialState = {
    visibleAllProjectsOverlay: false,
    visibleAllPostsOverlay: false,
    visibleCreateCategoryOverlay: false,
    allCategories: [],
    categories: []
}

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PROJECTS_OVERLAY:
            return {
                ...state,
                visibleAllProjectsOverlay: action.payload
            }
        case SET_ALL_POSTS_OVERLAY:
            return {
                ...state,
                visibleAllPostsOverlay: action.payload
            }
        case SET_CREATE_CATEGORY_OVERLAY:
            return {
                ...state,
                visibleCreateCategoryOverlay: action.payload
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}

export default generalReducer;