import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Containers/Home/home';
import SignUp from './Containers/Signup/signup';
import Login from './Containers/Login/login';
import Main from './Containers/Main/main';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Switch>
       <Route exact path='/' component={Home} />
       <Route exact path='/signup' component={SignUp} />
       <Route exact path='/login' component={Login} />
       <Route exact path='/hustle' component={Main} />
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
