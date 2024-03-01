import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Error from './components/Error';
import Picklist from './components/Picklist/Picklist';
import PicklistDetail from './components/Picklist/PicklistDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/error" component={Error} />
        <Route path="/picklist" component={Picklist} />
        <Route path="/picklistdetail" component={PicklistDetail} />
      </Switch>
    </Router>
  );
}

export default App;
