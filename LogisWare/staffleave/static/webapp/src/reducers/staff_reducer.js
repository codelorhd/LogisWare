import { STAFF_EDITED, FETCH_ALL_STAFF, FETCH_STAFF, STAFF_CREATED } from '../actions/types';
import { fetchAllStaff } from '../actions';

const INITIAL_DATA = {
    name: "",
    staff: {
        user_data: {
            name: "",
            email: ""
        }
    },
    staff_list: [],

}

export default (state = INITIAL_DATA, action) => {

    switch (action.type) {
        case STAFF_CREATED:
            alert(action.payload.message);
            return {
                ...state,
                error_message: null,
                success_message: "Staff has been created"
            }
        case FETCH_ALL_STAFF:
            return {
                ...state,
                staff_list: action.payload.data
            }
        case FETCH_STAFF:
            return {
                ...state,
                staff: action.payload.data
            }
        case STAFF_EDITED:
            console.log(action.payload.data);
            return {
                ...state,
                staff: action.payload.data
            }


        default:
            return state;
    }
};