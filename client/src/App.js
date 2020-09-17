import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import store from './store'
import axios from 'axios'
import {Provider} from 'react-redux'
import { SET_CURRENT_USER, GET_ERROR } from './actions/types';
import Dashboard from './components/Dashboard';
if(localStorage.getItem('jwtToken')){
  const config = {
    headers:{
      'auth-token': localStorage.getItem('jwtToken')
    }
  }
  axios.get('/auth/info',config)
  .then(res=>store.dispatch({
    type:SET_CURRENT_USER,
    payload:res.data.user
  }))
  .catch(err=>store.dispatch({
    type:GET_ERROR,
    payload:err.response.data
  }))
}
class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container-fluid">
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/login" exact component={()=><Login ></Login>}></Route>
              <Route path="/dashboard" exact component={Dashboard}></Route>
            </Switch>
          </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
