import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";

import { months_list } from '../../../utils';
import { fetchDepartments, action_createDepartment } from "../../../actions";

class Department extends Component {

    componentWillMount() {

        this.props.dispatch(fetchDepartments());
    }

    renderInput = ({ input, placeholder, className }) => {
        return (
            <input
                {...input}
                required
                autocomplete="off"
                className={className}
                placeholder={placeholder}
            />
        );
    };


    onSubmit = (formValues) => {
        this.props.dispatch(action_createDepartment(formValues));
        // this.props.action_createLeaveType(formValues);
    }


    render() {

        return (
            <div className="row">
                <div className="col-md-4 ">
                    {/* FORM */}
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="card">
                            <div className="card-body b-b">
                                <p><strong>New Department</strong></p>


                                <div className="form-group focused">
                                    <label for="name"> Name * </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Department's Name?"
                                        component={this.renderInput}
                                        type="text"
                                    />
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-danger">Submit</button>
                                </div>

                            </div>

                        </div>
                    </form>
                    {/* END FORM  */}
                </div>

                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body b-b">
                            <table ref="leavetable" className="table table-bordered table-hover footable" data-paging="true" >
                                <thead>
                                    <tr>
                                        <th data-breakpoints="xs" >#</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.departments.map((item, index) => {
                                            return (<tr key={index} >
                                                <td>{++index}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Action
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <Link className="dropdown-item" to={`/app/department/edit/${item.id}`}>
                                                                Edit
                                                            </Link>
                                                            <Link to={`/app/department/delete/${item.id}`}>
                                                                <i className="dropdown-item">Delete</i>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >

            </div >
        );
    }
}


const validate = formValues => {
    console.log();
    const errors = {};

    return errors;
};

const formWrapped = reduxForm({
    form: "departmentForm",
    validate
})(Department);

const mapStateToProps = state => {
    return {
        name: state.departmentReducers.name,
        departments: state.departmentReducers.departments,
        department: state.departmentReducers.department,

        error_message: state.departmentReducers.error_message,
        success_message: state.departmentReducers.success_message,
    }

};


export default connect(mapStateToProps, null)(formWrapped);