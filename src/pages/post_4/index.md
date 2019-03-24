---
path: "/introduction-to-react-hooks"
date: "Mar 10, 2019"
title: "Introduction to Hooks"
author: "Dhilip kumar"
timeToRead: "5"
description: "Understanding the basics of React Hooks and how we can map it to React Lifecycle methods by Building a Timer"
---
<img src="cover_4.png"/>

##What is React Hooks?
**React Hooks** is a new way to build your React Components. React Hooks are nothing but just a functional component. And these components have **extra features and capabilities** which belonged exclusively for class-based components so far. React Hooks makes it possible to **take stateful logic out of our component to reuse it in another component** which was difficult in class-based components, that introduced complex **render props** and **higher order component** design patterns.

Yes, React Hooks makes it possible to have access to **state logic** and React’s **lifecycle methods** in functional components.

![](https://media.giphy.com/media/G3fPad8N68GfS/giphy.gif)

Using just Presentational and Class components in React sound so 2018. React’s latest Stable version [16.8] supports React Hooks. In this article, we will have a brief look at some of the main features of React Hooks.

As mentioned earlier, React Hooks can have state logic and lifecycle methods in it. Basically, Classes can have instances to it. Due to which we have`this` as an instance variable. We can access`this` from any methods within the class.We cannot access`this` in functional components, as they do not have an instance variable associated with it. So this should make you clear that there cannot be any`this.setState` which we had in Class Components. This leads us to the question.

###How does Hooks store and update State variables?

It is with the help of`useState` Hook we maintain our State logics inside our Component. We will also be seeing about`useRef` which helps in providing a reference to a JSX element or a callback .`useEffect` for lifecycle methods. We will see about those in the following example by creating a Timer.

```jsx
import React, {useState, useRef, useEffect} from 'react';

const Timer = (props) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const secondsPassed = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const date = new Date()
      secondsPassed.current = secondsPassed.current + 1;
      setTime(date.toLocaleTimeString());
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [time]);

  return (
    <div>
      <div>{time}</div>
      <div>{secondsPassed.current}</div>
    </div>
  )
}

export default Timer;
```
Output:

![](timer.gif)

###The Timer has 2 outputs:
* Current Time
* Seconds elapsed since the timer’s start.

##useState hook:
[Line 4] As I mentioned earlier,`useState` helps in creating a **state variable**. useState is a function that returns an array of two elements

* Index 0 has the current state of the variable.
* Index 1 is a function to manipulate its value.
* `useState` takes one parameter as the argument which is the initial state value.[It can be of any type]

I have created a state variable called`time` (In the above example).

To modify its state I have used`setTime()`.In SetTime I have pass the new value in the argument. So, once the new time is set[line 11] it re-renders. As it is a functional component it executes everything from the beginning for every render.

How is it Different from Class based state variables?

* We maintain a separate state variable for each state logic in a component.
* Having **Independent state variables**. It is a better approach than maintaining just one state variable object for a component and adding properties to it.
* The **new value** that we pass in the parameter, entirely **replaces** the state variable with that content.This is true while **modifying States in React Hooks** (`setTimer` in the above example).`this.setState` in class components, does not behave this way. While setting state using`this.setState`, if any existing properties are missed, current properties are merged with previously existing properties. Now, this explains why is it better to have independent state variables as mentioned in point 1.

##useRef hook:
[Line 5] This hook helps in maintaining References. Yes, I know what you are getting at. I said **functional components cannot have references** and now I am talking about them having references in it.

###So, whats going on here?

In our functional components, all variables that we create, cannot be made as State variables . The logic should remain persistent sometimes. Inspite of any render that occurs to the component it should remain intact.`useRef` Hook helps us in the above scenario.`useRef` is similar to having`this` in class Components.

I have a defined a reference`secondsPassed`, in the example above.`secondsPassed` gives the number of seconds elapsed after starting the timer. And to update it [in line 10] I have access done it like`secondsPassed.current = <%new value%>`. This helps in immediately binding the new value to the reference.

So how does`useRef` Hook differ from class-based refs?

As you can see from my example,

* `useRef` references are not **limited** to applying it only as a reference to JSX elements like how we do it in case of Class-based components.
* `useRef` can also be used to store values similar to having an instance variable and to persist logics between multiple renders.
* A callback can also be referenced. Helps in associating callbacks dynamically.

###Okay, where are the lifecycle methods you ask?

##useEffect hook:
In my opinion, React team might have understood that having a hell lot of **Lifecycles** with complex names makes it hard for any beginners to start with React in spite of the benefits that it offers.I would say`useEffect` have reduced the burden of remembering the lifecycle names. Bye Bye Weird lifecycle Names.

![](https://media.giphy.com/media/ef0ZKzcEPOBhK/giphy.gif)

However, with`useEffect`, we can declaratively inform React to what it should do.

In my example above, line 7 we have declared`useEffect`.

* It takes a **function** as input in the **first argument**. On Applying the effect, this function gets executed.
* **An array** of variables to **watch** for as the second argument. Through this, we can specify React to **re-apply** the effect whenever any of the variables mentioned in the array changes.
* If we miss specifying the second argument then that effect runs every time on **re-rendering**. To make it render only once specify an empty array.
* We can have multiple`useEffect` React hook in our component.
* Also, to run a function right before applying your effect like a cleanup step, we shall **return** a function from the **first argument**. Helps in removing some event handlers or timeouts in our case.[line 13]
In the example, we declared`useEffect` Hook to trigger a **timeout** which on every second resets the state value of time. Then, we update the **secondsPassed** reference within it. As we need to reapply this effect (i.e) rerun this function on render only if the state variable time changes. So we mention that to React by creating an array with just time variable in it.[line 16].

##useEffect with reference to Class-based component lifecycle:
We can achieve the following lifecycle methods with`useEffect` hook.

* `componentDidMount`:`useEffect` with empty array as second argument.
* `componentDidUpdate`:`useEffect` with the second argument as an array that contains a list of variables to listen to.
* `componentWillUnmount`:`useEffect` with the first argument as a function that returns a function(this returned function should have unmount logics).And the second argument as an empty array.
* `render`: The entire content inside it is rendered as it is a functional component.
## useMemo hook:
This Hook serves as an Alternative to`shouldcomponentUpdate`.

```jsx
import {useMemo} from 'react';
//...some code
const memoizedValue = useMemo(() => {
  findPrimeNumbersinRange(a, b)
}, [a, b]);
//...some code
```
`useMemo` takes the **function** and can **return any value to memoize**. Memoization is nothing but **caching values**.

The values of`a` and`b` (In the above example) are used to find the PrimeNumbers between the given range [from a to b]. And we know, calculating Prime numbers is an **expensive** task especially when the numbers are larger.

This optimization helps to avoid expensive calculations on every render.

`useMemo` checks from its second argument if a or b’s value has been changed. Values that are cached previously are used otherwise So if its values do not change then there is no rerun of the logic inside the function.

> ***Note:*** *Only use React hooks specific API in the top-level of your component and not inside return or inside any other function[only on the root level].*

![](https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif)

Thus, we have seen some of the important Hooks in React and have understood how we can leverage them in our application. Also, we have seen how Hooks Effects maps to **Lifecycle components** and how using Refs allows us to store values as well, apart from storing reference to DOM element. Here, we can extract the effect and make it an independent hook (custom hook) and can reuse the stateful logics across components.

There are other Hooks APIs like **useContext, useReducer and useCallback**. To know more about them visit [**React Docs**](https://reactjs.org/docs/hooks-reference.html)
