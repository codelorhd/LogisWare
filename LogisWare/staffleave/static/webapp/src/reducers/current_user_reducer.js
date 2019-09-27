import { CURRENT_USER_DATA_FAILED, CURRENT_USER_DATA } from '../actions/types';

const INITIAL_STATE = {
    id: null,
    is_delivery: null,
    is_sales: null,
    is_procurement: null,
    is_human_resource: null,
    name: null,
    email: null,
    is_active: null
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CURRENT_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
};