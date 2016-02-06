
import React from 'react';

export default React.createClass({
  render: function() {
    return <svg {...this.props}>{this.props.children}</svg>;
  }
});
