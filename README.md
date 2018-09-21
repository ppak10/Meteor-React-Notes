# Meteor-Todo-App-Notes
###### Notes on [Meteor's tutorial](https://www.meteor.com/tutorials/react/creating-an-app) on creating a todo app that integrates both React and Meteor

## Contents
1. [Creating an app](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/README.md#1-creating-an-app)
2. [Components](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/README.md#2-components)
3. [Collections](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/4-forms-and-events/README.md#3-collections)
4. [Forms and events](https://github.com/ppak10/Meteor-Todo-App-Notes/tree/4-forms-and-events#4-forms-and-events)
5. [Update and remove](https://github.com/ppak10/Meteor-Todo-App-Notes/tree/5-update-and-remove#5-update-and-remove)
6. [Running on mobile](https://github.com/ppak10/Meteor-Todo-App-Notes/tree/6-running-on-mobile#6-running-on-mobile)
7. [Temporary UI state](https://github.com/ppak10/Meteor-Todo-App-Notes/tree/7-temporary-ui-state#7-temporary-ui-state)
8. [Adding user accounts](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/README.md#8-adding-user-account)
9. [Security with methods](https://github.com/ppak10/Meteor-Todo-App-Notes/tree/9-security-with-methods#9-security-with-methods)
10. [Publish and subscribe](https://github.com/ppak10/Meteor-Todo-App-Notes/tree/10-publish-and-subscribe#10-publish-and-subscribe)
11. Testing
12. Next steps

## 1. Creating an app
### [Creating your first app](https://www.meteor.com/tutorials/react/creating-an-app)
In this tutorial, we are going to create a simple app to manage a 'to do' list and collaborate with others on those tasks. By the end, you should have a basic understanding of Meteor and its project structure.
To create the app, open your terminal and type:
```
meteor create simple-todos
```
This will create a new folder called ```simple-todos``` with all of the files that a Meteor app needs:
```
client/main.js      # a JavaScript entry point loaded on the client
client/main.html    # an HTML file that defines view templates
client/main.css     # a CSS file to define your app's styles
server/main.js      # a JavaScript entry point loaded on the server
package.json        # a control file for installing NPM packages
package-lock.json   # Describes the NPM dependency tree
.meteor             # internal Meteor Files
.gitignore          # a control file for git
```
To run the newly created app:
```
cd simple-todos
meteor
```
Open your web browser and go to ```http://localhost:3000``` to see the app running.
You can play around with this default app for a bit before we continue. For example, try editing the text in ```<h1>``` inside ```client/main.html``` using your favorite text editor. When you save the file, the page in your browser will automatically update with the new content. We call this "hot code push".
>#### Newer JavaScript syntax
>Meteor supports many newer JavaScript features, such as those in ECMAScript 2015 (ES6). If you haven't tried these next-generation JavaScript features yet, we recommend taking a look at [Luke Hoban's "ES6 features"](https://github.com/lukehoban/es6features#readme) to familiarize yourself with the newer syntax.
Now that you have some experience editing the files in your Meteor app, let's start working on a simple todo list application. If you find a bug or error in the tutorial, please file an issue or submit a pull request [on GitHub](https://github.com/meteor/tutorials).

## 2. Components
### [Defining views with React components](https://www.meteor.com/tutorials/react/creating-an-app)
To start working with React as our view library, let's add some NPM packages which will allow us to get started with React.
Open a new terminal in the same directory as your running app, and type:
```
meteor npm install --save react react-dom
```
>Note: ```meteor npm``` supports the same features as ```npm```, though the difference can be important. Consult the ```meteor npm``` [documentation](https://docs.meteor.com/commandline.html#meteornpm) for more information.
#### Replace the starter code
To get started, let's replace the code of the default starter app. Then we'll talk about what it does.
First, replace the content of the initial HTML file:
##### Replace starter HTML code [```client/main.html```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/simple-todos/client/main.html)
```html
<head>
  <title>Todo List</title>
</head>

<body>
  <div id="render-target"></div>
</body>
```
Second, replace the contents of ```client/main.js``` with:
##### Replace starter JS [```client/main.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/simple-todos/client/main.js)
```javascript
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
```
Now we need to create a new directory called ```imports```, a specially-named directory which will behave differently than other directories in the project. Files outside the ```imports``` directory will be loaded automatically when the Meteor server starts, while files inside the ```imports``` directory will only load when an ```import``` statement is used to load them.
After creating the ```imports``` directory, we will create two new files inside it:
##### Create App component [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/simple-todos/imports/ui/App.js)
```javascript
import React, { Component } from 'react';

import Task from './Task.js';

// App component - represents the whole app
export default class App extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }

  renderTasks() {
    return this.getTasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}
```
##### Create Task component [```imports/ui/Task.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/simple-todos/imports/ui/Task.js)
```javascript
import React, { Component } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
  render() {
    return (
      <li>{this.props.task.text}</li>
    );
  }
}
```
We just added three things to our app:
1. An ```App``` React component
2. A ```Task``` React component
3. Some initialization code (in our ```client/main.js``` client JavaScript entrypoint), in a ```Meteor.startup``` block, which knows how to call code when the page is loaded and ready. This code loads the other components and renders them into the ```#rendertarget``` html element.
You can read more about how imports work and how to structure your code in the [Application Structure article](https://guide.meteor.com/structure.html) of the Meteor Guide.
Later in the tutorial, we will refer to these components when adding or changing code.
#### Check the result
In our browser, the app should roughly look like the following
(though much less pretty):
>##### Todo List
>* This is task 1
>* This is task 2
>* This is task 3

If your app doesn't look like this, use the GitHub link at the top right corner of each code snippet to see the entire file, and make sure your code matches the example.
> Note: If encountering a console error which states ```Target container is not a DOM element```, type the following into the command line within the project folder:
>```
>meteor remove blaze-html-templates
>```
>```
>meteor add static-html
>```
> Credit: [phtn](https://github.com/meteor/meteor/issues/5580#issuecomment-231173103)
#### HTML files define static content
Meteor parses all of the HTML files in your app folder and identifies three top-level tags: <head>, <body>, and <template>.
Everything inside any <head> tags is added to the ```head``` section of the HTML sent to the client, and everything inside <body> tags is added to the ```body``` section, just like in a regular HTML file.
Everything inside <template> tags is compiled into Meteor templates, which can be included inside HTML with ```{{> templateName}}``` or referenced in your JavaScript with ```Template.templateName```. In this tutorial, we won't be using this feature of Meteor because we will be defining all of our view components with React.
#### Define view components with React
In React, view components are subclasses of ```React.Component``` (which we import with ```import { Component } from 'react';```). Your component can have any methods you like, but there are several methods such as ```render``` that have special functions. Components can also receive data from their parents through attributes called ```props```. We'll go over some of the more common features of React in this tutorial; you can also check out [Facebook's React tutorial](https://reactjs.org/tutorial/tutorial.html).
#### Return markup from the render method with JSX
The most important method in every React component is ```render()```, which is called by React to get a description of the HTML that this component should display. The HTML content is written using a JavaScript extension called JSX, which kind of looks like writing HTML inside your JavaScript. You can see some obvious differences already: in JSX, you use the ```className``` attribute instead of ```class```. An important thing to know about JSX is that it isn't a templating language like Spacebars or Angular - it actually compiles directly to regular JavaScript. Read more about JSX [in the React docs](https://reactjs.org/docs/jsx-in-depth.html).
JSX is supported by the ```ecmascript``` Atmosphere package, which is included in all new Meteor apps by default.
##### Add CSS [```client/main.css```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/simple-todos/client/main.css)
```css
/* CSS declarations go here */
body {
  font-family: sans-serif;
  background-color: #315481;
  background-image: linear-gradient(to bottom, #315481, #918e82 100%);
  background-attachment: fixed;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 0;
  margin: 0;

  font-size: 14px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
  background: white;
}

header {
  background: #d2edf4;
  background-image: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
  padding: 20px 15px 15px 15px;
  position: relative;
}

#login-buttons {
  display: block;
}

h1 {
  font-size: 1.5em;
  margin: 0;
  margin-bottom: 10px;
  display: inline-block;
  margin-right: 1em;
}

form {
  margin-top: 10px;
  margin-bottom: -10px;
  position: relative;
}

.new-task input {
  box-sizing: border-box;
  padding: 10px 0;
  background: transparent;
  border: none;
  width: 100%;
  padding-right: 80px;
  font-size: 1em;
}

.new-task input:focus{
  outline: 0;
}

ul {
  margin: 0;
  padding: 0;
  background: white;
}

.delete {
  float: right;
  font-weight: bold;
  background: none;
  font-size: 1em;
  border: none;
  position: relative;
}

li {
  position: relative;
  list-style: none;
  padding: 15px;
  border-bottom: #eee solid 1px;
}

li .text {
  margin-left: 10px;
}

li.checked {
  color: #888;
}

li.checked .text {
  text-decoration: line-through;
}

li.private {
  background: #eee;
  border-color: #ddd;
}

header .hide-completed {
  float: right;
}

.toggle-private {
  margin-left: 5px;
}

@media (max-width: 600px) {
  li {
    padding: 12px 15px;
  }

  .search {
    width: 150px;
    clear: both;
  }

  .new-task input {
    padding-bottom: 5px;
  }
}
```
Now that you've added the CSS, the app should look a lot nicer. Check in your browser to see that the new styles have loaded.

## 3. Collections
### [Storing tasks in a collection](https://www.meteor.com/tutorials/react/collections)
Collections are Meteor's way of storing persistent data. The special thing about collections in Meteor is that they can be accessed from both the server and the client, making it easy to write view logic without having to write a lot of server code. They also update themselves automatically, so a view component backed by a collection will automatically display the most up-to-date data.
You can read more about collections in the [Collections article](https://guide.meteor.com/collections.html) of the Meteor Guide.
Creating a new collection is as easy as calling ```MyCollection = new Mongo.Collection("my-collection");``` in your JavaScript. On the server, this sets up a MongoDB collection called ```my-collection```; on the client, this creates a cache connected to the server collection. We'll learn more about the client/server divide in step 12, but for now we can write our code with the assumption that the entire database is present on the client.
To create the collection, we define a new ```tasks``` module that creates a Mongo collection and exports it:
##### Create tasks collection [```imports/api/tasks.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/3-collections/simple-todos/imports/api/tasks.js)
```javascript
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');
```
Notice that we place this file in a new ```imports/api``` directory. This is a sensible place to store API-related files for the application. We will start by putting "collections" here and later we will add "publications" that read from them and "methods" that write to them. You can read more about how to structure your code in the [Application Structure article](https://guide.meteor.com/structure.html) of the Meteor Guide.
We need to import that module on the server (this creates the MongoDB collection and sets up the plumbing to get the data to the client):
##### Load tasks collection on the server [```server/main.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/3-collections/simple-todos/server/main.js)
```javascript
import '../imports/api/tasks.js';
```
#### Using data from a collection inside a React component
To use data from a Meteor collection inside a React component, we can use an Atmosphere package react-meteor-data which allows us to create a "data container" to feed Meteor's reactive data into React's component hierarchy.
```
meteor add react-meteor-data
```
To use ```react-meteor-data```, we need to wrap our component in a container using the ```withTracker``` Higher Order Component:
##### Modify App component to get tasks from collection [```imports/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/3-collections/simple-todos/imports/ui/App.js)
```javascript
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
...some lines skipped...
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
})(App);
```
The wrapped ```App``` component fetches tasks from the ```Tasks``` collection and supplies them to the underlying ```App``` component it wraps as the ```tasks``` prop. It does this in a reactive way, so that when the contents of the database change, the ```App``` re-renders, as we'll soon see!
When you make these changes to the code, you'll notice that the tasks that used to be in the todo list have disappeared. That's because our database is currently empty — we need to insert some tasks!
#### Inserting tasks from the server-side database console
Items inside collections are called documents. Let's use the server database console to insert some documents into our collection. In a new terminal tab, go to your app directory and type:
```
meteor mongo
```
This opens a console into your app's local development database. Into the prompt, type:
```
db.tasks.insert({ text: "Hello world!", createdAt: new Date() });
```
In your web browser, you will see the UI of your app immediately update to show the new task. You can see that we didn't have to write any code to connect the server-side database to our front-end code — it just happened automatically.
Insert a few more tasks from the database console with different text. In the next step, we'll see how to add functionality to our app's UI so that we can add tasks without using the database console.

## 4. Forms and events
### [Adding tasks with a form](https://www.meteor.com/tutorials/react/forms-and-events)
In this step, we'll add an input field for users to add tasks to the list.
First, let's add a form to our ```App``` component:
##### Add form for new tasks [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/4-forms-and-events/simple-todos/imports/ui/App.js)
```javascript
<div className="container">
  <header>
    <h1>Todo List</h1>

    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
      <input
        type="text"
        ref="textInput"
        placeholder="Type to add new tasks"
      />
    </form>
  </header>

  <ul>
```
>Tip: You can add comments to your JSX code by wrapping them in ```{/* ... */}```
You can see that the ```form``` element has an ```onSubmit``` attribute that references a method on the component called ```handleSubmit```. In React, this is how you listen to browser events, like the submit event on the form. The ```input``` element has a ```ref``` property which will let us easily access this element later.
Let's add a ```handleSubmit``` method to our ```App``` component:
##### Add handleSubmit method to App component [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/4-forms-and-events/simple-todos/imports/ui/App.js)
```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
...some lines skipped...

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
```
Now your app has a new input field. To add a task, just type into the input field and hit enter. If you open a new browser window and open the app again, you'll see that the list is automatically synchronized between all clients.
#### Listening for events in React
As you can see, in React you handle DOM events by directly referencing a method on the component. Inside the event handler, you can reference elements from the component by giving them a ```ref``` property and using ```ReactDOM.findDOMNode```. Read more about the different kinds of events React supports, and how the event system works, in the [React docs](https://reactjs.org/docs/events.html).
#### Inserting into a collection
Inside the event handler, we are adding a task to the ```tasks``` collection by calling ```Tasks.insert()```. We can assign any properties to the task object, such as the time created, since we don't ever have to define a schema for the collection.
Being able to insert anything into the database from the client isn't very secure, but it's okay for now. In step 10 we'll learn how we can make our app secure and restrict how data is inserted into the database.
#### Sorting our tasks
Currently, our code displays all new tasks at the bottom of the list. That's not very good for a task list, because we want to see the newest tasks first.
We can solve this by sorting the results using the ```createdAt``` field that is automatically added by our new code. Just add a sort option to the ```find``` call inside the data container wrapping the ```App``` component:
##### Update data container to sort tasks by time [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/4-forms-and-events/simple-todos/imports/ui/App.js)
```javascript
export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
```
Let's go back to the browser and make sure this worked: any new tasks that you add should appear at the top of the list, rather than at the bottom.
In the next step, we'll add some very important todo list features: checking off and deleting tasks.

## 5. Update and remove
### [Checking off and deleting tasks](https://www.meteor.com/tutorials/react/update-and-remove)
Until now, we have only interacted with a collection by inserting documents. Now, we will learn how to update and remove them.
Let's add two new elements to our ```task``` component, a checkbox and a delete button, with event handlers for both:
##### Update Task component to add features [```imports/ui/Task.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/5-update-and-remove/simple-todos/imports/ui/Task.js)
```javascript
import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

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

        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}
```
#### Update
In the code above, we call ```Tasks.update``` to check off a task.
The ```update``` function on a collection takes two arguments. The first is a selector that identifies a subset of the collection, and the second is an update parameter that specifies what should be done to the matched objects.
In this case, the selector is just the ```_id``` of the relevant task. The update parameter uses ```$set``` to toggle the ```checked``` field, which will represent whether the task has been completed.
#### Remove
The code from above uses ```Tasks.remove``` to delete a task. The ```remove``` function takes one argument, a selector that determines which item to remove from the collection.

## 6. Running on mobile
### [Running your app on Andriod or iOS](https://www.meteor.com/tutorials/react/running-on-mobile)
>Currently, Meteor on Windows does not support mobile builds. If you are using Meteor on Windows, you should skip this step.
So far, we've been building our app and testing only in a web browser, but Meteor has been designed to work across different platforms - your simple todo list website can become an iOS or Android app in just a few commands.
Meteor makes it easy to set up all of the tools required to build mobile apps, but downloading all of the programs can take a while - for Android the download is about 300MB and for iOS you need to install Xcode which is about 2GB. If you don't want to wait to download these tools, feel free to skip to the next step.
#### Running on an iOS simulator (Mac Only)
If you have a Mac, you can run your app inside the iOS simulator.
>Make sure to download prerequisites [here](http://guide.meteor.com/mobile.html#installing-prerequisites)
Go to your app folder and type:
```
meteor install-sdk ios
```
This will run you through the setup necessary to build an iOS app from your project. When you're done, type:
```
meteor add-platform ios
meteor run ios
```
You will see the iOS simulator pop up with your app running inside.
#### Running on an Android emulator
In the terminal, go to your app folder and type:
```
meteor install-sdk android
```
This will help you install all of the necessary tools to build an Android app from your project. When you are done installing everything, type:
```
meteor add-platform android
```
After you agree to the license terms, type:
```
meteor run android
```
After some initialization, you will see an Android emulator pop up, running your app inside a native Android wrapper. The emulator can be somewhat slow, so if you want to see what it's really like using your app, you should run it on an actual device.
#### Running on an Android device
First, complete all of the steps above to set up the Android tools on your system. Then, make sure you have [USB Debugging enabled on your phone](https://developer.android.com/studio/run/device#developer-device-options) and the phone is plugged into your computer with a USB cable. Also, you must quit the Android emulator before running on a device.
Then, run the following command:
```
meteor run android-device
```
The app will be built and installed on your device.
#### Running on an iPhone or iPad (Mac Only; requires Apple developer account)
If you have an Apple developer account, you can also run your app on an iOS device. Run the following command:
```
meteor run ios-device
```
This will open Xcode with a project for your iOS app. You can use Xcode to then launch the app on any device or simulator that Xcode supports.
Now that we have seen how easy it is to run our app on mobile, let's get to adding some more features.

## 7. Temporary UI state
### [Storing temporary UI data in component state](https://www.meteor.com/tutorials/react/temporary-ui-state)
In this step, we'll add a client-side data filtering feature to our app, so that users can check a box to only see incomplete tasks. We're going to learn how to use React's component state to store temporary information that is only used on the client.
First, we need to add a checkbox to our ```App``` component:
##### Add hide completed checkbox to App component ```imports/ui/App.js```
```javascript
<header>
  <h1>Todo List</h1>

  <label className="hide-completed">
    <input
      type="checkbox"
      readOnly
      checked={this.state.hideCompleted}
      onClick={this.toggleHideCompleted.bind(this)}
    />
    Hide Completed Tasks
  </label>

  <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
    <input
      type="text"
```
You can see that it reads from ```this.state.hideCompleted```. React components have a special field called ```state``` where you can store encapsulated component data. We'll need to initialize the value of ```this.state.hideCompleted``` in the component's constructor:
##### Add initial state to App component ```imports/ui/App.js```
```javascript
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
```
We can update ```this.state``` from an event handler by calling ```this.setState```, which will update the state property asynchronously and then cause the component to re-render:
##### Add toggleHideCompleted handler to App ```imports/ui/App.js```
```javascript
ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

toggleHideCompleted() {
this.setState({
  hideCompleted: !this.state.hideCompleted,
});
}

renderTasks() {
return this.props.tasks.map((task) => (
  <Task key={task._id} task={task} />
```
Now, we need to update our ```renderTasks``` function to filter out completed tasks when ```this.state.hideCompleted``` is true:
##### Filter tasks in renderTasks ```imports/ui/App.js```
```javascript
}

renderTasks() {
  let filteredTasks = this.props.tasks;
  if (this.state.hideCompleted) {
    filteredTasks = filteredTasks.filter(task => !task.checked);
  }
  return filteredTasks.map((task) => (
    <Task key={task._id} task={task} />
  ));
}
```
Now if you check the box, the task list will only show tasks that haven't been completed.
#### One more feature: Showing a count of incomplete tasks
Now that we have written a query that filters out completed tasks, we can use the same query to display a count of the tasks that haven't been checked off. To do this we need to fetch a count in our data container and add a line to our ```render``` method. Since we already have the data in the client-side collection, adding this extra count doesn't involve asking the server for anything.
##### Update data container to return incompleteCount ```imports/ui/App.js```
```javascript
export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
})(App);
```
##### Display incompleteCount in the header ```imports/ui/App.js```
```javascript
return (
  <div className="container">
    <header>
      <h1>Todo List ({this.props.incompleteCount})</h1>

      <label className="hide-completed">
        <input
```

## 8. Adding user account
### [Adding user accounts](https://www.meteor.com/tutorials/react/adding-user-accounts)
Meteor comes with an accounts system and a drop-in login user interface that lets you add multi-user functionality to your app in minutes.
>Currently, this UI component uses Blaze, Meteor's default UI engine. In the future, there might also be a React-specific component for this.
To enable the accounts system and UI, we need to add the relevant packages. In your app directory, run the following command:
```
meteor add accounts-ui accounts-password
```
#### Wrapping a Blaze component in React
To use the Blaze UI component from the ```accounts-ui``` package, we need to wrap it in a React component. To do so, let's create a new component called ```AccountsUIWrapper``` in a new file:
##### Create Accounts UI wrapper component [```imports/ui/AccountsUIWrapper.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/imports/ui/AccountsUIWrapper.js)
```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
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
```
Let's include the component we just defined inside App:
##### Include sign in form [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/imports/ui/App.js)
```javascript
import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
...some lines skipped...
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
```
Then, add the following code to configure the accounts UI to use usernames instead of email addresses:
##### Configure accounts-ui [```imports/startup/accounts-config.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/imports/startup/accounts-config.js)
```javascript
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
```
We also need to import that configuration code in our client side entrypoint:
##### Import accounts configuration [```client/main.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/client/main.js)
```javascript
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.js';

Meteor.startup(() => {
```
#### Adding user-related functionality
Now users can create accounts and log into your app! This is very nice, but logging in and out isn't very useful yet. Let's add two features:
1. Only display the new task input field to logged in users
2. Show which user created each task
To do this, we will add two new fields to the ```tasks``` collection:
1. ```owner``` - the ```_id``` of the user that created the task.
2. ```username``` - the ```username``` of the user that created the task. We will save the username directly in the task object so that we don't have to look up the user every time we display the task.
First, let's add some code to save these fields into the ```handleSubmit``` event handler:
##### Update insert to save username and owner [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/imports/ui/App.js)
```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
...some lines skipped...
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });

    // Clear form
```
Modify the data container to get information about the currently logged in user:
##### Update data container to return data about user [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/imports/ui/App.js)
```javascript
return {
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user(),
};
})(App);
```
Then, in our render method, add a conditional statement to only show the form when there is a logged in user:
##### Wrap new task form to only show when logged in [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/imports/ui/App.js)
```javascript

         <AccountsUIWrapper />

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

       <ul>
```
Finally, add a statement to display the ```username``` field on each task right before the text:
##### Update Task component to show username [```imports/ui/Task.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/8-adding-user-accounts/simple-todos/imports/ui/Task.js)
```javascript
        onClick={this.toggleChecked.bind(this)}
      />

      <span className="text">
        <strong>{this.props.task.username}</strong>: {this.props.task.text}
      </span>
    </li>
  );
}
```
In your browser, add some tasks and notice that your username shows up. Old tasks that we added before this step won't have usernames attached; you can just delete them.
Now, users can log in and we can track which user each task belongs to. Let's look at some of the concepts we just discovered in more detail.
#### Automatic accounts UI
If our app has the ```accounts-ui``` package, all we have to do to add a login dropdown is render the included UI component. This dropdown detects which login methods have been added to the app and displays the appropriate controls. In our case, the only enabled login method is ```accounts-password```, so the dropdown displays a password field. If you are adventurous, you can add the ```accounts-facebook``` package to enable Facebook login in your app - the Facebook button will automatically appear in the dropdown.
#### Getting information about the logged-in user
In your data container, you can use ```Meteor.user()``` to check if a user is logged in and get information about them. For example, ```Meteor.user().username``` contains the logged in user's username. You can also use ```Meteor.userId()``` to just get the current user's ```_id```.
In the next step, we will learn how to make our app more secure by doing data validation on the server.

## 9. Security with methods
### [Security with methods](https://www.meteor.com/tutorials/react/security-with-methods)
Before this step, any user of the app could edit any part of the database. This might be okay for very small internal apps or demos, but any real application needs to control permissions for its data. In Meteor, the best way to do this is by declaring methods. Instead of the client code directly calling ```insert```, ```update```, and ```remove```, it will instead call methods that will check if the user is authorized to complete the action and then make any changes to the database on the client's behalf.
#### Removing ```insecure```
Every newly created Meteor project has the ```insecure``` package added by default. This is the package that allows us to edit the database from the client. It's useful when prototyping, but now we are taking off the training wheels. To remove this package, go to your app directory and run:
```
meteor remove insecure
```
If you try to use the app after removing this package, you will notice that none of the inputs or buttons work anymore. This is because all client-side database permissions have been revoked. Now we need to rewrite some parts of our app to use methods.
#### Defining methods
First, we need to define some methods. We need one method for each database operation we want to perform on the client. Methods should be defined in code that is executed on the client and the server - we will discuss this a bit later in the section titled Optimistic UI.
##### Add methods for add, remove, update task [```imports/api/tasks.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/9-security-with-methods/simple-todos/imports/api/tasks.js)
```javascript
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});
```
Now that we have defined our methods, we need to update the places we were operating on the collection to use the methods instead:
##### Update App component to use tasks.insert.method [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/9-security-with-methods/simple-todos/imports/ui/App.js)
```javascript
// Find the text field via the React ref
const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

Meteor.call('tasks.insert', text);

// Clear form
ReactDOM.findDOMNode(this.refs.textInput).value = '';
```
##### Replace update and remove with methods [```imports/ui/Task.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/9-security-with-methods/simple-todos/imports/ui/Task.js)
```javascript
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

...some lines skipped...
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  render() {
```
Now all of our inputs and buttons will start working again. What did we gain from all of this work?
1. When we insert tasks into the database, we can now securely verify that the user is logged in, that the ```createdAt``` field is correct, and that the ```owner``` and ```username``` fields are correct and the user isn't impersonating anyone.
2. We can add extra validation logic to ```setChecked``` and ```deleteTask``` in later steps when users can make tasks private.
3. Our client code is now more separated from our database logic. Instead of a lot of stuff happening inside our event handlers, we now have methods that can be called from anywhere.
#### Optimistic UI
So why do we want to define our methods on the client and on the server? We do this to enable a feature we call optimistic UI.
When you call a method on the client using ```Meteor.call```, two things happen in parallel:
1. The client sends a request to the server to run the method in a secure environment, just like an AJAX request would work
2. A simulation of the method runs directly on the client to attempt to predict the outcome of the server call using the available information
What this means is that a newly created task actually appears on the screen before the result comes back from the server.
If the result from the server comes back and is consistent with the simulation on the client, everything remains as is. If the result on the server is different from the result of the simulation on the client, the UI is patched to reflect the actual state of the server.
You can read more about methods and optimistic UI in the [Methods article](http://guide.meteor.com/methods.html) of the Meteor Guide, and our [blog post about optimistic UI](http://info.meteor.com/blog/optimistic-ui-with-meteor-latency-compensation).

## 10. Publish and subscribe
### [Filtering data with publish and subscribe](https://www.meteor.com/tutorials/react/publish-and-subscribe)
Now that we have moved all of our app's sensitive code into methods, we need to learn about the other half of Meteor's security story. Until now, we have worked assuming the entire database is present on the client, meaning if we call ```Tasks.find()``` we will get every task in the collection. That's not good if users of our application want to store privacy-sensitive data. We need a way of controlling which data Meteor sends to the client-side database.
Just like with ```insecure``` in the last step, all new Meteor apps start with the ```autopublish``` package, which automatically synchronizes all of the database contents to the client. Let's remove it and see what happens:
```
meteor remove autopublish
```
When the app refreshes, the task list will be empty. Without the ```autopublish``` package, we will have to specify explicitly what the server sends to the client. The functions in Meteor that do this are ```Meteor.publish``` and ```Meteor.subscribe```.
First lets add a publication for all tasks:
##### Add publication for tasks [```imports/api/tasks.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/api/tasks.js)
```javascript

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
 // This code only runs on the server
 Meteor.publish('tasks', function tasksPublication() {
   return Tasks.find();
 });
}

Meteor.methods({
 'tasks.insert'(text) {
   check(text, String);
```
And then let's subscribe to that publication when the ```App``` component is created:
##### Subscribe to tasks in App container [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/ui/App.js)
```javascript
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
```
Once you have added this code, all of the tasks will reappear.
Calling ```Meteor.publish``` on the server registers a publication named ```"tasks"```. When ```Meteor.subscribe``` is called on the client with the publication name, the client subscribes to all the data from that publication, which in this case is all of the tasks in the database. To truly see the power of the publish/subscribe model, let's implement a feature that allows users to mark tasks as "private" so that no other users can see them.
#### Adding a button to make tasks private
Let's add another property to tasks called "private" and a button for users to mark a task as private. This button should only show up for the owner of a task. We want the label to indicate the current status: public or private.
First, we need to add a new method that we can call to set a task's private status:
##### Add tasks.setPrivate method [```imports/api/tasks.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/api/tasks.js)
```javascript

   Tasks.update(taskId, { $set: { checked: setChecked } });
 },
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
```
Now, we need to pass a new property to the ```Task``` to decide whether we want to show the private button; the button should show up only if the currently logged in user owns this task:
##### Update renderTasks to pass in showPrivateButton [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/ui/App.js)
```javascript
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

render() {
```
Let's add the button, using this new prop to decide whether it should be displayed:
##### Add private button, shown only to owner [```imports/ui/Task.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/ui/Task.js)
```javascript
onClick={this.toggleChecked.bind(this)}
/>

{ this.props.showPrivateButton ? (
<button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
  { this.props.task.private ? 'Private' : 'Public' }
</button>
) : ''}

<span className="text">
  <strong>{this.props.task.username}</strong>: {this.props.task.text}
</span>
```
We need to define the event handler called by the button:
##### Add private button event handler to Task [```imports/ui/Task.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/ui/Task.js)
```javascript
  Meteor.call('tasks.remove', this.props.task._id);
}

togglePrivate() {
  Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
}

render() {
// Give tasks a different className when they are checked off,
// so that we can style them nicely in CSS
```
One last thing, let's update the class of the ```<li>``` element in the ```Task``` component to reflect it's privacy status. We'll use the ```classnames``` NPM Package for this:
```
meteor npm install --save classnames
```
Then we'll use that package to choose a class based on the task are rendering:
##### Add private className to Task when needed [```imports/ui/Task.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/ui/Task.js)
```javascript
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Tasks } from '../api/tasks.js';

...some lines skipped...
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    return (
      <li className={taskClassName}>
```
#### Selectively publishing tasks based on privacy status
Now that we have a way of setting which tasks are private, we should modify our publication function to only send the tasks that a user is authorized to see:
##### Only publish tasks the current user can see [```imports/api/tasks.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/api/tasks.js)
```javascript
if (Meteor.isServer) {
 // This code only runs on the server
 // Only publish tasks that are public or belong to the current user
 Meteor.publish('tasks', function tasksPublication() {
   return Tasks.find({
     $or: [
       { private: { $ne: true } },
       { owner: this.userId },
     ],
   });
 });
}
```
To test that this functionality works, you can use your browser's private browsing mode to log in as a different user. Put the two windows side by side and mark a task private to confirm that the other user can't see it. Now make it public again and it will reappear!
#### Extra method security
In order to finish up our private task feature, we need to add checks to our ```deleteTask``` and ```setChecked``` methods to make sure only the task owner can delete or check off a private task:
##### Add extra security to methods [```imports/api/tasks.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/10-publish-and-subscribe/simple-todos/imports/api/tasks.js)
```javascript
'tasks.remove'(taskId) {
  check(taskId, String);

  const task = Tasks.findOne(taskId);
  if (task.private && task.owner !== this.userId) {
    // If the task is private, make sure only the owner can delete it
    throw new Meteor.Error('not-authorized');
  }

  Tasks.remove(taskId);
},
'tasks.setChecked'(taskId, setChecked) {
  check(taskId, String);
  check(setChecked, Boolean);

  const task = Tasks.findOne(taskId);
  if (task.private && task.owner !== this.userId) {
    // If the task is private, make sure only the owner can check it off
    throw new Meteor.Error('not-authorized');
  }

  Tasks.update(taskId, { $set: { checked: setChecked } });
},
'tasks.setPrivate'(taskId, setToPrivate) {
```
>Notice that with this code anyone can delete any public task. With some small modifications to the code, you should be able to make it so that only the owner can delete their tasks.
We're done with our private task feature! Now our app is secure from attackers trying to view or modify someone's private tasks.
