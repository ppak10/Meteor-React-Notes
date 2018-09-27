// ----------------------------------------------------------------------------
// Original Creator: Meteor
// File Developer: Peter Pak
// Description: Script for main React App component
// ----------------------------------------------------------------------------

// Package Imports ------------------------------------------------------------
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// ----------------------------------------------------------------------------

// Component Imports ----------------------------------------------------------
import Task from './components/Task.js';
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
// ----------------------------------------------------------------------------

// Api Imports ----------------------------------------------------------------
import { Tasks } from '../api/tasks.js';
// ----------------------------------------------------------------------------

// React App ------------------------------------------------------------------
// Represents the whole app
class App extends Component {

  // Constructor --------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  // Handle Submit Method -----------------------------------------------------
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  // Hide Completed Method ----------------------------------------------------
  // State filter to hide completed tasks
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  // Render Tasks Method ------------------------------------------------------
  // Renders Todo Tasks with their attributes
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  // Render Method ------------------------------------------------------------
  // Renders React components
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper /> { /* User AccountsUI Component */ }

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }

        </header>

        { /* Todo Tasks */ }
        <ul>
          {this.renderTasks()} { /* Calls render Tasks Method */ }
        </ul>

      </div>
    );
  }
}

// App Export -----------------------------------------------------------------
export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
