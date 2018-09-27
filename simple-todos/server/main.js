// ----------------------------------------------------------------------------
// Original Creator: Meteor
// File Developer: Peter Pak
// Description: Script for server startup
// ----------------------------------------------------------------------------

// Package Imports ------------------------------------------------------------
import { Meteor } from 'meteor/meteor';
// ----------------------------------------------------------------------------

// API Imports ----------------------------------------------------------------
import '../imports/api/tasks.js'; // imports tasks collection to the server
// ----------------------------------------------------------------------------

Meteor.startup(() => {
  // code to run on server at startup
});
