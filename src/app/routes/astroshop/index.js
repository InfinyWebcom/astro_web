import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Astrshop = ({ match }) => {
    console.log('Astrshop')
    return <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/services`} />
            <Route path={`${match.url}/services`} component={asyncComponent(() => import('./routes/servicesIndex'))} />
            <Route path={`${match.url}/products`} component={asyncComponent(() => import('./routes/productIndex'))} />

        </Switch>
    </div>
};

export default Astrshop;