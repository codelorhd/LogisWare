import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";

import { fetchStaff, action_editStaff, fetchDepartments } from "../../../actions";

let item_id = 0;
class StaffEdit extends Component {

    componentWillMount() {
        item_id = this.props.match.params.id;
        this.props.dispatch(fetchStaff(item_id));
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
        this.props.dispatch(action_editStaff(formValues, item_id));
        // this.props.action_createLeaveType(formValues);
    }

    render() {
        console.log(this.props.staff);
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* FORM */}
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="card">
                            <div className="card-body b-b">
                                <p><strong>Edit Staff {this.props.name}</strong></p>


                                <div className="form-group focused">
                                    <label for="name"> Staff Name * </label>
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
            </div >
        );
    }
}


const validate = formValues => {
    const errors = {};

    return errors;
};

const formWrapped = reduxForm({
    form: "editStaffForm",
    validate,
    enableReinitialize: true
})(StaffEdit);

const mapStateToProps = state => {
    console.log(state);

    return {
        name: state.staffReducer.staff.user_data.name,
        staff: state.staffReducer.staff,
        departments: state.departmentReducers.departments,

        initialValues: {
            name: state.staffReducer.staff.user_data.name,
            email: state.staffReducer.staff.user_data.email,
            department: state.staffReducer.staff.department
        }
    }

};


export default connect(mapStateToProps, null)(formWrapped);