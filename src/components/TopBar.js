import React, { Component } from "react";
import logo from "../assets/images/logo.svg";
import { Icon } from "antd";

export class TopBar extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-title">Around</div>
        {this.props.isLoggedIn ? (
          <a className="logout" onClick={this.props.handleLogout}>
            <Icon type="logout" />
            Log out
          </a>
        ) : null}
      </header>
    );
  }
}
