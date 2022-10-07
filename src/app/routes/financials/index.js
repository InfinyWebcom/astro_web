import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Astrshop = ({ match }) => {
    console.log('Astrshop')
    return <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/settlements`} />
            <Route path={`${match.url}/settlements`} component={asyncComponent(() => import('./routes/settlementIndex'))} />
            <Route path={`${match.url}/transactions`} component={asyncComponent(() => import('./routes/transactionsIndex'))} />

        </Switch>
    </div>
};

export default Astrshop;