import { reset } from 'redux-form';

import { refreshToken } from '../apis/token';
import request, { getAccessToken, getRefreshedRequest, refreshTheAccessToken } from '../apis/request';

import {
    FETCH_TYPES_LOADED, FETCH_TYPE_LOADED, LOGGED_OUT, FETCH_DEPARTMENTS, FETCH_DEPARTMENT,
    LOGGED_IN, LEAVE_TYPE_CREATED, FAILURE, LEAVE_TYPE_EDITED, DEPARTMENT_CREATED, DEPARTMENT_EDITED,
    STAFF_CREATED, STAFF_DELETED, FETCH_ALL_STAFF, FETCH_STAFF, STAFF_EDITED, CURRENT_USER_DATA, CURRENT_USER_DATA_FAILED
} from "./types";

export const fetchCurrentUser = () => async dispatch => {
    getRefreshedRequest().then(refreshed_request_response => {
        let request = getAccessToken();
        request.get("/users/current/").then(response => {
            dispatch({ type: CURRENT_USER_DATA, payload: response.data });
        });
    }).catch(error => {
        // do nothing
    });
}


export const action_editStaff = (formValues, staffId) => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        await request.put(`/staff/${staffId}/`, formValues).then(response => {
            fetchUser(response.data['user']).then(user_response => {
                const user = user_response.data;
                response.data['user_data'] = user;
            }).finally(() => {
                dispatch({ type: STAFF_EDITED, payload: { message: "A staff's data has been modified", data: response.data } });
                dispatch(reset("editStaffForm"));
            });
        }).catch(error => {
            processFailedRequest(dispatch, error);
        });
    });
};

export const action_createStaff = (formValues) => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        await request.post("/staff/", formValues).then(response => {
            dispatch({ type: STAFF_CREATED, payload: { message: "A staff has been created, advise staff to check mail box" }, data: response.data });
            dispatch(reset("staffForm"));
            dispatch(fetchAllStaff());
        }).catch(error => {
            processFailedRequest(dispatch, error);
        });
    });

}

export const fetchAllStaff = () => async dispatch => {
    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        let response_data = [];
        await request.get("/staff/").then(response => {
            response_data = response.data;

            /**
             * This script below tries to fetch each user data for each
             * of the staff. The user data is stored in each index-value
             * with the key user_data.
             * When all the user is gotten dispatch the FETCH_ALL_STAFF action
             */
            response_data.map(function (item, index) {
                console.log("Fetching " + item.user);
                fetchUser(item.user).then((user_response) => {
                    console.log(response_data[index]);
                    console.log(item.user, user_response.data.id);
                    if (item.user == user_response.data.id) {
                        response_data[index]['user_data'] = user_response.data;
                    }

                    //Fetch the correct department

                    // getFetchDepartmentRequest(item.department).then((department_response) => {
                    //     console.log(department_response);
                    //     response_data[index]['department_data'] = department_response.data;
                    //     console.log(response_data);
                    // }).catch(error => {
                    //     console.log(error);
                    // }).finally(() => {
                    //     if (index == response_data.length - 1) {
                    //         // dispatch at the last request in this async function
                    //         dispatch({ type: FETCH_ALL_STAFF, payload: { data: response_data } });
                    //     }
                    // });

                }).finally(() => {
                    if (index == response_data.length - 1) {
                        console.group();
                        console.log("running finally " + index + " " + response_data.length);
                        console.log(response_data);
                        console.groupEnd();
                        // dispatch at the last request in this async function
                        dispatch({ type: FETCH_ALL_STAFF, payload: { data: response_data } });
                    }
                });
            });

        }).catch(error => {
            console.log(error);
            processFailedRequest(dispatch, error);
        }).finally(() => {
        });
    });
};

export const getFetchDepartmentRequest = async (department_id) => {
    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        return request.get(`/departments/${department_id}/`);
    });
};

export const fetchUser = async (userId) => {

    return await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        return await request.get(`/users/${userId}/`);
    });
};

export const fetchStaff = (staffId) => async dispatch => {
    let response_data = {
        user_data: {
            name: "",
            email: "",
            department: 0
        }
    };

    console.log(staffId);
    await getRefreshedRequest().then(async refreshed_request_response => {

        let request = getAccessToken();
        await request.get(`/staff/${staffId}/`).then(async response => {

            response_data = response.data;

            /**
             * This script below tries to fetch each user data for each
             * of the staff. The user data is stored in each index-value
             * with the key user_data.
             * When all the user is gotten dispatch the FETCH_ALL_STAFF action
             */
            console.log("Fetching " + response_data.user);
            await fetchUser(response_data.user).then(user_response => {
                console.log(user_response);
                if (response_data.user == user_response.data.id) {
                    response_data['user_data'] = user_response.data;
                }

                //Fetch the correct department

                getFetchDepartmentRequest(response_data.department).then((department_response) => {
                    response_data['department_data'] = department_response.data;
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    dispatch({ type: FETCH_STAFF, payload: { data: response_data } });
                });

            });

        }).catch(error => {
            console.log(error);
            processFailedRequest(dispatch, error);
        });
    });
}

export const action_editDepartment = (formValues, departmentID) => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();

        await request.put(`/departments/${departmentID}/`, formValues).then(response => {
            dispatch({ type: DEPARTMENT_EDITED, payload: { message: 'Department has been edited', data: response.data } });
            dispatch(reset("editDepartmentForm"));
            dispatch(fetchDepartment(departmentID));
        }).catch(error => {
            processFailedRequest(dispatch, error);
        });
    });
}

