import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";

export class Main extends Component {
  getLogin = () => {
    return this.props.isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Login handleSuccessfulLogin={this.props.handleSuccessfulLogin} />
    );
  };

  getHome = () => {
    return this.props.isLoggedIn ? <Home /> : <Redirect to="/login" />;
  };

  render() {
    return (
      <div className="main">
        <Switch>
          <Route exact path="/" component={this.getLogin} />
          <Route path="/login" component={this.getLogin} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={this.getHome} />
          <Route component={Login} />
        </Switch>
      </div>
    );
  }
}
