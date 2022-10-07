import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Dashboard = ({ match }) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/lists`} />
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./routes'))} />
            <Route path={`${match.url}/addTip/:id`} component={asyncComponent(() => import('./routes/addTip'))} />
        </Switch>
    </div>
);

export default Dashboard;