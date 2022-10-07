import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from 'util/asyncComponent';

const Astrshop = ({ match }) => {
    console.log('Astrshop')
    return <div className="">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/lists`} />
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./products'))} />
            <Route path={`${match.url}/addProduct`} component={asyncComponent(() => import('./addProducts'))} />
            <Route path={`${match.url}/editProduct/:id`} component={asyncComponent(() => import('./editProducts'))} />
        </Switch>
    </div>
};

export default Astrshop;