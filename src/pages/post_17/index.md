---
path: "/blogs/this-in-js"
date: "2019-10-26"
title: "Mastering 'this' in Javascript"
author: "Dhilip kumar"
timeToRead: "3"
smallTitle: "Mastering `this`"
description: "Understanding how `this` works with 4 main rules"
postNum: "17"
---
## What is `this` in javascript?
 `this` keyword refers to an object, the object that is executing the **current part of our Javascript code**.



### Why is it so complicated to understand?

 We might feel overwhelmed as there are quite a number of ways to manipulate `this` by providing it a different context.

`this`  binding has nothing to do with **where a function is declared** but it has everything to do with **how a function is invoked**.


There are 4 main Rules which we can make use of, to determine what `this` in your code represents.

## Rule 1.Implicit Binding:
 Implicit Binding is achieved when the function that is executed is called with a context.

Example:

```js

const obj = {
    name: 'Dev',
    getName : function() {
        console.log(this.name);
    }
}

obj.getName(); // Dev
```

### `obj.getName()`

 - Here we call the `getName()` function of the object `obj` with `obj` as the *context*.
 - Since `obj` has `name` property, `this.name` would give out **dev** as the output.

## What if your function is nested within objects?

Example:

```js

const obj = {
    name: 'Dev Child',
    getName : function() {
        console.log(this.name);
    }
}

const parentObj = {
    childObj: obj,
    name: 'Dev Parent'
};

parentObj.childObj.getName(); // Dev Child

```
 - The last level parent before any function call is the context for that function.
 - In our case `obj` is the `this` for `getName()` function.


### The `Fat Arrow` function catch:

```js 
var name = 'Global Dev';
const obj = {
    name: 'Local Dev',
    getName : () => {
        console.log(this.name);
    }
};

obj.getName() // Global Dev 😈 😈 😈

```

![](https://media.giphy.com/media/3o6nUXo2B7D4tAfQ6k/giphy.gif)

 - The problem here is `this` binding has been done for the `getName` arrow function and it takes *Lexical `this`* which is Gloabl in this case.
 - So calling the function with **impicit binding** takes *lesser priority* than **Arrow function.**



## 2.Default Binding:

*Default binding* is whenever the function is called **without any context.**
A common mistake occurs while destructuring a function from an object which has `this` context in it.

```js

var name = 'Global Dev';

const obj = {
    name: 'Local Dev',
    getName : function() {
        console.log(this.name);
    }
};

const { getName } = obj;
getName(); // Global Dev  🤔🤔🤔

```
 - Here we have destructured the `getName` function out of the object `obj`.
 - Then, we have called it **without any context**
 - It means the function execution here is happening with *Global context.*
 - So while execution if it encounters any `this` in the code that will try to resolve its value by checking window object.
 - We have 'Global Dev' value assigned to `name` in `window` object so `this.name` resolved to `window.name` which is 'Global Dev'.
 - Note: The same would have resulted in returning `undefined` in `strict` mode.

 ### How to Overcome this?
  By using **Explicit binding**

## 3.Explicit Binding:
  *Explicit binding* is a process of specifying what `this` object is, while calling the function. It is usually done with the help of the famous Js trio `call`, `apply` and `bind`.

```js
var name = 'Global Dev';
const obj = {
    name: 'Local Dev',
    getName: function() {
        console.log(this.name);
    };
};

const { getName } = obj;
const newContext = {
  name: 'New Dev'
};
// Explicit binding takes priority over Default binding 
getName.call(newContext); // New Dev 

// Explicit binding takes priority over Implicit binding 
obj.getName.call(newContext); // New Dev 

```
It is clear from the above that, Explicit bindings take priority over Implicit or Default Binding.

But does it have a Higher priority than Arrow function's `this` binding.
No!
![](http://giphygifs.s3.amazonaws.com/media/DxA688OXGUMSI/giphy.gif)


```js
var name = 'Global Dev';
const obj = {
    name: 'Local Dev',
    getName: () => {
        console.log(this.name);
    }
};

const newContext = {
  name: 'New Dev'
};

//Arrow function's bind took priority over Explicit binding.
obj.getName.call(newContext); // Global Dev 

```

## Priority Ordering:

*Arrow Function* > *Explicit Binding* > *Implicit Binding* > *Default Binding*

![](https://media.giphy.com/media/ubpB6XcvpYMF2/giphy.gif)


## 4.`new` Binding:
  If the function is called with `new` operator in the prefix then the newly constructed object is the `this` reference here.

  ```js
  function MyName() {
    this.name = "Local Dev";
  }

  MyName.prototype.getName = function() {
    console.log(this.name);
  }

  // `new` binding
  const name_instance = new MyName();
  console.log(name_instance.name);    // Local Dev
  // Implicit Binding
  name_instance.getName();            // Local Dev

  ```

   - Here we have defined our instance variable `name_instance` which is formed from `new` opertor operating on factory function `MyName`.
   - All references to `this` in `MyName` function refers to the newly created object instance `name_instance`

  All our Rules from 1 to 3 applied to this instance (`name_instance`):

  ```js
  // Default Binding
    var name = "Global Dev"
    const {getName} = name_instance;
    getName();                                      // Global Dev

  // Implicit Binding
    name_instance.getName();                        // Local Dev

  // Explicit Binding
    name_instance.getName.call({ name: 'New Dev'}); // New Dev

  // Arrow Binding
    MyName.prototype.get_Arrow_Name = () => {
      console.log(this.name);
    }
    name_instance.get_Arrow_Name();                  // Global Dev
  ```

## React Classes:

```jsx
  class App extends React.Component {
    constructor() {
      this.handle_three = this.handle_three.bind(this);
    }

    handle_one() {
      console.log(this);
    }

    handle_two = () => {
      console.log(this);
    }
    
    handle_three() {
      console.log(this);
    }
  
    render() {
      return (
        <React.Fragment>
          {/* Default binding */}
          <div onClick={this.handle_one}></div> 
          {/* Arrow Function */}
          <div onClick={this.handle_two}></div>
          {/* Expicit Binding at constructor*/}
          <div onClick={this.handle_three}></div>
        </React.Fragment>
      )
    }
  }
  ```
  - Handlers on JSX elements will call the function declared.
  - `handle_one` attachment results in calling the function with no context(Default binding). This results in `undefined` because React ensures Default binding results in `undefined` rather than a Global.
  - `handle_two` attachment results in calling the function with the newly created Intsance's (Current App Class's instance's) context.
  - `handle_three` attachment results in explicit binding to provide value for `this` at the constructor.

Lets Celebrate now!
![](https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif)

Hope you guys have Enjoyed this Article 😄

Reference: Kyle Simpson's [this & Object Prototypes](https://goodreads.com/book/show/22221108-you-don-t-know-js)