export const action_createDepartment = (formValues) => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        await request.post("/departments/", formValues).then(response => {
            dispatch({ type: DEPARTMENT_CREATED, payload: { message: "Department has been created successfully", data: response.data } });
            dispatch(reset("departmentForm"));
            dispatch(fetchDepartments());
        }).catch(error => {
            processFailedRequest(dispatch, error);
        });
    });
};

export const fetchDepartment = (item_id) => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        console.log(request.defaults.headers);
        await request.get(`/departments/${item_id}/`).then(response => {
            dispatch({ type: FETCH_DEPARTMENT, payload: { data: response.data } });
        }).catch(error => {
            processFailedRequest(dispatch, error);
            // console.log(error.response.data);
            // const error_data = error.response.data;
            // if (error_data.detail != undefined) {
            //     alert(error_data.detail);
            // }
            console.log("BIG ERROR 4");
        });
    });
}
export const fetchDepartments = () => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        console.log(request.defaults.headers);
        await request.get("/departments/").then(response => {
            console.log(response.data);
            dispatch({ type: FETCH_DEPARTMENTS, payload: { data: response.data } });
        }).catch(error => {
            processFailedRequest(dispatch, error);
            console.log("BIG ERROR 3");
        });
    });
}

function processFailedRequest(dispatch, error) {
    let error_message = "";

    if (error.response != undefined && error.response.data.message != undefined) {
        error_message = error.response.data.message;
    } else if (error.response != undefined && error.response.data.detail != undefined) {
        error_message = error.response.data.detail;
    }

    dispatch({ type: FAILURE, payload: { message: error_message } });
}

export const action_editLeaveType = (formValues, typeID) => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();

        await request.put(`/types/${typeID}/`, formValues).then(response => {
            dispatch({ type: LEAVE_TYPE_EDITED, payload: { message: 'Leave Type has been edited', data: response.data } });
            dispatch(reset("editLeaveType"));
            dispatch(fetchLeaveType(typeID));
        }).catch(error => {
            processFailedRequest(dispatch, error);
        });
    });
}

export const action_createLeaveType = formValues => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {

        let request = getAccessToken();
        await request.post("/types/", formValues).then(response => {
            dispatch({ type: LEAVE_TYPE_CREATED, payload: { message: "Leave Type has been created", data: response.data } });
            dispatch(reset("createLeaveType"));
            dispatch(fetchLeaveTypes());
        }).catch(error => {
            processFailedRequest(dispatch, error);
        });
    });
};

export const fetchLeaveType = (item_id) => async dispatch => {

    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        console.log(request.defaults.headers);

        await request.get("/types/" + item_id).then(response => {
            console.log(response.data);
            dispatch({ type: FETCH_TYPE_LOADED, payload: { data: response.data } });
        }).catch(error => {
            processFailedRequest(dispatch, error);
            console.log("BIG ERROR 1");
        });
    });
}
export const fetchLeaveTypes = () => async dispatch => {
    await getRefreshedRequest().then(async refreshed_request_response => {
        let request = getAccessToken();
        await request.get("/types/").then(response => {
            dispatch({ type: FETCH_TYPES_LOADED, payload: { data: response.data } });
        }).catch(error => {
            processFailedRequest(dispatch, error);
            console.log("BIG ERROR 2");
        });
    });
}


export const logout = () => dispatch => {
    localStorage.removeItem("access_token");
}

export const refreshAccessToken = () => async dispatch => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if ((access_token == null || access_token == undefined)
        && (refresh_token == null || refresh_token == undefined)) {
        console.log("Logging Out");
        return { type: LOGGED_OUT, payload: { auth_status: 'logout' } };
    }
    console.log("Refreshing Token");

    // console.log(`Authorization Bearer ${access_token}`);
    await refreshToken.post('api/v1/refresh/', {
        // token: access_token,
        refresh: refresh_token
    }
        // ,{
        //         headers: {
        //             'Authorization': `Bearer ${access_token}`,
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         }
        //     }
    ).then(response => {
        const newtoken = response.data.access;
        // console.group("Old Token");
        // console.log(localStorage.getItem("access_token"));
        // console.group();
        localStorage.setItem("access_token", newtoken);
        // console.group("New Token");
        // console.log(localStorage.getItem("access_token"));
        // console.groupEnd();
    }).catch(error => {
        console.log(error);
        console.log(error.response);
        console.log(error.message);
        console.log(error.response.data);
        return { type: LOGGED_OUT, payload: { auth_status: 'logout' } };
    });
    // console.log(response);

    return { type: LOGGED_IN, payload: { auth_status: 'loggedin' } }
}

export const saveAccessToken = tokens => dispatch => {
    // Store the token in the client's localstorage
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    const REFRESH_MILLISECONDS = 300000;

    // Fire a timeout to always refresh the token
    dispatch(refreshTheAccessToken());
    setInterval(() => {
        console.log("refreshing " + REFRESH_MILLISECONDS);
        dispatch(refreshTheAccessToken());
    }, REFRESH_MILLISECONDS);

    // dispatch login status
    // dispatch({ type: SAVE_ACCESS_TOKEN, payload: token });
}