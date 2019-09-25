import { connect } from "react-redux";
import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import { saveAccessToken } from './../actions';
import Routes from '../routes';
import { CreateLeave } from "./pages";
import Page from "./Page";


class App extends Component {

    componentDidMount() {
        let ACCESS_TOKEN = document.head.getAttribute('data-index');
        let REFRESH_TOKEN = document.head.getAttribute('data-control');
        this.props.saveAccessToken({
            access: ACCESS_TOKEN,
            refresh: REFRESH_TOKEN
        });
    }


    render() {
        return (
            <Page />
        );
    }
}


export default connect(
    null,
    { saveAccessToken }
)(App);