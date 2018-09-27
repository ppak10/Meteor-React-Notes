// ----------------------------------------------------------------------------
// Original Creator: Meteor
// File Developer: Peter Pak
// Description: Script for Accounts UI configuration
// ----------------------------------------------------------------------------

// Package Imports ------------------------------------------------------------
import { Accounts } from 'meteor/accounts-base';
// ----------------------------------------------------------------------------

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY', // Changes username inputs to usernames
});
