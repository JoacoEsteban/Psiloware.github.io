import React from 'react'
import '../css/App.css'
import {nineDigitColor} from '../scripts/nineDigitColor';

const ColorView = ({color}) =>
{
    var back = nineDigitColor.newColorRGBString(color);
    var front = nineDigitColor.newColorRGBString(nineDigitColor.invertColor(color));

 return(

        <span className='color-view hover-transform' style={{background: back, borderColor: front}}
        >
        
            <div  style={{background: front}} />

        </span>
    )
}



export default ColorView;