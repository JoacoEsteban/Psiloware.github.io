import React, {Component} from 'react';

//Initializes the Objects form DOM
// initialize();

// const setInter = setInterval(mouseDown, 270);



const nineDigitColor = () =>
{
    //Returns an array of RGB
    newColorRGB: function()
    {
        var newColor = Math.random();
    
        //Makes substring just after decimal point
        newColor = newColor.toString().substr(2,9);
        //converts to number and applies %256 so it wont be any larger than 255
        var newColorRGB = [Number(newColor.substr(0,3)) % 256, Number(newColor.substr(3,3)) % 256, Number(newColor.substr(6,3) % 256)];

        return newColorRGB;
    },

    //Use "new" as a parameter to generate a new color
    newColorRGBString: function(colorRGB)
    {
        if(colorRGB === "new")
        {
            colorRGB = this.state.nineDigitColor.newColorRGB();
        }

        return "rgb(" + colorRGB[0].toString() + ", " + colorRGB[1].toString() + ", " + colorRGB[2].toString() + ")";

    },

    //returns the inverted color
    invertColor: function(colorRGB)
    {
        if (colorRGB === "new")
        {
            colorRGB =  this.state.nineDigitColor.newColorRGB();
        }

        return [255 - colorRGB[0], 255 - colorRGB[1], 255 - colorRGB[2]];
    },
}





// class ColorAnimation extends Component 
// {
    
//     constructor()
//     {
//         super()
//         this.state = 
//         {

//             nineDigitColor:
//             {
//                 //Returns an array of RGB
//                 newColorRGB: function()
//                 {
//                     var newColor = Math.random();
                
//                     //Makes substring just after decimal point
//                     newColor = newColor.toString().substr(2,9);
//                     //converts to number and applies %256 so it wont be any larger than 255
//                     var newColorRGB = [Number(newColor.substr(0,3)) % 256, Number(newColor.substr(3,3)) % 256, Number(newColor.substr(6,3) % 256)];

//                     return newColorRGB;
//                 },

//                 //Use "new" as a parameter to generate a new color
//                 newColorRGBString: function(colorRGB)
//                 {
//                     if(colorRGB === "new")
//                     {
//                         colorRGB = this.state.nineDigitColor.newColorRGB();
//                     }

//                     return "rgb(" + colorRGB[0].toString() + ", " + colorRGB[1].toString() + ", " + colorRGB[2].toString() + ")";

//                 },

//                 //returns the inverted color
//                 invertColor: function(colorRGB)
//                 {
//                     if (colorRGB === "new")
//                     {
//                         colorRGB =  this.state.nineDigitColor.newColorRGB();
//                     }

//                     return [255 - colorRGB[0], 255 - colorRGB[1], 255 - colorRGB[2]];
//                 },
//             }
            
//         }
//     }
    
//     render()
//     {
//         // var inter;
//         var a = this.state.nineDigitColor.newColorRGBString();
//         console.log('hola',a);
//         return(null);
//     }

//     //Global Variable function so it can be called form inside functions and mouse events
//     //I'm not setting the interval now because it would start running and we don't want that u kno
    


//     // function initialize()
//     // {
//     //     var titleObject = document.getElementById("psilowareTitle");
//     //     var btnPlusObject = document.getElementById("btnPlus");
        
        
//     //     titleObject.addEventListener("mouseenter", function(){ applyColor("all"); });
//     //     titleObject.addEventListener("mouseleave", function(){ applyColor("reset"); });
//     //     titleObject.addEventListener("click", function(){ applyColor("all"); });
//     //     titleObject.addEventListener("touchstart", function(){ applyColor("all"); });
        
        
        
        
//     //     btnPlusObject.addEventListener("mousedown", function()
//     //     {
//     //         applyColor("all");
//     //         setInter();
//     //     });

//     //     btnPlusObject.addEventListener("mouseup", function()
//     //     {
//     //         clearInterval(inter);
//     //         applyColor("reset");
//     //     });
        
//     //     // document.defaultView.addEventListener("touchstart", function(){ applyColor("all");
        
//     //     // document.getElementById("hiddenInput").focus(); });
        
//     // }



//     // var applyColor = function(mode)
//     // {
//     //     //PARAMETERS
//     //         //"title" or "body" self explanatory
//     //         //"reset" sets title to white and body to black
//     //         //"all" sets both title and body, gives body the inverse color from title
            
//     //     mode = "" ? "all" : mode ;

//     //     var titleObject = document.getElementById("psilowareTitle");
        
//     //     var titleColor = nineDigitColor.newColorRGB();
//     //     var bodyColor = titleColor;

        
//     //     if(mode === "all")
//     //     {
//     //         //Invert Color
//     //         bodyColor = nineDigitColor.invertColor(bodyColor);
//     //     }
        
//     //     if(mode === "reset")
//     //     {
//     //         bodyColor = [0 , 0, 0];
//     //         titleColor = [255, 255, 255];

//     //         //changes mode so it applies the color
//     //         mode = "all";
//     //     }
        
//     //     titleColor = nineDigitColor.newColorRGBString(titleColor);
//     //     bodyColor = nineDigitColor.newColorRGBString(bodyColor);

//     //     // console.log("Title: " + titleColor + " || Body: " + bodyColor);

//     //     if(mode === "title" || mode === "all")
//     //     {
//     //         titleObject.style.color = titleColor;
//     //     }

//     //     if (mode === "body" || mode === "all")
//     //     {
//     //         document.body.style.backgroundColor = bodyColor;
//     //     }

//     // }



//     // function mouseDown()
//     // { 
//     // applyColor("all");
//     // }

//     // var box = document.getElementById("box");
//     // var pos = 1;


// }

export {nineDigitColor};
export default null;