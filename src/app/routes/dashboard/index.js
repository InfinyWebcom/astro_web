import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Dashboard = ({ match }) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/dashboard`} to={`${match.url}/`} />
            <Route path={`${match.url}/`} component={asyncComponent(() => import('./routes'))} />

        </Switch>
    </div>
);

export default Dashboard;