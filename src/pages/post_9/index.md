---
path: "/blogs/memoization"
date: "2019-04-21"
title: "Implementing Memoization in Javascript"
author: "Dhilip kumar"
timeToRead: "4"
smallTitle: "Js Memoization"
description: "To learn how to implement Memoization with simple Example"
postNum: "9"
---

<img src="./cover_9.png"/>
<br/>

##What is Memoization anyway?

**The ability to return the previously calculated value without recalculating them, on receiving same set of inputs again is basically what memoization is.**

So whenever a Function receives the same set of input arguments it checks in its cache variable if there is a value already exists for it then returns that value or does a recalculation.

![](https://media.giphy.com/media/fNlRJ7Gwr4Lba/giphy.gif)

 - It Helps in reducing the **computation time.**
 - **Faster render** time

###Outline:
 - There is a summation function that adds two numbers.
 - We create our own `memoization` function.
 - Use `memoization` function as Higher Order Function and create an output function.
 - Call the above Output function instead, when we need to call summation function.


![](https://media.giphy.com/media/xT0xem7ZlZ2DOYqpG0/giphy.gif)


Let's get Started.


Function `summation` is our function that we are going to Memoize.
It is a simple function which adds two numbers and returns the result.

``` jsx
// Function that sums two numbers
const summation = function (a, b) {
 if (typeof(a) === 'number' && typeof(b) === 'number') {
   console.log('From Summation function');
   return a + b;
 }
  return "Invalid Entry";
}

```

 - The `memoize` function takes in a function `fnToMemoize` as a single Argument and returns a `function` which can be called upon.
 - `memoizedCache` is an object where we cache our new results.
 - `constructPropertyFromArgs` is used to create a unique property name based on the argument and function we pass.We will see about that in details in next Section.
 - `manageInsertion` is used to delete the property from the cache object if the maximum size is reached.(default length : 10)
 - First we check if the property is present in the `memoizedCache`, if yes, we return result from `memoizedCache` or we actually call the function `fnToMemoize` and store the result in the `memoizedCache`.


``` jsx
//  `memoize` function  decides if it has to return cached value or call the summation function
const memoize = function (fnToMemoize, cacheSize) {
  if (!(typeof fnToMemoize === 'function')) {
    throw new Error('Argument passed to memoize function should be a function');
  }
  const memoizedCache = {         // A closure object
    insertionOrder: []            // To preserve the order of Insertion, so that FIFO can be implemented
  }; 
  
  return function(...args) {
    const propToCheck = constructPropertyFromArgs(fnToMemoize, args);
    if (!memoizedCache[propToCheck]) {
      memoizedCache[propToCheck] = fnToMemoize(...args);
      manageInsertion(memoizedCache, propToCheck, cacheSize);
    } else  {
       console.log('From Cache ');
    }
    return memoizedCache[propToCheck];
  }
}


```

##How do we construct a property name?

This is crucial, as improper naming may result in unexpected behaviour of the app.

The `memoize` function can act as a generic function, through which we can memoize any of our other functions that are lying in the same scope.So, in order to avoid misbehaviour we need to have unique names to our functions.

> Our Property name is a combination of function name and arguments separated by **'|'** which acts as a **delimiter.**

###Why do we need Delimiter?
Let's say if we don't use a  Delimiter and just join the string.

Here, the Property name for `add (fn, 1, 2, 3)` will be `fn123`.
And, the Property name for `add (fn, 12, 3)` will also be `fn123`.

So output of `add(fn, 12,3)` will be 6 which is calculated from the previous execution.

![](https://media.giphy.com/media/25QbQdrFvFAMcPKq24/giphy.gif)


```jsx
// To create a Property name from the arguments passed to the function
const constructPropertyFromArgs = function (fnToMemoize, args) {
  let propToCheck = [];
  propToCheck = propToCheck.concat(fnToMemoize.name, args);
  return propToCheck.join('|'); // A delimiter to join args
}
```

##Why do we need to specify the cacheSize?
Let's say if we call our `summation` function for 1000 different parameters, then our `memoizedCache` object's length would be 1000 causing higher amount of wastage in space.

To avoid this by default we set the size of the object to 10 and the user can override it as per their need thus solving this issue.

##How do we remove the element?

Best way would be to use LRU algorithm. For simplicity I have used FIFO where I keep track of element's insertion order in `insertionOrder` property and if the length is maxed out ,  I get the first value using `shift` and delete the property with that name from the `memoizedCache` object.


``` jsx
// To manage space complexity
// To maintain only specified number of elements in the cache and deleting the others using First In First Out approach
const manageInsertion = function(memoizedCache, propToCheck, cacheSize = 10) {
  if (memoizedCache.insertionOrder.length >= cacheSize) {
    const oldestElementName = memoizedCache.insertionOrder.shift();
    delete memoizedCache[oldestElementName];
   }
   memoizedCache.insertionOrder.push(propToCheck);
}
```

Finally we pass our `summation` function to our `memoize` function that returns a function which is stored in `memSummation` and we specify the cache size to be 2.
Which means size of our `memoizedCache` object will never be greater than 2.

Then we call `memSummation` twice.


``` jsx
const memSummation = memoize(summation, 2);  // `memoize` is a HOC

console.log(memSummation(10, 50));
console.log(memSummation(10, 50));

```

The output:

First console.log() returns output after execution whereas the second one is returned from the cache.

``` jsx
 "From Summation function"

 60

 "From Cache "

 60
```

Don't forget to Follow me for Interesting posts :)

Find the CodePen Link [here](https://codepen.io/dhilipkmr/pen/PgeMxM?editors=0010)

![](https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif)


That's all Folks :)
