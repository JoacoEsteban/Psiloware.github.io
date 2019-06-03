import React from 'react'
import '../css/ColorList.css'
import {nineDigitColor} from '../scripts/nineDigitColor';
import Tick from '../svg-icons/tick'

const ColorView = ({color}) =>
{
    var back = nineDigitColor.newColorRGBString(color);
    var front = nineDigitColor.newColorRGBString(nineDigitColor.invertColor(color));

 return(

        <span className='color-view hover-transform' style={{background: back, borderColor: front}}>
        
            <div  style={{background: front}} />

        </span>
    )
}

const ColorList = ({color}) =>
{
    return(
        <div className='center-children'>
            <ColorView color={color} />
        </div>
    )
}

export default ColorList;