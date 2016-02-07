
import React, { PropTypes } from 'react';
import SVGDrawing from 'components/SVGDrawing';
// import LoadingWrapper from "components/helpers/LoadingWrapper";

export default class Schema extends React.Component {
  render() {
    return (
      <div>
        Hello world!
        <SVGDrawing height="1000" width="1000">
          <g transform="translate(100,100)">
            <g transform="scale(2)">
              <g transform="rotate(0)">
                <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke='red' fill='none' />
              </g>
            </g>
          </g>
          <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
          <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />
        </SVGDrawing>
      </div>
    );
  }
}
