// ----------------------------------------------------------------------------
// Original Creator: Meteor
// File Developer: Peter Pak
// Description: Script for exporting tasks collection
// ----------------------------------------------------------------------------

// Summary --------------------------------------------------------------------
// Meteor stores persistant data through "Collections" that can be accessed
// through both server and client. This makes it easy writing view logic easier
// and also update the component automatically.
// ----------------------------------------------------------------------------

// Package Imports ------------------------------------------------------------
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
// ----------------------------------------------------------------------------

// Component Exports ----------------------------------------------------------
// Creates a new MongoDB collection on the server called tasks
// This also creates a client-side cache connect to the server collection
export const Tasks = new Mongo.Collection('tasks');
// ----------------------------------------------------------------------------

// Security Check -------------------------------------------------------------
// This code only runs on the server
if (Meteor.isServer) {

  // Only publishes specific tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
// ----------------------------------------------------------------------------

// Meteor Methods -------------------------------------------------------------
Meteor.methods({

  // Insert Task --------------------------------------------------------------
  // Method calls database to insert task into database
  'tasks.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),  // Current time
      owner: this.userId, // id of logged in user
      username: Meteor.users.findOne(this.userId).username, // username of user
    });
  },

  // Remove Task --------------------------------------------------------------
  // Method calls database to remove task from database
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);

    // If the task is private, make sure only the owner can delete it
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },

  // Toggle Task Checkmark ----------------------------------------------------
  // Method calls database to toggle checkmark on task
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);

    // If the task is private, make sure only the owner can check it off
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },

  // Set Task Private ---------------------------------------------------------
  // Method calls database to set task to private
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },

});
// ----------------------------------------------------------------------------
