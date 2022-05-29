// TYPES
import { PROFILE } from "./userTypes";

const initialState = {
    user: {},
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;