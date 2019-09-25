import { LEAVE_TYPE_CREATED, FETCH_TYPES_LOADED, FETCH_TYPE_LOADED } from '../actions/types';

const INITIAL_LEAVE_DATA = {
    name: null,
    maximum_days: null,
    include_working_days: null,
    start_month: null,
    end_month: null,
    number_of_days_to_notify: null,
    leave_types: [],
    leave_type: {}
}

export default (state = INITIAL_LEAVE_DATA, action) => {
    switch (action.type) {
        case LEAVE_TYPE_CREATED:
            alert(action.payload.message);
            return {
                ...state,
                error_message: null,
                success_message: "Leave Type has been created"
            }
        case FETCH_TYPES_LOADED:
            return {
                ...state,
                leave_types: action.payload.data
            }
        case FETCH_TYPE_LOADED:
            return {
                ...state,
                leave_type: action.payload.data
            }


        default:
            return state;
    }
};