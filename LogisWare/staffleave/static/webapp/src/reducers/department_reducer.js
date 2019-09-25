import { FETCH_DEPARTMENT, FETCH_DEPARTMENTS, DEPARTMENT_CREATED, DEPARTMENT_EDITED } from '../actions/types';

const INITIAL_LEAVE_DATA = {
    name: null,
    departments: [],
    department: {}
}

export default (state = INITIAL_LEAVE_DATA, action) => {
    switch (action.type) {
        case DEPARTMENT_CREATED:
            alert(action.payload.message);
            return {
                ...state,
                error_message: null,
                success_message: "Department has been created"
            }
        case FETCH_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload.data
            }
        case FETCH_DEPARTMENT:
            return {
                ...state,
                department: action.payload.data
            }
        case DEPARTMENT_EDITED:
            return {
                ...state,
                department: action.payload.data
            }


        default:
            return state;
    }
};