---
path: "/ripple-effect"
date: "2019-01-23"
title: "Ripple Effect"
author: "Dhilip kumar"
timeToRead: "5"
description: "Creating an Independent Component that produces Ripple Effect using React"
---
Ripple effect is becoming an interesting topic in recent days. Although there are libraries like [material-ui](https://material-ui.com/) which helps in achieving this behaviour, it is important for us to understand how we can achieve this on our own without depending on External libraries.

## What is Ripple Effect?
What happens when we throw a stone into a pool?It creates disorderliness in the pool in a pattern[Ripple] originating from the Stone’s point of contact with water.

Similarly when the user taps or clicks on a Button, Icon, Image etc., a ripple starts at the point of interaction and flows throughout the entire component and disappears eventually.

##How to Create a Ripple Effect using React Component?
First we will include the boiler plate code for Rendering a Button in React.

``` css
.btn {
  margin: 50px auto;
  border-radius: 25px;
  background-color: #5300e8;
  box-shadow: 0 2px 4px 0 #888888;
  display: inline-block;
  padding: 15px 50px;
  color: #ffffff;
}
.center {
  text-align: center;
}
```

``` jsx
class Ripple extends React.Component {
  initializeState = () => {
    return {
      spanStyles: {},
      count: 0
    }
  }
  state = this.initializeState();
  render() {
    const {children = null, classes="", onClickHandler=null} = this.props;
    return (
      <div className={classes} onClick={this.onClickHandler}>
        {children}
      </div>
    );
  }
}

const App = (
  <div className="center">
    <Ripple classes="btn">Click Me</Ripple>
  </div>
);

ReactDOM.render(App, document.getElementById("app"));
```
### Explanation:

### CssBoilerPlateRipple.css

Color and Button Alignments are done.

### JsRippleBoilerPlate.js
* [Line 2] initializeState() function which returns an object thatwill be set to a state for the first time and whenever reset is required.
* Here count refers to number of continuous clicks user made before the component could clean up the spans, once it is cleaned up the counter is reset to 0. For each click we might have to have new position based on the coordinate the user clicks so we will have a unique spanStyles value for each count.
* [Line 25] JSX App is rendered inside an Element with id ‘app’ .
* [Line 19] App is a Constant which has a component declaration(Ripple) within itself.Here we pass classes, handlers and other properties that you wish to add to the actual element that Ripple Renders.
* Ripple is a Stateful Component which returns the children by wrapping it inside a div.
At the end of it we have the following button.

## Ripple — Overview
Let us start with understanding how the Ripple HTML look like.
``` jsx
<div class="ripple">
  Click Me
  <div class="rippleContainer">
    <span><span>
  </div>
</div>
```

* [Line 2] Render all the children that we pass inside <Ripple></Ripple> from App.
* [Line 3] After rendering the children we have a div (rippleContainer) which is appended to the parent element.
* Span is created as a child to rippleContainer at the time when the user clicks on the button.
We add some css classes and animation (explained later) to this span so that we will get a Ripple Effect.
* Finally we remove the Span after the animation is done.

## Let’s Ripple :)
Updating the Render Method of Ripple Component.
``` jsx
render() {
    const {children= null, classes = "", onClickHandler = null} = this.props;
    return (
        <div ref="targetElement" className={'ripple ' + classes} onClick={onClickHandler}>
            {children}
            <div className="rippleContainer" onMouseDown={this.showRipple} onMouseUp={this.callCleanUp(this.cleanUp, 2000)}>
                {this.renderRippleSpan()}
            </div>
        </div>
    );
}
```
``` css
.ripple {
  position: relative;
  overflow: hidden;
}
.ripple .rippleContainer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

* [line 4] We add ‘ripple’ class to the parent div and assign styling making it relative and hidden overflow.
* [line 6] ‘rippleContainer’ child is appended to the ripple div with 2 events mousedown(start the ripple effect) and mouseup(trigger a timeout to remove the span).
* [Line 7] It is the function call to rendering spans(what we call Ripple :P)

NOTE: For every new Click on the element a new span child will get appended to the ‘rippleContainer’ so it is necessary to clean up the span to reduce DOM's size.

* On Assigning the css styles to the rippleContainer it overlaps its parent element completely.So any click will first reach handlers of div with ‘rippleContainer’ class followed by its parent.

On clicking the Button…

``` css
.ripple .rippleContainer span {
  transform: scale(0);
  border-radius: 100%;
  position: absolute;
  opacity: 0.75;
  background-color: #ffffff;
  animation: ripple 850ms;
}

@keyframes ripple {
  to {
    opacity: 0;
    transform: scale(2);
  }
}
```
``` jsx
showRipple = (e) => {
    const rippleContainer = e.currentTarget;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = e.pageX - pos.x - (size / 2);
    const y = e.pageY - pos.y - (size / 2);
    const spanStyles = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
    const count = this.state.count + 1;
    this.setState({
      spanStyles: {...this.state.spanStyles, [count] : spanStyles},
      count: count
    });
  }

 renderRippleSpan = () => {
    const {showRipple = false, spanStyles = {}} = this.state;
    const spanArray = Object.keys(spanStyles);
    if (spanArray && spanArray.length > 0) {
      return (
        spanArray.map((key, index) => {
          return <span key={'spanCount_' + index} className="" style={{ ...spanStyles[key]}}></span>
        })
      )
    } else {
      return null;
    }
  }
  ```

### showRippleFnc.js Explained…
* We Call showRipple(e) function when the button is clicked.
* [Line 2] currentTarget gives the element on which the handler is placed in this case the div with ‘rippleContainer’ class.
* [Line 3] Finding the width of the rippleContainer.
* [Line 4] getBoundingClientRect() is a built in function which gives the element’s position in the page (right, top, bottom, left, width, height, x and y)
* [Line 5 and 6 ] Math to calculate the point of intersection of mouse inside the Button. e.pageX and e.pageY gives the X and Y coordinates of point of contact with respect to whole page.
* [Line 7] We add the above obtained info to the spanStyles object.And we will use that style as inline style to the span element.
* [Line 8] As state update is asynchronous in React we increment the counter and make use of it to store each click’s unique styles into spanStyle property. And Finally we are setting the state.
* [Line 15] renderRippleSpan() -A fairly straight-forward function where we will render span for every styles, it is necessary because the user can click on the button simultaneously.

### showRipplecss.css Explained…
* We target the inner span, transform: scale(0) zooms in the element to 0% and we add custom animation effect and give it a name ‘ripple’ [line 7].

Defining ripple animation [Line 10]. The animation lasts for 850ms and during the course of 850ms the span’s opacity should reduce to 0 from 0.75 (helps in hiding ripple at the end of ripple effect) and zoom should increase to 200% from 0% (to makethe background color of the span visible).

## Tadaaaaaa…..!

Now we have got the ripple effect working we have to remove the span that has been created.Removing the span involves including debounce functionality to the code, because if the user makes continuous clicks even before the transition for the previous click is completed we should not delete all the spans because it will affect the span of the last clicks that are in progress.

So we wait for a specified period (say 2000ms) and if we don’t get any clicks we will go ahead with deleting the span from the DOM. Wait time should be greater than animation transition time.

``` jsx
cleanUp = () => {
  const initialState = this.initializeState();
  this.setState({ ...initialState });
}

callCleanUp = (cleanup, delay) => {
  return function() {
    clearTimeout(this.bounce);
    this.bounce = setTimeout(() => {
      cleanup();
    }, delay);
  }
}
```
* We initiate callCleanup on mouseup.
* Note: callCleanup() returns a function.Returned function gets called at the time of mouseup
* [Line 9–12] A timeout function which helps in removing the span after specified delay.
* [Line 8] Debounce.Whenever the user keeps on clicking the button we clear out the previous timeout that is set, so that it wont affect the transition in progress and once we go through ‘delay’ milliseconds without click we start removing span.
* [Line 1] cleanup() cleans resets the state back to its original state(i.e) without spans.

Find a working CodePen Example [here](https://codepen.io/dhilipkmr/pen/gqraWW)

My [Github](https://github.com/dhilipkmr) and [Linkedin](https://www.linkedin.com/in/dhilipkmr/)

## That’s all Folks!