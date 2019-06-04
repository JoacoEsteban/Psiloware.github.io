var nineDigitColor =
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
            colorRGB = nineDigitColor.newColorRGB();
        }

        //Converts numbers into hex formatted strings
        var toHex = [];
        for(let i = 0; i<3; i++)
        {
            toHex[i]=colorRGB[i].toString(16);
            
            //if the number is 1 digit it adds a 0 upfront
            if(toHex[i].length === 1)
            {
                let fixed = '0' + toHex[i][0]
                
                toHex[i] = fixed;
            }
        }

        colorRGB = toHex;
        
        



        return "#" + colorRGB[0].toString(16) + colorRGB[1].toString(16) + colorRGB[2].toString(16);

    },

    //returns the inverted color
    invertColor: function(colorRGB)
    {
        if (colorRGB === "new")
        {
            colorRGB =  nineDigitColor.newColorRGB();
        }

        return [255 - colorRGB[0], 255 - colorRGB[1], 255 - colorRGB[2]];
    }
}


export { nineDigitColor };
