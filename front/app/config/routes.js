import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';

import UsersContainers from '../components/users/UsersContainers';
import HorsesContainers from '../components/horses/HorsesContainers';
import RidersContainers from '../components/riders/RidersContainers';
import CalendarContainer from '../components/calendar/CalendarContainer';

import { IndexRoute, Router, Route, browserHistory } from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route name="app" path="/" component={Main}>

    	<IndexRoute name="home" component={Home}/>

      <Route name='users' path='/users' component={UsersContainers} />
      <Route name='horses' path='/horses' component={HorsesContainers}/>
      <Route name='riders' path='/riders' components={RidersContainers}/>
      <Route name='calendar' path='/calendar' component={CalendarContainer}/>
    </Route>
  </Router>
);
