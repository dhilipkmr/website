---
path: "/blogs/array-flatten"
date: "2019-10-25"
title: "Flattening an Array"
author: "Dhilip kumar"
timeToRead: "3"
smallTitle: "Array Flattening"
description: "Flattening an Array"
postNum: "16"
ogimage: './cover_16.png'
---

<img src="./cover_16.png"/>
<br/>

Hello there 👋,

*Array flattening* is a process of reducing a Multi Dimensional Array into a single dimensional Array or with the dimensions specified.

Example: 

Input: [1, 2, 3, 4, [5, 6]]

Output: [1, 2, 3, 4, 5, 6]

![](https://media.giphy.com/media/PglfjMgtwjK6c/giphy.gif)

## Thought Process:

 Step 1: We should iterate over the given array.
 Step 2: For Each element if it is not an array push it into the new array.
 Step 3: If it is an array repeat Steps 1 to 3.


## Observations:
 - We use the output of one iteration in the next, so the idea here is to use [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
 - Since there is a repetition of steps 1 to 3 on getting an Array as input, we will have to do a recursion.

### Lets get into coding:

```js
function flattenArr(arrToFlatten) {
    return arrToFlatten.reduce((acc, value) => {
      if (value instanceof Array) {
        return acc.concat(flattenArr(value));
      }
      return acc.concat(value);
    }, []);
}
```

Call it as:
```js

const arr = [1, 2, 3, 4, [5, 6]];
flattenArr(arr) // [1, 2, 3, 4, 5, 6]

```

 - `flattenArr` is a function that accepts `arrToFlatten` of type Array as Argument.
 - We return the output of `arrToFlatten.reduce`.
 - Let the initial value of the result be empty array `[]`
 - If the current input `value` is not an Array's instance add it to the `acc` using `concat` utility function.
 - If that turns out to be an `instanceof` an Array then call `flattenArr` again with the Array(`value`) as a parameter, then concat that with `acc`.

So now, with this approach we can reduce any Multi Dimensional Array into  a Single Dimensional Array.

How about the case where we need it to flatten only upto specified levels deep and anything nested inside that should remain as it is?

Its simple we get another value from the user in the argument(`depth`).

```jsx
function flattenArr(arrToFlatten, depth) {
    return arrToFlatten.reduce((acc, value) => {
      if (value instanceof Array && depth > 0) {
        return acc.concat(flattenArr(value, depth - 1));
      }
      return acc.concat(value);
    }, []);
}
```
Call it as:
```js

const arr = [1, 2, 3, 4, [5, 6, [7, 8]]];
flattenArr(arr, 1) // [1, 2, 3, 4, 5, 6, [7, 8]]

```


- Add an additional parameter `depth` and check if its value is greater than 0 before processing an array inside the Reduce function.

- If the `depth` value is greater than 0 it means the Array has to be flattened. So recursively call `flattenArr` with the array and `depth - 1` as we have gone in one level. 

- Each recursive call means we are going 1 level deep so we reduce the value of `depth` by 1

![](https://media.giphy.com/media/l4pTosVr0iHCJ11hm/giphy.gif)

Oh yeah, I was saying 5 lines. Here you go!!!

```jsx
const flattenArr = (arrToFlatten, depth) => (
    arrToFlatten.reduce((acc, value) => (
      ((value instanceof Array && depth) ? [...acc, ...flattenArr(value, depth - 1)] : [...acc, value])
    ), [])
);
```

## Handling edge cases:

 - What if the first parameter is not an array?
 - What if depth is not a number?

Lets add a check:

```js
 const typeOfDepth = typeof(depth);
 if (!(arrToFlatten instanceof Array) || !(typeOfDepth === 'number')) {
    throw new Error('Invalid Argument Supplied');
 }

```

[Codepen link](https://codepen.io/dhilipkmr/pen/XWWRJGp)

![](https://media.giphy.com/media/l1J3CbFgn5o7DGRuE/giphy.gif)

