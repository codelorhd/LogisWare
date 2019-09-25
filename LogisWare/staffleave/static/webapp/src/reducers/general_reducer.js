import { FAILURE, SUCCESS } from '../actions/types';

export default (state = { error_message: null }, action) => {
    switch (action.type) {
        case FAILURE:
            alert(action.payload.message);
            return {
                ...state,
                error_message: action.payload.message
            }

        default:
            return state;
    }
};