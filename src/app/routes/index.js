import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard";
import Astrolger from './astrologer'
import Astroshops from './astroshop'
import TOD from './tod';
import Orders from './order'
import ServiceRequests from './serviceRequests'
import Promotions from './promotions'
import Consumers from './consumers'
import Financials from './financials'
import Ticketing from './ticketingSystems'
import Referrals from './referrals'
import CallRequests from './callRequests'
import { withRouter } from "react-router";
import Blogs from './blog'

const Routes = ({ match }) => {

    console.log('main routes')
    return <Switch>
        <Route path={`${match.url}/dashboard`} component={Dashboard} />
        <Route path={`${match.url}/astrologer`} component={Astrolger} />
        <Route path={`${match.url}/astroshops`} component={Astroshops} />
        <Route path={`${match.url}/tod`} component={TOD} />
        <Route path={`${match.url}/orders`} component={Orders} />
        <Route path={`${match.url}/serviceRequests`} component={ServiceRequests} />
        <Route path={`${match.url}/broadcasts`} component={Promotions} />
        <Route path={`${match.url}/consumers`} component={Consumers} />
        <Route path={`${match.url}/financials`} component={Financials} />
        <Route path={`${match.url}/ticketing-systems`} component={Ticketing} />
        <Route path={`${match.url}/referrals`} component={Referrals} />
        <Route path={`${match.url}/call_requests`} component={CallRequests} />
        <Route path={`${match.url}/blogs`} component={Blogs} />
    </Switch>
}


export default withRouter(Routes);
