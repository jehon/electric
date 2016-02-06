
import React, { PropTypes } from 'react';
import SVGDrawing from 'components/SVGDrawing';

import OrientedPoint from 'helpers/OrientedPoint';

// import * as B from "react-bootstrap";

// import LoadingWrapper from "components/helpers/LoadingWrapper";

export default class Schema extends React.Component {
  render() {
    var src = new OrientedPoint(100, 100, 'N', 1);

    return (
      <div>
        Hello world!
        <SVGDrawing height="1000" width="1000">
          <g transform="translate(100,100)">
            <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke='red' fill='none' />
          </g>
          <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
          <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />
        </SVGDrawing>
      </div>
    );
  }
}

/*
          <circle fill="none" stroke="black" cx={src.x()} cy={src.y()} r={20*1} from="25" to="50"/>
          <line x1={src.x()} y1={src.y()} x2={src.away(10, 10).x()} y2={src.away(10, 10).y()} strokeWidth="5" stroke="orange"/>


A rx ry x-axis-rotation large-arc-flag sweep-flag x y

besoins par objects:
- width
- height
- draw
- name

to draw it:
- list of known elements
- find the correct element in it
- call draw, width, height

ex: block, plug, light, ...

==> class? => plus robuste dans la durée? (besoin des templates alors pour avoir plus facile)
==> components => plus facile à écrire?

décision: class!!!

*/
