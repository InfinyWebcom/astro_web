import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from 'util/asyncComponent';

const ServiceRequests = ({ match }) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/lists`} />
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./routes'))} />
        </Switch>
    </div>
);

export default ServiceRequests;