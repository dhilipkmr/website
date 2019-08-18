---
path: "/blogs/noopener"
date: "2019-08-17"
title: "Understanding rel='noopener'"
author: "Dhilip kumar"
timeToRead: "3"
smallTitle: "Noopener"
description: "Understanding `noopener`"
postNum: "15"
ogimage: './cover_15.png'
---


<img src="./cover_15.png"/>
<br/>

**TLDR:**
Checkout the implementation example here:
<a href="https://my-dummy-domain.netlify.com/" target="_blank">Live Demo</a>

##Let's Open a url in new tab from within our website
###THE HTML WAY

```jsx

<a href="https://malicious-domain.netlify.com" target="_blank">Visit Malicious Website!</a>
```


Okay, here we have a `href` attribute to a malicious website and `target` as `_blank` attribute to make it to open in a new tab.

Let us say that, the user clicks on "Visit Malicious Website!" from the above code. He gets redirected to the malicious website in a new tab.

The flow seems so plain and simple what's the possible Security risk that the user has here?

 - The user is redirected to a domain from your page.
 - At this time, the browser attaches all your `window` variable's content of your current website to `window.opener` variable of the malicious website.
- This is done by Chrome and Firefox browsers which has one of the largest user base.
- So now the malicious website has access to your website's window, which obviously opens up a **security loop hole** in redirection of this method.
- Now the malicious website once it has access to your website's `window` variable through `window.opener` it can redirect your previous website to a new **Phishing website** which could look similar to the actual website you opened and might even ask you to login again.
- The above change can be done in the malicious website by just writing the following code
 ```jsx
  if (window.opener) {
    window.opener.location = 'https://www.dhilipkmr.dev';
  }
 ```
- So the Innocent users get caught in this trap and would provide the login details which could be exposed to the attacker.

![](https://media.giphy.com/media/UuIpr1iwXkRgY/giphy.gif)

##How do we avoid this?

A simple way is to add a `rel` attribute with `noopener` to the `<a>` tag.
```jsx
<a href="https://malicious-domain.netlify.com" rel="noopener" target="_blank">Visit Malicious Website!</a>
```
###What does it do?
 - `rel="noopener"` indicates the browser to not to attach the current website's `window` variable to the newly opened malicious website.
 - This makes the `window.opener` of the malicious website to have `null` as its value.


So be careful when you navigate your users to a new domain that is not maintained by you.


Not always we open a new tab with `a` tag there are cases where you have to open it through executing javascript's `window.open()` like below,

```js

function openInNewTab() {
  // Some code
  window.open('https://malicious-domain.netlify.com');
}
```
```jsx
<span class="link" onclick="openInNewTab()">Visit Malicious Website!</span>
```

Here there is no mention of `noopener` so this results in passing `window` of the current website to the malicious website.

##The javascript Way!

###How to handle such cases when new tab is opened through js?

```js
 function openInNewTabWithoutOpener() {
   var newTab = window.open();
   newTab.opener = null;
   newTab.location='https://malicious-domain.netlify.com';
 }
```
```js
<span class="link" onclick="openInNewTabWithoutOpener()">Visit Malicious Website!</span>
```

Here,
- We have opened a dummy tab through `window.open()` which opens `about:blank`, so it means it has not redirected to the malicious website yet.
- Then we modify the `opener` value of the new tab to `null`
- Post that we modify the new tab's url to the malicious website's url.
- This time, again `opener` would have been null, due to which it cannot access the `window` variable of the first website.

Problem Solved.

But this method wont be possible in older versions of Safari, so we again have a problem.

###How to fix Safari's issue?

```jsx
function openInNewTabWithNoopener() {
  const aTag = document.createElement('a');
  aTag.rel = 'noopener';
  aTag.target = "_blank";
  aTag.href = 'https://malicious-domain.netlify.com';
  aTag.click();
}
```
```jsx
<span class="link" onclick="openInNewTabWithNoopener()">Visit Malicious Website!</span>
```
Here we mimic clicking on an anchor tag.
 - We create `<a>` tag and assign the required attributes then execute `click()` over it, which behaves the same way as the link is clicked.
 - Do not forget to add `rel` attribute to the tag here.


Other facts:

 - When you click `CMD + LINK` on anchor tag, chrome, firefox and Safari considers makes `window.opener` of the malicious website as `null`
 - However, on `CMD + LINK` on an element where new tab opening is handled through javascript, the browser attaches `window` variable and sends it to the new tab.
 - By default, the new version of Safari removes `window.opener` when used with anchor tag for all cases, to pass the `window` info to the new tab you have to explicitly specify `rel='opener'`

Checkout the live implementation example here:
<a href="https://my-dummy-domain.netlify.com/" target="_blank">Live Demo</a>


None shall bypass your Security.
![](https://media.giphy.com/media/5SAPlGAS1YnLN9jHua/giphy-downsized-large.gif)


Thats all Folks!!!
