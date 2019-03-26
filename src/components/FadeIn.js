import React from 'react';

export default class FadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapHeight: '',
      hasStyleInfo: false
    };
  }

  componentDidMount() {
    const wrapHeight = this.refs.fadeInWord.getBoundingClientRect().height + 10;
    this.setState({
      hasStyleInfo: true,
      wrapHeight: wrapHeight
    });
  }

  render() {
    const {children, className:compClass = '', style} = this.props;
    const {wrapHeight, hasStyleInfo} = this.state;
    let transformStyle = {};
    if (wrapHeight) {
      transformStyle = {
        top: `${wrapHeight}px`
      }
    }
    return (
      <div ref="wrap" className={'padT10 textcenter inline oh fadeInWrap ' + (hasStyleInfo ? '' :' op0')}>
        <div ref="fadeInWord" className={'fadeInWord ' + compClass + (hasStyleInfo ? ' keyFrameAnimator' : '')} style={{...transformStyle, ...style}}>
          {children}
        </div>
      </div>
    );
  }
}