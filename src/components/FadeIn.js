import React from 'react';

export default class FadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
    return (
      <div ref="wrap" className={'fadeInWrap ' + (hasStyleInfo ? '' :'vh')} style={{ height: wrapHeight + 'px'}}>
        <div ref="fadeInWord" className={'fadeInWord ' + compClass} style={{transform: `translateY(${wrapHeight}px)`, ...style}}>
          {children}
        </div>
      </div>
    );
  }
}