
import React from "react";

const SVG = (props, {
  style = {
    background: 'none',
    fill: props.color,
    className: 'loop-icon not-selectable',
  }
}) => (
<svg viewBox="0 0 30 30" >
<circle cx="15" cy="15" r="15"/>
</svg>

);

export default SVG;
