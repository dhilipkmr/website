---
path: "/blogs/creating JSON.superStringify()"
date: "2020-03-22"
title: "Creating JSON.superStringify()"
author: "Dhilip kumar"
timeToRead: "4"
smallTitle: "JSON.superStringify()"
description: "creating JSON.superStringify()"
postNum: "19"
---


Hello Devs,

I recently came across an interesting problem, where I was asked to write a `JSON.superStringify()` which avoids repetition if `(key, value)` are same.

Let me get you the picture:

let us assume that there is an object like below,

```js
const baz = {
  foo: 'foo',
  bar: {}
};
```

Then, the output of the same should be a serialised string with no repetition if `(key, value)` are same for the object property.
Here 'foo' is the key and value for `baz` object. So instead of duplicating it we create it only once.

###Expected Output:
```js
const baz = {
  foo: 'foo',
  bar: {}
};

JSON.stringify(baz); // "{"foo":"foo","bar":{}}"
JSON.superStringify(baz); // "{"foo","bar":{}}"

```

![](https://media.giphy.com/media/eOewytQL4tOOA/giphy.gif)

Now you should be able to understand the problem. It avoids unnecessary payload that is being sent over the network.However, we need our own `JSON.superParse()` to make it parse in the right manner.


###Assumptions:
 For keeping the solution Simple,
 - We are not going to worry about cases where the inputs are undefined, null, Symbol, WeakMaps and WeakSets.(However they are just a typecheck away)
 - No second or third Parameter for `JSON.superStringify()`



###Approach:
 Let us list down the `(key, value)` possibilities.
 The Inputs can be,
 - A string
 - A number
 - A boolean
 - An array(of type object),
 - An object(of type object)


###How do we tackle each of them?
 - A string's output will have quotes(`""`) attached to it in the Stringified output.
 - A number's output is just string converted.
 - A boolean's output again is just string converted.
 - An Array can hold any of the above types and it has to be iterated and then `[]` should be added to the output.
 - An Object can have all the above as its value, and all its properties has to be stringified and `{}` should be added at the end.


Now, we know how to tackle the problem let's put out verbal steps.

 - Step 1: Any keys apart from type `Object` should be converted to string.
 - Step 2: For all the values which are Objects,
     * Handle Array, it should repeat steps 1 and 2
     * Handle objects, it should repeat steps 1 and 2.
 - Step 3: Return the output string.

It is clear from our verbal steps that the Array and the Objects have repetitions of above steps which results in having `recursion`.

![](https://media.giphy.com/media/rAa6I6ccp9oR2/giphy.gif)

##Let's get coding.

### Step 1: Let us handle all cases except Object type

```js
JSON.superStringify = function(input) {
    // Handling Other types except Object
    function handleOtherTypes(val) {
        if (typeof(val) === 'string') {
            return `"${val}"`;
        }
        return `${val.toString()}`;
    }
    return handleOtherTypes(input);
}
```

- When it is a string type then add quotes `""` or just convert it to string and return the output.


OUTPUT:
```js
    JSON.superStringify(1); // "1"
    JSON.superStringify("hello"); // ""hello""
    JSON.superStringify(true); // "true"
```


###Step 2: Including Arrays:

```js
JSON.superStringify = function(input) {
    // Array
    if (Array.isArray(input)) {
        const output = input.map((val) => {
          return this.superStringify(val); 
        });
        return `[${output.join(',')}]`;
    }
    // ... code for handling Other types
    return handleOtherTypes(input);
}
```


If it is an Array
 - Add Square bracket at the End `[]`.
 - We need to stringify each of the contents inside the Array.
 - Since each of them can be of any type (Number, string, boolean or array), for each value of an array we recall our `superStringify` function recursively and store the result in an array (`output`) through `map`.
- Finally, we move ahead with joining the output Array with comma.


OUTPUT:
```js
JSON.superStringify([1,2,'444', true]); // "[1,2,"444","true"]"
```


### Step 3: Including Objects:

 - After Each `key` and `value` pair there should be a `comma(,)` which acts as a delimiter in case of objects.
 - So let's try utilizing `join()` utility of an Array to create delimiter.
 - Which means we will put each stringified (`key`, `value`) pair inside an array and finally join them.


Since we always update the existing array as and when new `(key, value)` properties are stringified, we could go with [`Array.reduce()`](https://www.w3schools.com/jsref/jsref_reduce.asp)

```js
JSON.superStringify = function(input) {
    // ... array handling code
    // Object Handling
    if (typeof(input) === 'object') {
        const keysList = Object.keys(input);
        const superStringified = keysList.reduce((acc, key) => {
            const value = input[key];
            // case 1
            if (key === value) {
                acc.push(`"${key}"`);
                return acc;
            }
            // case 2
            if (typeof(value) === 'object') {
                 acc.push(`"${key}":${this.superStringify(value)}`);
                 return acc;
            }
            // case 3
            acc.push(`"${key}":${handleOtherTypes(value)}`);
            return acc;
        }, []);

        return '{' + superStringified.join(',') + '}';
    }
    // ... other types handling code
}
```


We have 3 main cases:

case 1: If both `key` and `value` are the same we are going to add only key with quotes around it to avoid duplication.

case 2: If the value is object it could be either array or object which we have already handled in our function so we call `superStringify` recursively.

case 3: If it is not in case 1 or 2 then `handleOtherTypes` should produce output for our different types.


OUTPUT:
```js
const input = {a: [1,2,'444', true], "b": 4, c:"c"};

JSON.superStringify(input); // "{"a":[1,2,"444","true"],"b":4,"c"}"
```

Oh yeah we have created our `superStringify` serializer.

![](https://media.giphy.com/media/3nPVcAIb6ft8k/giphy.gif)

Full working demo is here at [codesandbox](https://codesandbox.io/s/gallant-fast-7etu4?fontsize=14&hidenavigation=1&theme=dark)

