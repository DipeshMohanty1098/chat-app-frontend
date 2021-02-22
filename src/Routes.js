import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Name from './components.js/inputName'
import MessagePage from './components.js/messages';
import Dashboard from './components.js/dashboard'

//<Route exact path="/" component={Name}/>
const Routes = () => {
    return (
        <div>
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Name}/>
        <Route path="/chat/chatRoom=:chatRoomName" component={Dashboard}/>
        </Switch>
        </BrowserRouter>
        </div>
    )
}

export default Routes;
