import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideMenu from './includes/SideMenu';
import Routes from '../routes';

class Page extends Component {


    state = {}
    render() {
        return (<Router>
            <SideMenu />
            {/* header/nav  should be fixed here, always appearing */}


            <div className="page has-sidebar-left">
                <div className="pos-f-t">
                    <div className="collapse" id="navbarToggleExternalContent">
                        <div className="bg-dark pt-2 pb-2 pl-4 pr-2">
                            <div className="search-bar">
                                <input className="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50"
                                    type="text" placeholder="start typing..." />
                            </div>
                            <a href="#" data-toggle="collapse" data-target="#navbarToggleExternalContent"
                                aria-expanded="false" aria-label="Toggle navigation"
                                className="paper-nav-toggle paper-nav-white active "><i></i></a>
                        </div>
                    </div>
                </div>


                <div className="navbar navbar-expand d-flex justify-content-between navbar-dark bd-navbar blue accent-2 ">
                    <div className="relative">
                        <div className="d-flex">
                            <div>
                                <a href="#" data-toggle="offcanvas" className="paper-nav-toggle pp-nav-toggle">
                                    <i></i>
                                </a>
                            </div>
                            <div>
                                <h1 className="nav-title text-white">Human Resource </h1>
                            </div>
                        </div>
                    </div>



                    <div className="navbar-custom-menu p-t-10">
                        <ul className="nav navbar-nav">
                            <li>
                                <a className="nav-link " data-toggle="collapse" data-target="#navbarToggleExternalContent"
                                    aria-controls="navbarToggleExternalContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <i className=" icon-search3 "></i>
                                </a>
                            </li>

                            <li className="dropdown custom-dropdown user user-menu">
                                <a href="#" className="nav-link" data-toggle="dropdown">
                                    <img src="/static/core/assets//img/dummy/u8.png" className="user-image"
                                        alt="User Image" />
                                    <i className="icon-more_vert "></i>
                                </a>
                                <div className="dropdown-menu p-4">
                                    <div className="row box justify-content-between my-4">
                                        <div className="col">
                                            <a href="#">
                                                <i className="icon-apps purple lighten-2 avatar  r-5"></i>
                                                <div className="pt-1">Logout</div>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>



                </div>

                <div className="animatedParent animateOnce">
                    <div className="container-fluid my-3">
                        <Routes />
                    </div>
                </div>

            </div>

            {/* add footer here */}
        </Router>);
    }
}

export default Page;