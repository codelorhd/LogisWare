import { connect } from "react-redux";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import request from '../../../apis/request';
import { fetchStaff, fetchUser } from '../../../actions';

let item_id = 0;
class StaffDelete extends Component {
    state = {
        data: {}
    }

    componentWillMount() {
        item_id = this.props.match.params.id;
        request.get("/staff/" + item_id + "/").then(async response => {

            await fetchUser(response.data.user).then(user_response => {
                response.data['name'] = user_response.data.name;
                response.data['id'] = user_response.data.id;
                console.log(user_response.data);
            });
            console.log(response.data);
            this.setState({
                ...response.data
            }, () => {
                console.log(this.state);
            });
        }).catch(error => {
            console.log(error);
            console.log(error.response.data);
            this.props.history.push("/app/staff");
        });

    }

    deleteItem = () => {
        request.delete(this.state.url).then(response => {
            this.props.history.push("/app/staff");
        });
    }

    dontDelete = () => {
        this.props.history.push("/app/staff");
    }


    render() {
        console.log(this.state);

        return (
            <div className="row">
                <div className="col-md-6 offset-md-2">


                    <div className="card">
                        <div className="card-body b-b">
                            <p><strong>Delete Item? ({this.state.name}) </strong></p>


                            <div className="form-group" >
                                <p>Deleting this object will assign all staff's requests.</p>
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

export default StaffDelete;