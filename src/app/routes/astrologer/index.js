import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Astrolger = ({ match }) => {
    console.log('Astrolger')
    return <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/lists`} />
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./routes'))} />
            <Route path={`${match.url}/add`} component={asyncComponent(() => import('./routes/addStrologer'))} />
            <Route path={`${match.url}/edit/:id`} component={asyncComponent(() => import('./routes/editAstrologer'))} />
            <Route path={`${match.url}/approve/:id`} component={asyncComponent(() => import('./routes/editAstrologer'))} />
            <Route path={`${match.url}/certificates/:id`} component={asyncComponent(() => import('./routes/certificates'))} />
            <Route path={`${match.url}/ratings-reviews/:id`} component={asyncComponent(() => import('./routes/ratings'))} />
            <Route path={`${match.url}/details/:id`} component={asyncComponent(() => import('../consumers/routes/details'))} />
        </Switch>
    </div>
};

export default Astrolger;