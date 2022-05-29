// Libraries
import { combineReducers } from "redux";

// Reducers
import authReducer from "./auth/authReducer";
import userReducer from "./user/userReducer";
import generalReducer from "./general/generalReducer";
import projectReducer from "./projects/projectReducer";
import postReducer from "./post/postReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    general: generalReducer,
    project: projectReducer,
    post: postReducer
});

export default rootReducer;
