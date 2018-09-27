// ----------------------------------------------------------------------------
// Original Creator: Meteor
// File Developer: Peter Pak
// Description: Script for React Accounts UI wrapper component
// ----------------------------------------------------------------------------

// Summary --------------------------------------------------------------------
// Meteor's drop-in login user interface for multi-user functionality in app
// that still relies on Blaze. Therefore, the blaze component will have to be
// wrapped with a React component.
// ----------------------------------------------------------------------------

// Package Imports ------------------------------------------------------------
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
// ----------------------------------------------------------------------------

// Accounts UI Component ------------------------------------------------------
// Wraps the Accounts UI blaze component with React
export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)
    );
  }

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}
