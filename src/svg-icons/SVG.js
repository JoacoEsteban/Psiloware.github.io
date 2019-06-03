import React from "react";

const SVG = (props, {
  style = {
    background: 'none',
    fill: props.iconColor,
    className: 'loop-icon not-selectable',
  }
}) => (
<svg 
    style={style}
    className={style.className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
>
        <path className="not-selectable" d={props.path} />
</svg>
);

export default SVG;
