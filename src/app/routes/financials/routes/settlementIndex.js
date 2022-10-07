import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from 'util/asyncComponent';

const Settlements = ({ match }) => {
    return <div className="">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/lists`} />
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./settlements'))} />
            <Route path={`${match.url}/details/:id`} component={asyncComponent(() => import('./settlementDetails'))} />
        </Switch>
    </div>
};

export default Settlements;