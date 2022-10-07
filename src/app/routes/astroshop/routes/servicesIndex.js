import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from 'util/asyncComponent';

const Astrshop = ({ match }) => {
    console.log('Astrshop')
    return <div className="">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/lists`} />
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./services'))} />
            <Route path={`${match.url}/addServices`} component={asyncComponent(() => import('./addServices'))} />
            <Route path={`${match.url}/editServices/:id`} component={asyncComponent(() => import('./editServices'))} />
        </Switch>
    </div>
};

export default Astrshop;