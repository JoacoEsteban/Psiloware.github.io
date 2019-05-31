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

        return "rgb(" + colorRGB[0].toString() + ", " + colorRGB[1].toString() + ", " + colorRGB[2].toString() + ")";

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
