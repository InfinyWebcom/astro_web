import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import configureStore, { history } from './store';
import MomentUtils from '@date-io/moment';
import App from './containers/App'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export const store = configureStore();

const MainApp = () =>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiPickersUtilsProvider utils={MomentUtils}  >
                <Switch>
                    <Route path="/" component={App} />
                </Switch>
            </MuiPickersUtilsProvider>
        </ConnectedRouter>
    </Provider>;


export default MainApp;