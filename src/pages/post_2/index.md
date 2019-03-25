---
path: "/imdb-extension-part-1"
date: "Feb 6, 2019"
title: "Creating a Chrome Extension Part I"
author: "Dhilip kumar"
timeToRead: "2"
description: "An Introduction to Creating Google Chrome Extension and getting started with communicating between content and background js"
---
<img src="cover_2.png"/>
<br/>

##Prerequisites:
* Basic Javascript Knowledge
* Chrome Browser

##Problem Statement:
Sometimes we spend hours trying to search the **IMDB ratings, durations and plots** of different movies in a list by **manually** Googling it. 
And that is a serious issue when
* It is already Sunday, 11 PM.
* You’ve got only 2 Golden hours before you crash in your bed
You got to be absolutely sure that you are not wasting your time watching some lame movie.

So what do you do? Install [IMDb Ratings on hover extension](https://chrome.google.com/webstore/detail/imdb-ratings/aodmmndimojddogmhmpaemocbibnimkl?authuser=1).

## How does the Extension work?
* On navigating to any webpage`background.js` listens to click event on the extension.
* Once clicked,`background.js` sends a message to`content.js`.
* The`content.js` then listens to`hover` event.
* When the user rests a mouse for 250ms(an example) on any text then get the text in that location and make an API call.
* On getting a successful response, form a template(HTML) from it and populate it on the UI.

Well, that's too much info. I know! Let's break it down and see it action. This will be a 2 parts series.

##PART-I
Let us get started on the Implementation.

###Step 1: Constructing manifest.json

```jsx
{
  "manifest_version": 2,
  "name": "IMDB Ratings",
  "version": "0.1",
  "content_scripts": [
    {
      "matches": [ "<all_urls>" ],
      "js": ["content.js"]
    }
  ],
  "web_accessible_resources": [
    "styles.css"
  ],
  "background": {
    "scripts": ["background.js", "config.js"]
  },
  "browser_action": {
    "default_icon": "imdb.png"
  },
  "permissions": [
    "contextMenus"
  ],
  "icons": {
    "16": "imdb-16x16.png",
    "128": "imdb-128x128.png"
  }
}
```
Properties to look out for:

* `content_scripts`: Executes the scripts specified inside this property whenever the Browser URL matches URLs specified under “matches” [line 7].Since I need this to be available for all URLs I am using <all_urls> as its value.
* `web_accessible_resources`: To load any Content through the script.
* `background script`: A script that runs in Browser background whenever the browser is opened.

###Step 2: Constructing background.js to listen to Extension click.

``` js
/* clicking the addon icon */
chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
  var msg = {
    type: 'clickResponse',
    buttonClicked: true
  }
  chrome.tabs.sendMessage(tab.id, msg);
};
```
> ***Note***: *`background scripts` don't have access to the DOM, so you have to ask`content_scripts` for help.*

We do not want our`content.js` script to be active in all tabs where the user navigates to. So, we will wait for the user to indicate that he wants our extension to be active. We do that by listening to click event in`background.js`. Whenever the user clicks on the Extension we send a message to`content.js` saying that the user has clicked it.

Click listener here takes a`callback(buttonClicked)` with an argument`(tab)` which gives current tab’s properties. We send back **message** to`content.js` through`sendMessage` API [line 8] and pass tab’s id and message. Message has type which helps to identify the **type** of message.

> ***Remember:*** *`content.js` don't have access to browser clicks or tab clicks but the DOM.*

###Step 3: Listen to the user action (HOVER) through content.js

```js
chrome.runtime.onMessage.addListener(hasGotMessage);
function hasGotMessage(response, sender, sendResponse) {
  switch (response.type) {
    case 'clickResponse':
      window.sessionStorage.setItem('_imdbRaterEnabled', "1");
      listenToMouseover();
      break;
  }
}
```

Add a **listener** in`content.js` for the message from`background.js`

We get a message from`background.js` when the user clicks on the Extension. Find the type that you got from the message. If the type is`clickResponse` then we start listening to hover event in the DOM through`listentoMouseover`

You can`console.log()` it to see if you can get that message.

Please proceed to Part II [here](/imdb-extension-part-2)


