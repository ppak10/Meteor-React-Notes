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
  // Method called by onSubmit by form
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    // Database call to insert task text
    Meteor.call('tasks.insert', text); // Uses correct database schema

    // Clear form text input
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  // Hide Completed Method ----------------------------------------------------
  // State filter to hide completed tasks
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted, // sets state to to toggle filter
    });
  }

  // Render Tasks Method ------------------------------------------------------
  // Renders Todo Tasks with their attributes
  renderTasks() {
    let filteredTasks = this.props.tasks;

    // Task filter for completion
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

          <AccountsUIWrapper /> { /* AccountsUI React wrapper component */ }

          { /* Forms Component */ }
          { /* Conditional to render only if there is a logged in user */ }
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
// ----------------------------------------------------------------------------

// App Export -----------------------------------------------------------------
// Fetches collection data with component wrapped with withTracker and supplies
// them the underlying App component as a prop
export default withTracker(() => {  // Wraps container with higher order component
  Meteor.subscribe('tasks'); // Subscribes to the tasks publication from tasks.js

  return {

    // Calls database to find Tasks sorted by newest at the top
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),

    // Calls database to count uncompleted tasks
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),

    // Calls Meteor to determine current user
    currentUser: Meteor.user(),
  };
})(App);
// ----------------------------------------------------------------------------
