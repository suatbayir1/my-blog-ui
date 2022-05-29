// TYPES
import { GET_POSTS, GET_ALL_POSTS, GET_SINGLE_POST } from "./postTypes";

const initialState = {
    posts: [],
    allPosts: [],
    selectedPost: {},
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case GET_ALL_POSTS:
            return {
                ...state,
                allPosts: action.payload
            }
        case GET_SINGLE_POST:
            return {
                ...state,
                selectedPost: action.payload
            }
        default:
            return state;
    }
}

export default postReducer;