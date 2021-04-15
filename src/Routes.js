import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Name from './components.js/inputName'
import MessagePage from './components.js/messages';
import Dashboard from './components.js/dashboard';
import EmptyRoute from './components.js/emptyRoute';

//<Route exact path="/" component={Name}/>
const Routes = () => {
    return (
        <div>
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Name}/>
        <Route path="/chat/chatRoom=:chatRoomName" component={Dashboard}/>
        <Route path='/404' component={EmptyRoute} />
        <Redirect from='*' to='/404' />
        </Switch>
        </BrowserRouter>
        </div>
    )
}

export default Routes;
