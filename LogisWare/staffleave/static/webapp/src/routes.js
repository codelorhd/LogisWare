import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    CreateLeaveTypes, StaffLeaveDashboard,
    LeaveRequests, EditLeaveTypes, Department, StaffView, StaffDelete, StaffEdit,
} from './components/pages'
import EditDepartment from './components/pages/human_resource/EditDepartment';
import DeleteDepartment from './components/pages/human_resource/DeleteDepartment';

const Routes = (mainProps) => {
    return (
        <Switch>
            <Route path="/app/leave/" exact component={StaffLeaveDashboard} />
            <Route path="/app/leave/type/create" component={CreateLeaveTypes} />
            <Route path="/app/leave/requests" component={LeaveRequests} />
            <Route path="/app/leave/type/edit/:id" component={EditLeaveTypes} />
            <Route path="/app/department/edit/:id" component={EditDepartment} />
            <Route path="/app/department/delete/:id" component={DeleteDepartment} />
            <Route path="/app/departments" component={Department} />
            <Route exact path="/app/staff" component={StaffView} />
            <Route path="/app/staff/edit/:id" component={StaffEdit} />
            <Route path="/app/staff/delete/:id" component={StaffDelete} />
        </Switch>
    );
};

export default Routes;