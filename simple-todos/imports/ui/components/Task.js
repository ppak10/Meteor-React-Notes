// ----------------------------------------------------------------------------
// Original Creator: Meteor
// File Developer: Peter Pak
// Description: Script for React Task component
// ----------------------------------------------------------------------------

// Package Imports ------------------------------------------------------------
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
// ----------------------------------------------------------------------------

// Component Imports ----------------------------------------------------------
import { Tasks } from '../../api/tasks.js';
// ----------------------------------------------------------------------------

// Task Component -------------------------------------------------------------
// Represents a single todo item
export default class Task extends Component {

  // Checked Method -----------------------------------------------------------
  // Sets checkmark to indicate that task is finished with strikethrough
  toggleChecked() {

    // Set the checked property to the opposite of its current value
    Meteor.call(  // Performs a database call
      'tasks.setChecked', // calls the tasks.setChecked method to edit database
      this.props.task._id,  // sends current task id prop
      !this.props.task.checked  // sends opposite of current task checked
    );
  }

  // Delete Task Method -------------------------------------------------------
  // Calls database to remove task
  deleteThisTask() {
    Meteor.call(
      'tasks.remove',
      this.props.task._id
    );
  }

  // Private Task Method ------------------------------------------------------
  togglePrivate() {
    Meteor.call(
      'tasks.setPrivate',
      this.props.task._id,
      ! this.props.task.private
    );
  }

  // Render Method ------------------------------------------------------------
  // Renders Task component
  render() {

    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { /* Conditional to show private or public option button */ }
        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={
            this.togglePrivate.bind(this)
          }>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        { /* Task Text */ }
        <span className="text">
          { /* Render username before task text */ }
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
}
// ----------------------------------------------------------------------------
