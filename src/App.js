import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Containers/Home/home';
import SignUp from './Containers/Signup/signup';
import Login from './Containers/Login/login';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Switch>
       <Route exact path='/' component={Home} />
       <Route exact path='/signup' component={SignUp} />
       <Route exact path='/login' component={Login} />
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
