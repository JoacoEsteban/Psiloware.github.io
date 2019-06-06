import React, {useState} from 'react';

import ColorView from './ColorView'
import {nineDigitColor} from '../scripts/nineDigitColor';

import '../css/App.css';
import LoopIcon from '../svg-icons/loop'
import SaveIcon from '../svg-icons/save'
import DeleteIcon from '../svg-icons/delete'
import AddIcon from '../svg-icons/add'



//----------------Variables and Data-----------------//
var CONTINUE_LOOP = false; //This global variable controls if the color cycling or keeps going or stops
var IS_KEPT = false; //TRUE == maintains the colors | FALSE == the colors can be set back to default
var CURRENT_COLOR = JSON.parse(localStorage.getItem("CurrentColor")); //Stores the current color of the body in ARRAY OF NUMBERS format **NOT STRING**
var COLOR_INDEX = -1; //Keeps the current color index position in the colorArray **for ƒ(deleteColor)**

var IS_DELETABLE = false; //Controls wether the CURRENT_COLOR is deletable or not. Depends on if it's already inside the colorArray
var IS_ADDABLE = false; //Controls wether the CURRENT_COLOR is Addable to the colorArray or not. Depends on if it's already inside the colorArray


//sets default colors for ƒ(resetColors)
const BODY_COLOR = '#111';
const TITLE_COLOR = '#555';



//Loads colorlist from LocalStorage
const colorListFromLocalStorage = JSON.parse(localStorage.getItem("ColorList")) === null ? []: JSON.parse(localStorage.getItem("ColorList"));

function App() 
{
  
  //If CURRENT_COLOR was saved in a previous session it restores it to the page
  const [ bodyColor, setBodyColor ] = useState(CURRENT_COLOR ? nineDigitColor.newColorRGBString(CURRENT_COLOR) : BODY_COLOR);
  const [ titleColor, setTitleColor ] = useState(CURRENT_COLOR ? nineDigitColor.newColorRGBString(nineDigitColor.invertColor(CURRENT_COLOR)) : TITLE_COLOR);
  const [ colorArray, setColorArray ] = useState(colorListFromLocalStorage);
  
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
                    
                    onMouseEnter={()=> setColorsHandler(i)}
                    onMouseLeave={resetColors}
                    onClick={() => IS_KEPT = true}
                    
                    onTouchStart={()=> setColorsHandler(color)}
                    > 


                      < ColorView color={color}  />

                     </span>
                  )
              })}
          </div>
      )
  }

  function setColors(color, mode)
  {
    switch(mode)
    {
      case 1:
        setBodyColor(nineDigitColor.newColorRGBString(color));
        break;

      case 2:
        setTitleColor(nineDigitColor.newColorRGBString(color));
        break;

      default:
        setBodyColor(nineDigitColor.newColorRGBString(color));
        setTitleColor(nineDigitColor.newColorRGBString(nineDigitColor.invertColor(color)));
        break;
    }
  }
  
  //sets both the title and body colors
  function setColorsHandler(index)
  {
    if(index >= 0 ) //Sets an already existent color inside the array
    {
      //sets the color passed form parameters
      setColors(colorArray[index]);
      
      CURRENT_COLOR = colorArray[index];
      COLOR_INDEX = index;

      IS_ADDABLE = false;
      IS_DELETABLE = true;
      
    }else
    {
      //sets new color
      CURRENT_COLOR = nineDigitColor.newColorRGB();
      setColors(CURRENT_COLOR);

      //Forces resetColor execution when hovering out
      IS_KEPT=false;

      IS_ADDABLE = true;
      IS_DELETABLE = false;
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
      COLOR_INDEX = -1;

      IS_ADDABLE = false;
      IS_DELETABLE = false;

    }
  }

  function loopColors()
  {
    //Sets the variable to true so it keeps the interval going
    CONTINUE_LOOP = true;
    setColorsHandler();
    
    var colorInterval = setInterval(() => 
    {
      if(CONTINUE_LOOP)
      {
        setColorsHandler();
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
      if(IS_ADDABLE)
      {
        //Copies the state into a new var in order to use the push function
        var lista = colorArray.map(element => element );
        lista.push( CURRENT_COLOR );
        
        //then sets the state
        setColorArray(lista);

        COLOR_INDEX = lista.length - 1; //Updates the COLOR_INDEX
        IS_ADDABLE = false; //prevents addition
        IS_DELETABLE = true; //enables deletion
      }

  }
  
  function deleteColor()
  {
    if(IS_DELETABLE)
    {
      //Copies the state into a new filtered array without the deleted color
      var lista = colorArray.filter((element, i) => {
        return i !== COLOR_INDEX;
      } );
      
      //then sets the state
      setColorArray(lista);
      COLOR_INDEX = -1;
      IS_ADDABLE = true; //Enables addition so it works like an "undo"


    }
  }






function saveToLocalStorage()
{
  localStorage.setItem("ColorList", JSON.stringify(colorArray));
  localStorage.setItem("CurrentColor", JSON.stringify(CURRENT_COLOR));
}






//----------------Component-----------------//


  return (
    <div className="master-container">

      <span
        className="not-selectable title hover-transform" 
        style={{color: titleColor}}
        
        onMouseDown={()=> IS_KEPT = true} 
        onMouseEnter={()=>setColorsHandler(-1)}
        onMouseLeave={resetColors}

        onTouchStart={()=>setColorsHandler(-1)}  
        onTouchEnd={resetColors}>
          Psiloware
      </span> 

      <div>
        <div
        className="not-selectable icon-container hover-transform"
        
        onMouseDown={loopColors} 
        onMouseUp={stopLoop}
        onMouseLeave={stopLoop}
        
        onTouchStart={loopColors} 
        onTouchEnd={stopLoop}
        >
          <LoopIcon iconColor={titleColor} />
        </div>

        <div 
        className="not-selectable icon-container hover-transform"
        >
          <AddIcon iconColor={titleColor} onClick={addColor}/>
        </div>


        <div 
        className="not-selectable icon-container hover-transform"
        >
          <DeleteIcon iconColor={titleColor} onClick={deleteColor}/>
        </div>

        <div 
        className="not-selectable icon-container hover-transform"
        >
          <SaveIcon iconColor={titleColor} onClick={saveToLocalStorage}/>
        </div>


      </div>

        <ColorList colorList={colorArray}/>

    </div>
  );
}

export default App;
