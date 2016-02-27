
import React           from 'react';

export default class MySVG extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <svg
          {...this.props}
          >
          <rect x='0' y='0' width='100%' height='100%' fill='white' stroke='none'/>
          {this.props.children}
        </svg>
      </div>
    );
  }
}

MySVG.propTypes = {
  title:     React.PropTypes.string,
  height:    React.PropTypes.number,
  width:     React.PropTypes.number,
  children:  React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};