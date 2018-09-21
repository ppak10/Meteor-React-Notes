# Meteor-Todo-App-Notes
###### Notes on [Meteor's tutorial](https://www.meteor.com/tutorials/react/creating-an-app) on creating a todo app that integrates both React and Meteor

## Contents
1. [Creating an app](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/README.md#1-creating-an-app)
2. [Components](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/2-components/README.md#2-components)
3. [Collections](https://github.com/ppak10/Meteor-Todo-App-Notes/tree/3-collections#3-collections)
4. Forms and events
5. Update and remove
6. Running on mobile
7. Temporary UI state
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
##### Modify App component to get tasks from collection [```imports/App.js```](https://github.com/ppak10/Meteor-Todo-App-Notes/blob/3-collections/simple-todos/imports/api/tasks.js)
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
