import React, {useState} from 'react';

import ColorView from './ColorView'
import {nineDigitColor} from '../scripts/nineDigitColor';

import '../css/App.css';
import LoopIcon from '../svg-icons/loop'
import SaveIcon from '../svg-icons/save'



//----------------Variables and Data-----------------//
//This global variable controls when the color cycling stops or keeps going
var CONTINUE_LOOP = false;
//Toggles color so it wont reset back to default
var IS_KEPT = false;

//sets default colors for (ƒ resetColors)
const BODY_COLOR = '#111';
const TITLE_COLOR = '#555';




const listaDeColores = [
  nineDigitColor.newColorRGB(), 
  nineDigitColor.newColorRGB(), 
  nineDigitColor.newColorRGB(), 
  nineDigitColor.newColorRGB(), 
  nineDigitColor.newColorRGB(), 
  nineDigitColor.newColorRGB(), 
  nineDigitColor.newColorRGB(), 
];





function App() 
{
  
  const [ bodyColor, setBodyColor ] = useState(BODY_COLOR);
  const [ titleColor, setTitleColor ] = useState(TITLE_COLOR);
  
  // when the state gets updated (aka new color is set), it rerenders again with the new color
  document.body.style.background = bodyColor;
  
  //----------------Functions-----------------//
  
  const ColorList = ({colorList}) =>
  {
      return(
          <div className='center-children' style={{margin:'2vmax'}}>
              {colorList.map( (color, i) =>
              {
                  return (
                     <span key={i} onClick={()=> setColors(color)}> < ColorView color={color}  /> </span>
                  )
              })}
          </div>
      )
  }
  
  //sets both the title and body colors
  function setColors(color)
  {
    if(IS_KEPT){IS_KEPT=false;}

    if(color === null){color=null};
    
    if(color)
    {
      console.log('hola',color);

      setBodyColor(nineDigitColor.newColorRGBString(color));
      setTitleColor(nineDigitColor.newColorRGBString(nineDigitColor.invertColor(color)));
      
    }else{

      
      
      var newColor = nineDigitColor.newColorRGB('new');
      setBodyColor(nineDigitColor.newColorRGBString(newColor));
      setTitleColor(nineDigitColor.newColorRGBString(nineDigitColor.invertColor(newColor)));
    }

    
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
        onMouseEnter={()=>setColors(null)}
        onMouseLeave={resetColors}

        onTouchStart={()=>setColors(null)}  
        onTouchEnd={resetColors}>
          Psiloware
      </span> 

      <div>
        <div
        className="not-selectable loop-icon-container hover-transform"
        
        onMouseDown={loopColors} 
        onMouseUp={stopLoop}
        onMouseLeave={stopLoop}
        
        onTouchStart={loopColors} 
        onTouchEnd={stopLoop}
        >
          <LoopIcon iconColor={titleColor} />
        </div>

        <div 
        className="not-selectable loop-icon-container hover-transform"
        >
          <SaveIcon iconColor={titleColor} />
        </div>


      </div>

        <ColorList colorList={listaDeColores}/>

    </div>
  );
}

export default App;
