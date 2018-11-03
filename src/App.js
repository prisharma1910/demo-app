import React from 'react';
import { withRouter } from 'react-router-dom';
import RoutingContainer from './RoutingContainer';
import "./App.css";

class App extends React.Component{

  goToHome = () => {
    this.props.history.push('/');
  }

  render(){
    return (
      <div>
        <h1 onClick={this.goToHome} className="app-h1">Demo App</h1>
        <RoutingContainer /> 
      </div>
    );
  }
}

export default withRouter(App);