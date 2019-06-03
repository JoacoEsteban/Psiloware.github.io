import React, {useState} from 'react';

import ColorList from './ColorList'
import {nineDigitColor} from '../scripts/nineDigitColor';

import '../css/App.css';
import LoopIcon from '../svg-icons/loop'
import Tick from '../svg-icons/tick'



//----------------Variables and Data-----------------//
//This global variable controls when the color cycling stops or keeps going
var CONTINUE_LOOP = false;
var IS_KEPT = false;

//sets default colors for (ƒ resetColors)
const BODY_COLOR = '#111';
const TITLE_COLOR = '#555';

var NEW_COLOR = BODY_COLOR;

function App() {
  
  const [ bodyColor, setBodyColor ] = useState(BODY_COLOR);
  const [ titleColor, setTitleColor ] = useState(TITLE_COLOR);
  
  // when the state gets updated (aka new color is set), it rerenders again with the new color
  document.body.style.background = bodyColor;
  
//----------------Functions-----------------//


  //sets both the title and body colors
  function setColors()
  {
    if(IS_KEPT){IS_KEPT=false;}
    NEW_COLOR = nineDigitColor.newColorRGB('new');
    setBodyColor(nineDigitColor.newColorRGBString(NEW_COLOR));
    setTitleColor(nineDigitColor.newColorRGBString(nineDigitColor.invertColor(NEW_COLOR)));
  }
  
  function resetColors()
  {
    if(!IS_KEPT)
    {
      // NEW_COLOR=nineDigitColor.newColorRGB();
      setBodyColor(BODY_COLOR);
      setTitleColor(TITLE_COLOR);

    }
  }

  function loopColors()
  {
    //Sets the variable to true so it keeps the interval going
    CONTINUE_LOOP = true;
    setColors();
    
    var colorInterval = setInterval(() => 
    {
      if(CONTINUE_LOOP)
      {
        setColors();
      }else //clears the interval from the inside
      { clearInterval(colorInterval); resetColors(); }

    }, 270);
  }

  function stopLoop()
  {
    CONTINUE_LOOP = false; resetColors();
  }



//----------------Component-----------------//


  return (
    <div className="master-container">

      <span
        className="not-selectable title hover-transform" 
        style={{color: titleColor}}
        
        onMouseDown={()=> IS_KEPT = true} 
        onMouseEnter={setColors} 
        onMouseLeave={resetColors}

        onTouchStart={setColors}  
        onTouchEnd={resetColors}>
          Psiloware
      </span> 

      <div>
        <div
        style={{ border: 0, display:'inline-block', margin: 0, padding: 0, background: 'none',}}
        className="not-selectable loop-icon-container hover-transform"
        
        onMouseDown={loopColors} 
        onMouseUp={stopLoop}
        onMouseLeave={stopLoop}
        
        onTouchStart={loopColors} 
        onTouchEnd={stopLoop}
        >
          <LoopIcon iconColor={titleColor} />
        </div>
      </div>

        <ColorList color={NEW_COLOR}/>

    </div>
  );
}

export default App;
