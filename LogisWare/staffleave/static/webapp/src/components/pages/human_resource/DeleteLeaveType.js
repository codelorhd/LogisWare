import { connect } from "react-redux";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchLeaveType } from "../../../actions";
import request from '../../../apis/request';


let item_id = 0;
class DeleteLeaveType extends Component {
    state = {
        data: {}
    }

    componentWillMount() {
        item_id = this.props.match.params.id;
        request.get("/types/" + item_id + "/").then(response => {
            this.setState({
                ...response.data
            });
        }).catch(error => {
            console.log(error.response.data);
            this.props.history.push("/app/leave/type/create");
        });

    }

    deleteItem = () => {
        request.delete(this.state.url).then(response => {
            this.props.history.push("/app/leave/type/create");
        });
    }

    dontDelete = () => {
        this.props.history.push("/app/leave/type/create");
    }


    render() {
        console.log(this.props);

        return (
            <div className="row">
                <div className="col-md-6 offset-md-2">


                    <div className="card">
                        <div className="card-body b-b">
                            <p><strong>Delete Item? ({this.state.name}) </strong></p>


                            <div className="form-group" >
                                <p>Deleting this object will delete all the corresponding requests</p>
                            </div>

                            <div className="form-group" >
                                <button onClick={this.deleteItem} className="btn btn-danger" >Delete</button> &nbsp;
                                <button onClick={this.dontDelete} className="btn btn-secondary" >Cancel</button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default DeleteLeaveType;