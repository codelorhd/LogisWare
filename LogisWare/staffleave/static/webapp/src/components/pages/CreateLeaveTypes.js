import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";

import { months_list } from './../../utils';
import { action_createLeaveType, fetchLeaveTypes, action_editLeaveType } from "../../actions";

class CreateLeaveTypes extends Component {

    componentWillMount() {
        console.log(this.props);

        this.props.dispatch(fetchLeaveTypes());
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

    renderMonthsList = ({ input, }) => {
        return (
            <select className="form-control" {...input} >
                <option value="" >Select Month</option>
                <option value="1" > January </option>
                <option value="2" > February </option>
                <option value="3" > March </option>
                <option value="4" > April </option>
                <option value="5" > May </option>
                <option value="6" > June </option>
                <option value="7" > July </option>
                <option value="8" > August </option>
                <option value="9" > September </option>
                <option value="10" > October </option>
                <option value="11" > November </option>
                <option value="12" > December </option>
            </select>
        );
    }


    renderChecbox = ({ placeholder, input, checkboxID }) => {

        return (
            <div className="form-check mb-2 mr-sm-2">
                <input id={checkboxID} className="form-check-input" type="checkbox" {...input} />
                <label className="form-check-label" for={checkboxID}>
                    {placeholder}
                </label>
            </div>
        );

    }

    onSubmit = (formValues) => {
        this.props.dispatch(action_createLeaveType(formValues));
        // this.props.action_createLeaveType(formValues);
    }

    getMonth = (month_index) => {
        return months_list[month_index - 1];
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-4 ">
                    {/* FORM */}
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="card">
                            <div className="card-body b-b">
                                <p><strong>New Leave Type</strong></p>


                                <div className="form-group focused">
                                    <label for="type_name"> Name * </label>
                                    <Field
                                        id="type_name"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="What is the name of this leave type?"
                                        component={this.renderInput}
                                        type="text"
                                    />
                                </div>

                                <div className="form-group focused">
                                    <label for="maximum_days"> Maximum Days * </label>
                                    <Field
                                        id="maximum_days"
                                        name="maximum_days"
                                        className="form-control form-control-lg"
                                        placeholder="Maximum days for leave"
                                        component={this.renderInput}
                                        type="number"
                                    />

                                    <Field
                                        name="include_working_days"
                                        id="include_working_days"
                                        checkboxID="include_working_days"
                                        component={this.renderChecbox}
                                        type="checkbox"
                                        placeholder="Include working days"
                                    />
                                </div>

                                <div className="form-group">
                                    <label for="start_month"> Start Month </label>
                                    <Field
                                        id="start_month"
                                        name="start_month"
                                        className="form-control form-control-lg"
                                        component={this.renderMonthsList}
                                    />
                                </div>

                                <div className="form-group">
                                    <label for="end_month"> End Month </label>
                                    <Field
                                        id="end_month"
                                        name="end_month"
                                        className="form-control form-control-lg"
                                        component={this.renderMonthsList}
                                    />
                                </div>


                                <div className="form-group focused">
                                    <label for="number_of_days_to_notify"> Number of Days to Notify * </label>
                                    <Field
                                        id="number_of_days_to_notify"
                                        name="number_of_days_to_notify"
                                        className="form-control form-control-lg"
                                        placeholder="Number of days to notify"
                                        component={this.renderInput}
                                        type="number"
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
                                        <th data-breakpoints="lg" >Toggle</th>
                                        <th data-breakpoints="xs" >#</th>
                                        <th>Name</th>
                                        <th data-breakpoints="xs" >Maximum Days</th>
                                        <th data-breakpoints="xs" >Start Month</th>
                                        <th data-breakpoints="xs" >End Month</th>
                                        <th data-breakpoints="xs" >Days to Notify</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.leave_types.map((item, index) => {
                                            return (<tr key={index} >
                                                <td>TAP</td>
                                                <td>{++index}</td>
                                                <td>{item.name}</td>
                                                <td>{item.maximum_days} <br />

                                                    {item.include_working_days ? "Working days included" : "Working days not included"}
                                                </td>
                                                <td>{this.getMonth(item.start_month)}</td>
                                                <td> {this.getMonth(item.end_month)} </td>
                                                <td>{item.number_of_days_to_notify} </td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Action
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <Link className="dropdown-item" to={`/app/leave/type/edit/${item.id}`}>
                                                                Edit
                                                            </Link>
                                                            <Link to={`/app/leave/type/delete/${item.id}`}>
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
    form: "createLeaveType",
    validate
})(CreateLeaveTypes);

const mapStateToProps = state => {
    return {
        name: state.leaveReducers.name,
        number_of_days_to_notify: state.leaveReducers.number_of_days_to_notify,
        maximum_days: state.leaveReducers.maximum_days,
        include_working_days: state.leaveReducers.include_working_day,
        end_month: state.leaveReducers.end_month,
        start_month: state.leaveReducers.start_month,

        error_message: state.generalReducers.error_message,
        success_message: state.generalReducers.success_message,

        leave_types: state.leaveReducers.leave_types
    }

};


export default connect(mapStateToProps, null)(formWrapped);