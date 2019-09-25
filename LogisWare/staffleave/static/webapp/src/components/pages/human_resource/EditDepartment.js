import { connect } from "react-redux";
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { action_editDepartment, fetchDepartment } from "../../../actions";

let item_id = 0;
class EditDepartment extends Component {

    componentDidMount() {
        item_id = this.props.match.params.id;
        this.props.dispatch(fetchDepartment(item_id, this.props.dispatch));
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
        this.props.dispatch(action_editDepartment(formValues, item_id, this.props.dispatch));
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* FORM */}
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="card">
                            <div className="card-body b-b">
                                <p><strong>Edit Department: {this.props.name} </strong></p>


                                <div className="form-group focused">
                                    <label for="name"> Name * </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Name of the department"
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
            </div >
        );
    }
}


const validate = formValues => {
    const errors = {};

    return errors;
};


const mapStateToProps = (state) => {
    console.log(state);
    return {
        name: state.departmentReducers.department.name,
        initialValues: {
            name: state.departmentReducers.department.name,
        }
    }
};


const mapDispatchToProps = (dispatch) => ({
    action_editDepartment,
    fetchDepartment
});

// EditLeaveTypes = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(EditLeaveTypes);



const formWrapped = reduxForm({
    form: "editDepartmentForm",
    validate,
    enableReinitialize: true
})(EditDepartment);


export default connect(mapStateToProps, mapDispatchToProps)(formWrapped);

// export default reduxForm({
//     form: "editLeaveType",
//     validate,
//     enableReinitialize: true
// })(EditLeaveTypes);