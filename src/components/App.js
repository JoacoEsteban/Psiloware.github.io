import React, {useState} from 'react';
import '../css/App.css';
import {nineDigitColor} from '../scripts/nineDigitColor';

//----------------Variables and Data-----------------//
//This global variable controls when the color cycling stops or keeps going
var CONTINUELOOP = false;

//sets default colors for (ƒ resetColors)
const BODY_COLOR = '#111';
const TITLE_COLOR = '#555';

function App() {
  
  const [ bodyColor, setBodyColor ] = useState(BODY_COLOR);
  const [ titleColor, setTitleColor ] = useState(TITLE_COLOR);
  
  // when the state gets updated (aka new color is set), it rerenders again with the new color
  document.body.style.background = bodyColor;
  
//----------------Functions-----------------//


  //sets both the title and body colors
  function setColors()
  {
    var newColor = nineDigitColor.newColorRGB('new');
    setBodyColor(nineDigitColor.newColorRGBString(newColor));
    setTitleColor(nineDigitColor.newColorRGBString(nineDigitColor.invertColor(newColor)));
  }
  
  function resetColors()
  {
    setBodyColor(BODY_COLOR);
    setTitleColor(TITLE_COLOR);
  }

  function loopColors()
  {
    //Sets the variable to true so it keeps the interval going
    CONTINUELOOP = true;
    setColors();
    
    var colorInterval = setInterval(() => 
    {
      if(CONTINUELOOP)
      {
        setColors();
      }else //clears the interval from the inside
      { clearInterval(colorInterval); resetColors(); }

    }, 270);
  }

  function stopLoop()
  {
    CONTINUELOOP = false; resetColors();
  }
  


//----------------Component-----------------//


  return (
    <div className="master-container">

      <span className="title not-selectable" style={{color: titleColor}}
      onClick={setColors} 
      onMouseEnter={setColors} 
      onMouseLeave={resetColors}
      >Psiloware</span> 

      <div>
        <button className="btnPlus not-selectable"
        onMouseDown={loopColors} 
        onMouseUp={stopLoop}
        onMouseLeave={stopLoop}
        
        onTouchStart={loopColors} 
        onTouchEnd={stopLoop}

        style={{color: bodyColor, background: titleColor}}
        ><i class="fas fa-plus"></i></button>
      </div>

    </div>
  );
}

export default App;
