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
//Stores the current color of the body in NUMBER format **NOT STRING**
var CURRENT_COLOR;

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
  const [ colorArray, setColorArray ] = useState(listaDeColores);
  
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
                     <span 
                    style={{display:'contents'}} key={i} 
                    
                    onMouseEnter={()=> setColors(color)}
                    onMouseLeave={resetColors}
                    onClick={() => IS_KEPT = true}
                    
                    onTouchStart={()=> setColors(color)}
                    > 


                      < ColorView color={color}  />

                     </span>
                  )
              })}
          </div>
      )
  }
  
  //sets both the title and body colors
  function setColors(color)
  {

    if(IS_KEPT)
    {
      //Forces resetColor execution when hovering out
      IS_KEPT=false;
      //Clears previous color var
      CURRENT_COLOR = null;
    }

    
    if(color)
    {
      //sets the color passed form parameters
      setBodyColor(nineDigitColor.newColorRGBString(color));
      setTitleColor(nineDigitColor.newColorRGBString(nineDigitColor.invertColor(color)));
      
    }else
    {
      //sets new color
      CURRENT_COLOR = nineDigitColor.newColorRGB();
      setBodyColor(nineDigitColor.newColorRGBString(CURRENT_COLOR));
      setTitleColor(nineDigitColor.newColorRGBString(nineDigitColor.invertColor(CURRENT_COLOR)));
    }

    
  }
  

  function resetColors()
  {
    //executes only if the color is not being kept
    if(!IS_KEPT)
    {
      setBodyColor(BODY_COLOR);
      setTitleColor(TITLE_COLOR);

      CURRENT_COLOR = null;

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
      { clearInterval(colorInterval);}

    }, 270);
  }

  function stopLoop()
  {
    CONTINUE_LOOP = false;
  }


  function addColor()
  {
    if(CURRENT_COLOR)
    {
      //Copies the state into a new var in order to use the push function
      var lista = colorArray.map(element => element );;
      
      lista.push( CURRENT_COLOR );
      
      //then sets the state
      setColorArray(lista);
    }
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
          <SaveIcon iconColor={titleColor} onClick={addColor}/>
        </div>


      </div>

        <ColorList colorList={colorArray}/>

    </div>
  );
}

export default App;
