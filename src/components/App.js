import React, {useState} from 'react';
import '../css/App.css';
import {nineDigitColor} from '../scripts/nineDigitColor';

//This global variable controls when the color cycling stops or keeps going
var CONTINUELOOP = false;

function App() {
  
  const [ bodyColor, setBodyColor ] = useState("#000");
  const [ titleColor, setTitleColor ] = useState("#fff");
  
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
    setBodyColor('#000');
    setTitleColor('#fff');
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

      <span id="psilowareTitle" className="title not-selectable" style={{color: titleColor}}
      onClick={setColors} 
      onMouseEnter={setColors} 
      onMouseLeave={resetColors}
      >Psiloware</span> 

      <div>
        <button className="btnPlus not-selectable"
        onMouseDown={loopColors} 
        onMouseUp={stopLoop}
        onMouseLeave={stopLoop}
        >+</button>
      </div>

    </div>
  );
}

export default App;
