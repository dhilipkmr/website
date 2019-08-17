---
path: "/blogs/js-split"
date: "2019-05-08"
title: "Custom split() in Javascript"
author: "Dhilip kumar"
timeToRead: "3"
smallTitle: "Custom String.split()"
description: "Implementing our own `split()` in Javascript"
postNum: "11"
ogimage: './cover_11.png'
---


##What are we going to achieve?

Implement our custom split function `myCustomSplit` which behaves the same way as `split()` in javascript.

###Output:

```js
const str = "val1&$val2&$val3";
const op = str.myCustomSplit('&$');
console.log(op);

// output
// ["val1", "val2", "val3"]

```

###Let's Split:

![](https://media.giphy.com/media/3og0IHyZMxZNkNOWT6/giphy.gif)

```js
String.prototype.myCustomSplit = function(splitVal) {
  const outputArr = [];
  const string = this;
  let nextVal = '';
  const splitlength = splitVal.length;
  let i = 0;
  // ...Some code
}
```

* `myCustomSplit` - Name of the custom Split function.
* `splitVal` - Value based on which we have to do the split.
* `string` - The string on which we execute split.
* `outputArr` - The array that will be returned as output.
* `nextVal` - Gives the intermediate string that is formed.
* `splitlength` - Length of the `splitVal`

```js
while(i < string.length) {
  // When the current character is same as splitVal's first character
  if (string[i] === splitVal[0]) {
    let split_length_remaining = splitlength - 1;
    let split_length_passed = 1;
    let similarSplit = string[i];
    while(split_length_remaining) {
      if (string[i + split_length_passed] === splitVal[split_length_passed]) {
        similarSplit += string[i + split_length_passed];
        split_length_passed++;
        split_length_remaining--;
      } else {
        break;
      }
    }
    if (!split_length_remaining) {
      outputArr.push(nextVal);
      nextVal = '';
    } else  {
      nextVal += similarSplit;
    }
    i = i + split_length_passed;
  } else {    // When the current character is different from `splitVal` 's first character
    nextVal += string[i];
    i++;
  }
}

```

##Explanation:
- Loop for the entire string Length.
- (else case)Check the current character with the `splitval`'s first character, if they are **different** concatenate with `nextVal` and increment `i` by 1.
- (if case)If the **current character** is same as the `splitval`'s first character, then we go into **inner while loop** which helps when the split value is more than single character.

###Inside `if` case:

- `split_length_remaining` gives the remaining length of the `splitVal` that we have to iterate for.
- `split_length_passed` is set to 1 because we already compared the first character of the `splitVal`.
- `similarSplit` helps in adding all the values after the first value is matched in inner while loop, so that if the last character of `splitVal` fails then we can add the content of `similarSplit` to the `nextVal` variable.
- If `split_length_remaining` is not `0`, we did not completely compare all the values. So, we go on for other values to check if they match the input string.If they are equal we increment `i` value and  decrement  `split_length_remaining`.
- if `split_length_remaining` has reached `0` then we would have already matched all the values in `splitVal` with the string, so push the content into `nextVal` and reset it to **empty string**.

```js
 outputArr.push(nextVal);
 return outputArr;
```

Finally, push all the contents in `nextVal` to `outputArr` and return it.

###OUTPUT:

```js
const x = "val1&$val2&$val3".myCustomSplit('&$');
console.log(x);
// output: ["val1", "val2", "val3"]
```
Checkout the code at [codepen](https://codepen.io/dhilipkmr/pen/KLKvdQ)

![](https://media.giphy.com/media/ackDumdRl8fxm/giphy.gif)

###That's All Folks!
