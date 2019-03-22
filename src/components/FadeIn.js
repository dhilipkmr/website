import React from 'react';

export default class FadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapHeight: props.wrapHeight ? props.wrapHeight: ''
    };
  }

  componentDidMount() {
    const wrapHeight = this.refs.fadeInWord.getBoundingClientRect().height;
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
        transform: `translateY(${wrapHeight}px)`
      }
    }
    return (
      <div ref="wrap" className={'fadeInWrap ' + (hasStyleInfo ? '' :'vh')} style={{ height: wrapHeight ? (wrapHeight + 'px') : 'auto'}}>
        <div ref="fadeInWord" className={'fadeInWord ' + compClass} style={{...transformStyle, ...style}}>
          {children}
        </div>
      </div>
    );
  }
}