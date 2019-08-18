---
path: "/blogs/optional-chaining"
date: "2019-08-15"
title: "Understanding Optional Chaining"
author: "Dhilip kumar"
timeToRead: "1"
smallTitle: "Optional Chaining"
description: "Understanding Optional Chaining in javascript"
postNum: "14"
ogimage: './cover_14.png'
---
![](https://thepracticaldev.s3.amazonaws.com/i/23q1qkg3utg8f2l36rhf.jpg)

What if I tell you that the following snippet is Possible in javascript?

```jsx

const hasWorld = response && response.data && response.data.msg && response.data.msg.includes('world');

const hasWorld = response?.data?.msg?.includes('world');
```

This way of checking the property of an object known as Optional Chaining.

This is currently in Stage 3 `tc39`, however with `babel` we will be able to use it in our code right now by adding the following plugin `@babel/plugin-proposal-optional-chaining` to your config file for babel v7+.

Below is the Transpiled Babel Code Example with Optional Chaining.

[Transpiled code Example](http://bit.ly/optional-chaining)

Thats all Folks!!!