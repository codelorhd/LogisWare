import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";

import { fetchAllStaff, action_createStaff, fetchDepartments } from "../../../actions";

class StaffView extends Component {

    componentWillMount() {

        this.props.dispatch(fetchAllStaff());
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


    renderList = ({ input, list }) => {
        console.log(list);

        // const dropdowns = "";
        // list.map((item, index) => {
        //     dropdowns.append(
        //         `<option value="${item.id}">${item.name}</option>`
        //     );
        // });
        // return dropdowns;

        return (
            <select className="form-control" {...input} >
                <option value="" >Select Department</option>
                {
                    list.map((item, index) => {
                        return (<option value={`${item.id}`} > {item.name} </option>);
                    })
                }
            </select>
        );
    }


    onSubmit = (formValues) => {
        this.props.dispatch(action_createStaff(formValues));
        // this.props.action_createLeaveType(formValues);
    }

    render() {
        console.log(this.props.staff_list);
        return (
            <div className="row">
                <div className="col-md-4 ">
                    {/* FORM */}
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="card">
                            <div className="card-body b-b">
                                <p><strong>New Staff</strong></p>


                                <div className="form-group focused">
                                    <label for="type_name"> Staff Name * </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Staff Name?"
                                        component={this.renderInput}
                                        type="text"
                                    />
                                </div>

                                <div className="form-group focused">
                                    <label for="type_name"> Staff Email * </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="Staff Email?"
                                        component={this.renderInput}
                                        type="email"
                                    />
                                </div>

                                <div className="form-group focused">
                                    <label for="department"> Department * </label>
                                    <Field
                                        id="department"
                                        name="department"
                                        className="form-control form-control-lg"
                                        placeholder="Department"
                                        component={this.renderList}
                                        list={this.props.departments}
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
                                        <th data-breakpoints="xs" >Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.staff_list.map((item, index) => {
                                            return (<tr key={index} >
                                                <td>{++index}</td>
                                                <td>{item.user_data.name}</td>
                                                <td>{item.user_data.email}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Action
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <Link className="dropdown-item" to={`/app/staff/edit/${item.id}`}>
                                                                Edit
                                                            </Link>
                                                            <Link to={`/app/staff/delete/${item.id}`}>
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
    const errors = {};

    return errors;
};

const formWrapped = reduxForm({
    form: "staffForm",
    validate
})(StaffView);

const mapStateToProps = state => {

    console.group("staffReducer");
    state.staffReducer.staff_list.map((item, index) => {
        console.log(item);
    });
    console.groupEnd();

    return {
        name: state.staffReducer.name,
        staff: state.staffReducer.staff,
        staff_list: state.staffReducer.staff_list,
        departments: state.departmentReducers.departments,
    }

};


export default connect(mapStateToProps, null)(formWrapped);