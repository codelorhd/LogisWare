import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchCurrentUser } from '../../actions';
class SideMenu extends Component {
    state = {}


    componentWillMount() {
        this.props.dispatch(fetchCurrentUser());
    }

    render() {
        let total_quotes = 0;
        return (
            <aside className="main-sidebar fixed offcanvas shadow">
                <section className="sidebar">
                    <div className="w-100px mt-3 mb-3 ml-3">
                        <img src="/static/core/assets/img/just_chert.png" alt="" />
                        <h4 className="ml-2"> <strong> LogisWare </strong> </h4>
                    </div>
                    <div className="relative">
                        <a data-toggle="collapse" href="#userSettingsCollapse" role="button" aria-expanded="false"
                            aria-controls="userSettingsCollapse"
                            className="btn-fab btn-fab-sm fab-right fab-top btn-primary shadow1 ">
                            <i className="icon icon-cogs"></i>
                        </a>
                        <div className="user-panel p-3 light mb-2">
                            <div>
                                <div className="float-left image">
                                    <img className="user_avatar" src='/static/core/assets/img/dummy/u2.png' alt="User Image" />
                                </div>
                                <div className="float-left info">
                                    <h6 className="font-weight-light mt-2 mb-1">{this.props.current_user == null ? null : this.props.current_user.name}</h6>
                                    <a href="#"><i className="icon-circle text-primary blink"></i> Online</a>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="collapse multi-collapse" id="userSettingsCollapse">
                                <div className="list-group mt-3 shadow">
                                    <a href="#" className="list-group-item list-group-item-action"><i
                                        className="mr-2 icon-security text-purple"></i>Change Password</a>
                                    <a href="/logout" className="list-group-item list-group-item-action"><i
                                        className="mr-2 icon-arrow-circle-o-right text-purple"></i>Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="sidebar-menu">
                        <li className="header"><strong>MAIN NAVIGATION</strong></li>

                        {this.props.is_human_resource || this.props.is_procurement ?

                            <li className="treeview"><a href="/procurement">
                                <i className="icon icon-sailing-boat-water purple-text s-18"></i> <span>Dashboard</span>
                            </a>
                            </li> : null
                        }
                        {!this.props.is_delivery ? null :

                            <li className="treeview"><a href="/delivery">
                                <i className="icon icon-sailing-boat-water purple-text s-18"></i> <span>Dashboard</span>
                            </a>
                            </li>
                        }

                        {
                            !this.props.current_user.is_procurement || !this.props.current_user.is_human_resource ? null :

                                <li className="treeview"><a href="#">
                                    <i className="icon icon icon-package blue-text s-18"></i>
                                    <span>Quotes</span>
                                    <span className="badge r-3 badge-primary pull-right">{total_quotes}</span>
                                </a>
                                    <ul className="treeview-menu">
                                        <li><a href="/procurement/quotes"><i className="icon icon-circle-o"></i>All
                                        Quotes</a>
                                        </li>
                                    </ul>
                                </li>
                        }


                        <li className="treeview"><a href="#">
                            <i className="icon icon icon-package blue-text s-18"></i>
                            <span>Staff Leave</span>
                        </a>
                            {
                                (this.props.current_user.is_human_resource) == false ? null :

                                    <ul className="treeview-menu">
                                        <li>
                                            <Link to="/app"><i className="icon icon-circle-o"></i>Overview
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to="/app/leave/type/create"><i className="icon icon-circle-o"></i>New Leave Type
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to="/app/leave/requests"><i className="icon icon-circle-o"></i>Leave Requests
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to="/app/departments"><i className="icon icon-circle-o"></i>Departments
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to="/app/staff"><i className="icon icon-circle-o"></i>Staff
                                    </Link>
                                        </li>
                                    </ul>
                            }

                            <ul className="treeview-menu">
                                <li>
                                    <Link to="/app/requests/leave"><i className="icon icon-circle-o"></i>Request Leave
                                            </Link>
                                </li>
                            </ul>
                        </li>

                    </ul>

                </section>
            </aside>
        );
    }
}

const mapStateToProps = state => {
    return {
        current_user: {
            name: state.currentUserReducer.name,
            id: state.currentUserReducer.id,
            is_delivery: state.currentUserReducer.is_delivery,
            is_sales: state.currentUserReducer.is_sales,
            is_procurement: state.currentUserReducer.is_procurement,
            is_human_resource: state.currentUserReducer.is_human_resource,
            email: state.currentUserReducer.email,
            is_active: state.currentUserReducer.is_active
        }
    }
};


export default connect(mapStateToProps, null)(SideMenu);