// Libraries
import axios from "axios";
import { NotificationManager } from 'react-notifications';

// Types
import { PROFILE } from "./userTypes";

// Action Methods
export const profile = (payload) => {
    return {
        type: PROFILE,
        payload,
    }
}

// Redux Thunk
export const fetchProfile = () => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/user/profile`;

        axios
            .get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(profile(response.data.data));
                    // NotificationManager.success(response.data.message, 'Success', 3000);
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}
