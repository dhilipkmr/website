import React from 'react';
import PropTypes from 'prop-types';

class CursorImitator extends React.Component {
  static defaultProps = {
    content: '',
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
      } else {
        
      }
    }, ttw * nextLetterTime);
    this.timeoutList.push(nextTimeOut);
  }

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
      this.timeout = setTimeout(() => {
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
      if (index === sentenceLength - 1) {   // To clear it all at once if required
        /* To create a Blink at the End of every Sentence */
        this.loadCursorBlink(this.refs[reference], this.ttw, true, isLastSentence);
        this.ttw = this.ttw + (waitAtEnd / nextLetterTime);
      }
    })
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


CursorImitator.propTypes = {
  content: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object
};

export default CursorImitator;
