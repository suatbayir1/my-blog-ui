// Libraries
import axios from "axios";
import { NotificationManager } from 'react-notifications';

// Redux Thunk
export const fetchSendMessageToAdmin = (payload) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}/contact/sendMessageToAdmin`;

        axios
            .post(url, payload)
            .then(response => {
                if (response.status === 200) {
                    NotificationManager.success(response.data.message, 'Success', 3000);
                }
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            })
    }
}
