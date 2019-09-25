import { connect } from "react-redux";
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { months_list } from '../../../utils';
import { action_editLeaveType, fetchLeaveType } from '../../../actions';

let item_id = 0;
class LeaveType_Edit extends Component {


    componentWillMount() {
        console.log(this.props);
        item_id = this.props.match.params.id;
        this.props.dispatch(fetchLeaveType(item_id));
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
        this.props.dispatch(action_editLeaveType(formValues, item_id, this.props.dispatch));
        // this.props.action_editLeaveType(formValues, item_id);
    }

    deleteLeaveType = (typeID) => {
        console.log(typeID);
    }

    getMonth = (month_index) => {
        return months_list[month_index - 1];
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* FORM */}
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="card">
                            <div className="card-body b-b">
                                <p><strong>Edit Leave Type: {this.props.name} </strong></p>


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
            </div >
        );
    }

}



const mapStateToProps = (state) => {
    console.log(state);
    return {
        name: state.leaveReducers.leave_type.name,
        initialValues: {
            name: state.leaveReducers.leave_type.name,
            number_of_days_to_notify: state.leaveReducers.leave_type.number_of_days_to_notify,
            maximum_days: state.leaveReducers.leave_type.maximum_days,
            include_working_days: state.leaveReducers.leave_type.include_working_days,
            end_month: state.leaveReducers.leave_type.end_month,
            start_month: state.leaveReducers.leave_type.start_month
        }
    }
};


const mapDispatchToProps = (dispatch) => ({
    action_editLeaveType,
    fetchLeaveType
});


const formWrapped = reduxForm({
    form: "editLeaveType",
    validate,
    enableReinitialize: true
})(LeaveType_Edit);


export default connect(mapStateToProps, mapDispatchToProps)(formWrapped);