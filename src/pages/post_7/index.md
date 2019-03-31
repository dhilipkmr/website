---
path: "/cursor-imitator"
date: "2019-04-01"
title: "Cursor Imitator"
author: "Dhilip kumar"
timeToRead: "5"
smallTitle: "Cursor Imitator"
description: "Implementing a standalone Cursor Imitator Component in React"
postNum: "7"
---
<img src="./cover_7.png"/>
<br/>

##So what are we going to build today?

We are going to **Imitate the user typing effect** using React in this project.

Our final **output** will look like the one below:

![](./cursorImitator.gif)

##Project Outline:

* Component takes an **array of description** as an input.
* Component will have a **Blinking text Cursor('|').**
* Text starts appearing in the screen with the **specified delay.**
* Cursor **moves along** with the typed text.
* Cursor **blinks** a while at the end of the sentence.
* No cursor Blink for **last sentence's end.**


![](https://media.giphy.com/media/aAkNru67Hh40E/giphy.gif)

``` js
import React from 'react';
import PropTypes from 'prop-types';

class CursorImitator extends React.Component {

  static defaultProps = {
    content: [],
    nextLetterTime: 50,
    waitAtEnd: 500,
    waitAtStart: 200,
    blinkSpeed: 130,
    letterWrapClass: ''
  }

  constructor(props) {
    super(props);
    this.loadIntro = this.loadIntro.bind(this);
    this.loadCursorBlink = this.loadCursorBlink.bind(this);
    this.clearAllTimeoutsAndIntervals = this.clearAllTimeoutsAndIntervals.bind(this);
    this.state = {
      mounted: false
    };
    this.ttw = 0;             // Time to Wait.
    this.timeoutList = [];    // List of all timeouts triggered.
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  loadIntro(content) {
    const contentLast = content.length - 1;
    return(
      <div>
        {
          content.map((sentence, index) => {
            const refName = 'line_' + index;
            const isLast = contentLast === index;
            return (
              <div ref={refName} className={this.props.letterWrapClass}>
                {this.state.mounted && this.loadLetter(sentence, refName, isLast)}
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    const {content, className, style} = this.props;
    return (
      <div className={className} style={style}>
        {this.loadIntro(content)}
      </div>
    );
  }
}
```

###So what have we done so far? 

* `defaultProps` has initial values for Properties if not provided.
  * `content` - The array of description. Each index stores a sentence to appear.
  * `nextLetterTime` - Time before next letter appears.
  * `waitAtEnd` - Time to wait at the end of each sentence.
  * `waitAtStart` - Time to wait before the start of each sentence.
  * `blinkSpeed` - Time for cursor to appear and reappear[blink].
  * `letterWrapClass` - class for the`<div>` wrapping the sentence.
* `constructor()`
  * `this.ttw` - time to wait is an instance variable since it has to be persisted.
  * `this.timeoutList` - List of all timeouts triggered so that we can clear when required.
* `render()` - loads `loadIntro()`
* `loadIntro()` - For each sentence we iterate and load letter but only if the component has been **mounted.** This is because we need refs to each sentence and they will get created only after the component being mounted.
We are making use of refs to each sentence's div to update it rather than having it as a **state variable.**

###Up Next: Loading Letter by Letter

``` js
loadLetter(sentence, refName, isLastSentence) {
    /* To retain content when accessed from within setTimeout */
    let sentenceLength = sentence.length;
    sentence.split('').forEach((letter, index) => {
      let nextLetter = letter;
      let ttw = this.ttw++;
      let reference = refName;
      const {nextLetterTime, waitAtEnd, waitAtStart} = this.props;
      let self = this;
      let currIndex = index;
      /* To create a Blink at the start of every Sentence */
      if (index === 0) {
        this.loadCursorBlink(self.refs[reference], this.ttw);
        this.ttw = this.ttw + (waitAtStart / nextLetterTime);
        ttw = this.ttw;
      }
      const nextTimeout = setTimeout(() => {
        if (self.interval) {
          clearInterval(self.interval);       // Clear any previous Intervals and removing blink
        }
        if (currIndex === 0 && self.refs && self.refs[reference]) { // Adding '|' in the beginning of every sentence and  inserting incoming texts before that
          self.refs[reference].innerText = '|';
        }
        if (nextLetter === ' ' && self.refs && self.refs[reference]) {  // Handling space
          return self.refs[reference].innerHTML = self.refs[reference].innerHTML.substring(0, self.refs[reference].innerHTML.length - 1) + ' |';
        } else if (self.refs && self.refs[reference]) {                 // adding next digit
          return self.refs[reference].innerText = self.refs[reference].innerText.substring(0,self.refs[reference].innerText.length - 1) + nextLetter + '|';
        }
      }, ttw * nextLetterTime);  // incremented value for every sentence
      this.timeoutList.push(nextTimeout); // To clear it all at once if required
      if (index === sentenceLength - 1) {
        /* To create a Blink at the End of every Sentence */
        this.loadCursorBlink(this.refs[reference], this.ttw, true, isLastSentence);
        this.ttw = this.ttw + (waitAtEnd / nextLetterTime);
      }
    })
  }

```

`loadLetter()` accepts 3 arguments.

* `sentence ` is the sentence that appears on a seperate line.
* `refName` gets the reference to the div on which it should load the content.
* `islastSentence` is used to avoid loading blinking cursor at the end.

> Here we should be careful about **Closures** as we will be using`settimeout` for each and every letter the parent scope should not be missed. So we use `let` and`const` to keep them bound to`setTimeout`.
``` js
this.ttw = this.ttw + (waitAtStart / nextLetterTime);
```
* `waitAtStart/nextLetterTime` gives the number of iteration after which the next letter has to appear.
* We increment `this.ttw` for every letter. Each letter's time to appear  is a multiple of its position in`this.ttw`and`nextLetterTime`
* `index === 0` check is done because whenever it is a new sentence we make,the cursor should blink at the beginning for a while. And we calculate the new`this.ttw` and it should be after blink time expired.

* `nextTimeout` holds the currently triggered timeout which triggers after the required time elapses.And it is pushed into`this.timeoutList` to be able to clear later.
  * Here we clear any previous`self.interval` if present, this makes sure blinking is not happening.`this.interval` holds the blinking interval that is created.
  * `currIndex === 0` check is done to add '|' at the beginning of every sentence and inserting incoming letter before that.
* The Last check is done if we reached the end of the sentence.If yes we can blink cursor.

``` js
loadCursorBlink(ref, ttw, end, isLastSentence) {
  let reference = ref;
  let self = this;
  let isEnd = end;
  const {nextLetterTime, blinkSpeed} = this.props;
  const nextTimeOut = setTimeout(() => {
    if (self.interval) {
      clearInterval(self.interval);
      // 'self.lastReference' stores last shown sentence's reference, we remove the '|' symbol before creating a new interval
      if (self.lastReference && self.lastReference.innerText.substring(self.lastReference.innerText.length-1) === '|') {
        self.lastReference.innerText = self.lastReference.innerText.substring(0, self.lastReference.innerText.length - 1);
      }
    }
    if (!isLastSentence) {
      self.interval = setInterval(() => {
        self.lastReference = reference;
        if (isEnd) {
          if (reference.innerText.substring(reference.innerText.length - 1) === '|') {
            reference.innerText = reference.innerText.substring(0, reference.innerText.length - 1);
          } else if (reference.innerText.substring(reference.innerText.length - 1) !== '|') {
            reference.innerText = reference.innerText + '|';
          }
        } else {
          if (reference.innerText === '|') {
            reference.innerText = '';
          } else if (reference.innerText === '') {
            reference.innerText = '|';
          }
        }
      }, blinkSpeed);
    }
  }, ttw * nextLetterTime);
  this.timeoutList.push(nextTimeOut);
}

```
![](https://media.giphy.com/media/ZUyfp4MH7dzwc/giphy.gif)

`loadCursorBlink()` takes in 4 args. A reference to the wrapping div, time to wait , end of the sentence and if it is a last sentence.
* `setTimeout` for this method hold the time after which the blink appears and disappears.
* `nextTimeout` holds the currently triggered timeout which triggers after the required time elapses.And it is pushed into`this.timeoutList` to be able to clear later.
  * Here we clear any previous interval if present &`self.lastReference` stores last shown sentence's reference, we remove the '|' symbol before creating a new interval.
* If it is not the last sentence then we initiate the interval to create a blink as per given`blinkSpeed`.
* We handle blink at End of all letters in a sentence and the beginning of the first letter in the sentence.

```js

componentWillUnmount() {
  this.clearAllTimeoutsAndIntervals()
}

clearAllTimeoutsAndIntervals() {
  if (this.timeoutList) {
    this.timeoutList.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }
  clearInterval(this.interval);
}
```

`clearAllTimeoutsAndIntervals()` helps in clearing all interval if the component if it is unmounted before all triggered timeouts get initiated.

View the entire code [here](https://gist.github.com/dhilipkmr/b3a13a5e9a3f8010dea98e71d425fcd1)

Follow me at [LinkedIn](https://linkedin.com/in/dhilipkmr/) and [twitter](https://twitter.com/dhilipkmr_)

##Thats All Folks!!!
