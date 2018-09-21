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
8. Adding user accounts
9. Security with methods
10. Publish and subscribe
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
##### Add hide completed checkbox to App component [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/7-temporary-ui-state/simple-todos/imports/ui/App.js)
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
##### Add initial state to App component [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/7-temporary-ui-state/simple-todos/imports/ui/App.js)
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
##### Add toggleHideCompleted handler to App [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/7-temporary-ui-state/simple-todos/imports/ui/App.js)
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
##### Filter tasks in renderTasks [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/7-temporary-ui-state/simple-todos/imports/ui/App.js)
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
##### Update data container to return incompleteCount [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/7-temporary-ui-state/simple-todos/imports/ui/App.js)
```javascript
export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
})(App);
```
##### Display incompleteCount in the header [```imports/ui/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/7-temporary-ui-state/simple-todos/imports/ui/App.js)
```javascript
return (
  <div className="container">
    <header>
      <h1>Todo List ({this.props.incompleteCount})</h1>

      <label className="hide-completed">
        <input
```
