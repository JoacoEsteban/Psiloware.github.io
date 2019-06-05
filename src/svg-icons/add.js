import React from 'react'
import SVG from './SVG'

const AddIcon = ({iconColor, onClick}) =>
{
    return(
        <div onClick={onClick}>

            <SVG iconColor={iconColor} path="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </div>
        )
}

export default AddIcon;