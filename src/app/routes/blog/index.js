import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from 'util/asyncComponent';

const Blog = ({ match }) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/lists`} />
            <Route path={`${match.url}/lists`} component={asyncComponent(() => import('./routes'))} />
            <Route path={`${match.url}/add`} component={asyncComponent(() => import('./routes/addBlog'))} />
            <Route path={`${match.url}/edit/:id`} component={asyncComponent(() => import('./routes/editBlog'))} />
        </Switch>
    </div>
);

export default Blog;