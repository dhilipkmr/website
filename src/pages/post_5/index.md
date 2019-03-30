---
path: "/creating-cyclic-carousel"
date: "2019-03-24"
title: "Creating a Cyclic Carousel"
author: "Dhilip kumar"
timeToRead: "6"
smallTitle: "Creating a Cyclic Carousel"
description: "Implementing a standalone Cyclic Carousel with the help of React Hooks"
---
<img src="cover_5.png"/>
<br/>

The latest React packages include **React Hooks** which is a new React API. Using React Hooks are super easy. If you are new to React Hooks and you need to learn the basics of React Hooks please head over to my [previous post](/introduction-to-react-hooks).

##What's a Carousel?
Carousels allow us to represent a group or a pile of related information. 
A couple of examples:
* A set of images in Travel Blogs.
* A set of offers that are available.

![](https://media.giphy.com/media/aLKXj8KO0WB8c/giphy.gif)

###What are we going to build?
Our end product looks like the below gif:

![](carousel_2.gif)

##Application Outline:
* Splashbase gives the API response for getting images [You can use the API of your Choice]
* We hit splashbase once Component Mounts.
* Once we get a response we load a Carousel.
* Carousel has a function to initiate the ability to change images automatically.
* Providing Cyclic images in the carousel (First image lies next to the last image ).
* Ability to load images out of order.

##Understanding App.js:

```js
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import axios from 'axios';

const SPLASHBASE_URL = 'http://www.splashbase.co/api/v1/images/latest';

const App = (props) => {
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    axios.get(SPLASHBASE_URL)
    .then((resp) => {
      setImgList(resp.data.images);
    }).catch((err) => {
      console.log('Unable to Fetch Image from splashbase', err);
    });
  }, []);

  return (
    <div>
      <h1>Carousel</h1>
      {imgList.length === 0 && <div>Loading...</div>}
      {imgList.length > 0 &&
        <Carousel imgList={imgList} img_width={300} img_height={300}
        visibleImages={3} duration={750}/>
      }
    </div>
  );
};

export default App;

```

* We create an App component using React Hooks.
* In line 8 we declare an imageList which is an array. It stores Splashbase's API response.
* [Line 10] :This is similar to`componentDidMount()`.Here we call the API once the component loads and we update the variable accordingly.
* At **Line 27**, we load the carousel if the list is not empty and pass some props to the`carousel` component created with React Hooks

##Stepping Into Carousels…

``` jsx
import React, {useState, useEffect, useRef} from 'react';
import './Carousel.css';

const IMG_WIDTH = 300;
const IMG_HEIGHT = 300;
const parentPad = 0;
const VISIBLEIMAGES = 3;
const DURATION = 750;

const Carousel = (props) => {
  const {imgList = [], img_width = IMG_WIDTH, img_height = IMG_HEIGHT, visibleImages = VISIBLEIMAGES, duration = DURATION, autoNext = false, timeForNext = 3000} = props;
  /* Hooks Declarations Start*/
  const [currFirstImg, setCurrFirstImg] = useState(0);
  const [actualFirst, setActualFirst] = useState('');
  const [visibleItemsProps, setVisibleItemsProps] = useState({ order: [], styles: {}});
  const currMiddleImgRef = useRef(0);
  const intervalRef = useRef(0);
  const imgDifference = useRef(1);
  const durationRef = useRef(duration);
  /* Hooks Declarations End*/
  const parentHeight = img_height + 2 * parentPad;
  const parentWidth = img_width * 3;
  const elementsInLeft = Math.ceil(visibleImages / 2);
  const elementsInRight = visibleImages - elementsInLeft;

  const loadCarousel = () => {
    return (
      <ul className="carouselWrapper" style={{ height: parentHeight + 'px', width:  parentWidth + 'px', padding: parentPad + 'px', perspective: '500px'}}>
      {
        imgList.map(({large_url, url, id}, index) => {
          const dn = visibleItemsProps.order.indexOf(index) === -1; // To not to show images that are out of visibility scope
          const styles = visibleItemsProps[index] ? visibleItemsProps[index].styles: {};
          return (
            <li key={id} className={'imgWrap ' + (dn ? 'dn': '')} style={{...styles, position: 'absolute', transition: `all ${durationRef.current}ms linear `}} onClick={(e) => { changeCenter({e, index, large_url})} }>
              <img src={url} alt={'img_' + id } width={img_width} height={img_height}/>
            </li>
          )
        })
      }
      </ul>
    );
  };

  return (
    <React.Fragment>
      {loadCarousel()}
    </React.Fragment>
  );
}
export default Carousel;
```

In the above section, we have created a render method and have defined a method to loadCarousels.

##Understanding the declared variables.
* [Line 4- 8] Fallback constant values if the user does not specify the values for the properties.
* [Line 11] : `imgList` - List of image passed from parent. Then, we add the Width and height of the image. Number of images that are visible.'autoNext' -To automatically go to next image if`timeForNext` milliseconds elapsed.
* `currFirstImg` -Indicates the Current Middle Element/Primary element of our carousel
* `actualFirst` -If the Clicked Image is not the Immediate Next or Immediate Previous Image. As we make all the intermediate images as`currFirstImg` for some amount of time to create a carousel effect, need to store this. That creates a weird and unpleasant animation to the user , if we miss doing this.
* `visibleItemsProps` -Set Styles and ordering to Images currently visible. This is where we set opacity, coordinates of each image.
* `currMiddleImgRef` -Reference for the image that is in the middle. We need a ref to current Middle image because once we set the timer the updated state variables won't be accessible inside settimeout.[Mainly to handle out of order image clicks]
* `intervalRef` -Reference to`setTimeInterval`.For Removing the previous setTimeInterval from within/ before initiating new interval.
* `imgDifference` - The difference between the middle image and the image that is clicked by the user to view next
* `durationRef` - Animation Duration, it should be changed and split evenly among the skipped images when the image clicked by the user is not immediately next/prev
* `parentHeight` - To help in avoiding overlap. Positioning images absolutely cause overlap with Carousel Component's siblings.
* `parentWidth` - To have thrice the width of an individual image.[A personal preference]
* `elementsInLeft` -Doing Floor to also include a middle image along with other images to its left.

##loadCarousel:
This renders the JSX on the screen. It is interesting to see that the code to render the carousel is very less but under the hood loads of logics are there.
We add transition property to`<li>` element to create the animation.
We iterate through each image item in`imgList` and see if they are supposed to be visible in the screen by checking if they are in the **order** property of`visibleItemsProps`. **order** holds the order in which images should appear in the screen.

##Carousel Static Css:

``` css
.carouselWrapper{
  position: relative;
  overflow: hidden;
  margin: auto;
  box-sizing: border-box;
}

.imgWrap {
  position: 'absolute';
  top: 0;
  left: 0;
}
.imgWrap:hover {
  cursor: pointer;
}

li {
  list-style-type: none;
}
.dn {
  display: none;
}
```

While rendering our components, these are some of the classes that we should use. Positioning Images as`absolute` to make them lie relative to their`relative` parent.


##Effects:

``` js
useEffect(() => {
    clearInterval(intervalRef.current);
    if (actualFirst !== '') {
      intervalRef.current = setInterval(() => {
        if (actualFirst !== '' && actualFirst !== currMiddleImgRef.current) { // If the currentimage in middle is not actually clicked image then gotoNext image
          cycleToNextImage(actualFirst);
        } else if (actualFirst !== '' && actualFirst === currMiddleImgRef.current){
          setActualFirst('');
          imgDifference.current = 1;
          clearInterval(intervalRef.current); // If actual clicked and middle image are same we are all set to clear intervals, as they are unnecessary now
        }
      }, durationRef.current - 100);  // Introduced an advance of 100ms to begin bringing nextimage to middle before the previous one settles down else it looks jerky
    }
  }, [actualFirst]);


  useEffect(() => {
    constructVisibleItemsProps(); // This constructs all css properties to the elements in visibility
    currMiddleImgRef.current = currFirstImg;  // Need to set it here as well so while accessing inside interval it will have the latest value
  }, [currFirstImg]);

  useEffect(() => {
    if (autoNext) {
      setInterval(() => {
        const nextImg = currMiddleImgRef.current + 1 < imgList.length ?  currMiddleImgRef.current + 1 : 0;
        setCurrFirstImg(nextImg);
      }, timeForNext);
    }
  }, []);
  ```

##Effect 1:
* On every change to`actualFirst` state value Hooks gets fired.`actualFirst` is set when there is out of order click.We will be handling it through`timeinterval`. It allows all intermediate images to come into middle in the once, to avoid the cycling look jerky.
* If the actually the clicked image is not the`currentimage` in middle`gotoNext` image function is called.
* [Line 7] : When the actual clicked and middle image is the same we are all set to clear intervals, as they are unnecessary now.[Line 7]
* To begin **bringing the next image** to the middle before the previous one settles down, an advance of **100ms** has been introduced. It looks jerky otherwise.[Line 21]

##Effect 2:
* `constructVisibleItemsProps()` : This constructs all CSS properties to the elements in visibility.We need to do it whenever the image at center changes.
* [line 19]: Need to change the ref for the current image, so while accessing it inside interval it will have the latest value.

> ***NOTE:*** *Variable binding with async methods like timeout, interval behaves differently in Hooks. It always is bound with values that the component has at the time of initiating setTimeout/setInterval. But this does not hold true for refs. That is why we use refs to get the current image while we are inside the timer.*

##Effect 3:
An interval is set to iterate through images automatically for the given interval(`timeForNext`) if the`autoNext` property is enabled.

###Understanding how changing the center and image cycling works:

``` js
const changeCenter = ({event, index, large_url }) => {
    const currFirstImgIndex = visibleItemsProps.order.indexOf(currFirstImg);
    const prevIndex = visibleItemsProps.order[currFirstImgIndex - 1];
    const nextIndex = visibleItemsProps.order[currFirstImgIndex + 1];
    if (index !== currFirstImg) {
      if (index === prevIndex || index === nextIndex) {
        setCurrFirstImg(index);
      } else {
        const val = currFirstImgIndex - visibleItemsProps.order.indexOf(index);
        imgDifference.current = Math.abs(val);
        setActualFirst(index);
        cycleToNextImage(index);
      }
    } else {
      window.open(large_url);
    }
  }

  const cycleToNextImage = (actual) => {
    if (visibleItemsProps.order.indexOf(currMiddleImgRef.current) > visibleItemsProps.order.indexOf(actual)) {  // Right side image click
      currMiddleImgRef.current = currMiddleImgRef.current - 1 > -1 ? currMiddleImgRef.current - 1 : imgList.length - 1; // Right side image click
      setCurrFirstImg(currMiddleImgRef.current);
    } else {  // Left side image click
      currMiddleImgRef.current = (currMiddleImgRef.current + 1) < imgList.length ?  (currMiddleImgRef.current + 1) : 0; // Conditions to handle cycle
      setCurrFirstImg(currMiddleImgRef.current);
    }
  }

```

##changeCenter:
###On clicking the image, execution of changeCenter begins
Checking if the clicked item is immediately next/prev item. Because to induce a carousel effect we need to make the images move in sequence.
That won't be an issue if the clicked image lies next/previous to the current image. But in other cases where the user clicks out of order like while viewing image 1 he can click on image 5, in that case, we should handle it in such a way that cycle won't break.
Each image should come to the middle before the actually clicked image.
[Line 6]: Set the image index to clicked image's index if there is a change in image index and if they are immediate previous or next.
[Line 9]: If it is not the subsequent image, then set the actual image clicked index to`setActualFirst` state value. Then change the middleImage to immediate next or previous image based on which side of the primary image he clicked. Then change CSS props and render it. Till the **actual clicked image** value and **image in the middle** are the same, it goes on. Hooks effect associated with`setActualFirst` fires when`setActualFirst` changes
[Line 16]: Place a callback, on clicking the middle image.

##Constructing Visible Items' Props:

``` js
const constructVisibleItemsProps = () => {
  const visibleItemsProps = {}; // To store config for items that are visibile in the carousel
  visibleItemsProps.order = [];
  let curr_center = currFirstImg; // Storing the Current Middle element in focus
  let timesToIterate = 0; // To iterate through all visible number of images.
  let zIndex = - elementsInRight; // We start from left to right and Zindex has to keep on increasing till middle then has to reduce.
  let xTranslate = img_width; // To move the element with respect to x axis
  let zTranslate = 0; // To reduce image size for images apart from center
  let opacity = 1;
  const division = (img_width * (1.66 / elementsInLeft)); // Specifies the length that next image has to move away from with resoect to current image (1.6 times the current image)
  let opacityDivider = (0.7 / elementsInRight); // minimum opacity should be 0.3 (1-0.7)
  let rightEltCount = elementsInRight;
  let leftEltCount = elementsInLeft; // including middle element
  let curr_center_copy = curr_center;

  while(timesToIterate < visibleImages ) {
    const styles = {};
    let currImgIndex;
    let currImgIndexOnRight = true; // Tells if in this iteration the currently iterated image lies left to the middle image or not
    // To set properties for elements in right side
    if (timesToIterate < elementsInRight) {
      const nextIndex = curr_center - (rightEltCount);
      currImgIndex = nextIndex > -1 ? nextIndex : imgList.length - Math.abs(nextIndex); // Gives the rightmost elemnt in first iteration and then the subsequent elements down the iteration
      opacity = 1 - (opacityDivider * rightEltCount); // To assign lowest opacity to last element and increaing it till we come to middle
      zTranslate =  -division * rightEltCount;  // To increase the size of the images subsequently from last to middle
      xTranslate = img_width - (division * rightEltCount);  // X coordinate position
      rightEltCount--;
    } else {  // To set properties for elements in center and to left of it. All props behaves similar to right
      currImgIndexOnRight = false;
      currImgIndex = curr_center_copy;  
      if (curr_center_copy + 1 >= imgList.length) { // to maintain cyclic carousel
        curr_center_copy = 0;
      } else {
        curr_center_copy++;
      }
      opacity = 1 - (opacityDivider * Math.abs(leftEltCount - (timesToIterate + 1)));
      zTranslate =  - division * Math.abs(leftEltCount - (timesToIterate + 1));
      xTranslate = img_width + division * Math.abs(leftEltCount - (timesToIterate + 1));
    }
    // Assigning above calculated values to 'styles' object
    styles.transform =  'translateX(' + xTranslate + 'px) translateZ(' +  zTranslate + 'px)';
    styles.opacity = opacity;
    styles.zIndex = currImgIndexOnRight ? zIndex++ : zIndex --; // To reduce zIndex while going through left elements
    visibleItemsProps.order.push(currImgIndex); // Push the current image number in the orders array
    visibleItemsProps[currImgIndex] = { styles }; // pushing all previously created styles
    timesToIterate++;
  }
  durationRef.current = actualFirst === '' ? duration : ((duration / imgDifference.current)); // duration will be user given if he clicks next image or we divide the duration by number of images skipped
  setVisibleItemsProps(visibleItemsProps); // setting state for visible items
}
  ```

##Declaration Meaning:
* `visibleItemsProps` - To store config for items that are visible in the carousel
* `curr_center` - Storing the Current Middle element in focus.
* `timesToIterate`- To iterate through all visible number of images.
* `zIndex` - We start from left to right and zIndex has to keep on increasing till middle then has to reduce.
* `xTranslate` - To move the element with respect to x axis
* `zTranslate` - To reduce image size for images apart from center
* `division` - Specifies the length that next image has to move away from with respect to current image (1.6 times the current image).
* `opacityDivider` - minimum opacity should be 0.3 (1–0.7)
* `leftEltCount` - including middle element

![](https://media.giphy.com/media/gS2l5jPcE0F4A/giphy.gif)

##Iteration:
* The first`if` condition is to handle elements in the right side of the Middle image.
* `currImgIndex` - Image index of right element.
* There we calculate its opacity in increasing fashion. 
* `xTranslate` with respect to the image in the middle.
* `zTranslate` to increase the size of the image from lowest to maximum till center and back to small again.

Similarly, we do it for elements on the left side.
Assigned a value to`durationRef.current`. If the next image is clicked by the user, the`duration.current`'s value will be user given time. If not, we divide the duration by the number of images skipped. Then, we set the`visibleItemsProps` and the component re-renders.
Check out my code at [GitHub.](https://github.com/dhilipkmr/carousels)
##THAT'S ALL FOLKS!!!
![](https://media.giphy.com/media/113PoJxEaRxKbm/giphy.gif)
