import React, { useState } from 'react';
import './converter.css';


export default function Converter() {
    const [ hexColor, setHexColor ] = useState('#34e065');
    const [ rgbColor, setRGBColor ] = useState({r: 52, g: 224, b: 101});

    const checkRGB = rgb => {
        let isValid = true;

        for (let part of Object.values(rgb)) {
            if (!Number.isInteger(+part) || +part > 255) {
                isValid = false;
            }
        }
        return isValid
    }

    const getRGBString = (rgb, opacity) => {
        if (!checkRGB(rgb)) {
            return false
        }
        if (opacity) {
            return('rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity +')')
        } else {
            return('rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')')
        }
    }

    const errorRed = 'rgba(233, 75, 53, 0.5)';
    const errorOutput = 'rgb(233, 75, 53)';


    const handleInputChange = (e) => {
        e.preventDefault();

        const color = e.target.value;
        setHexColor(color);

        if (color.length === 7) {
        
            const rgbColor = {};
        
            rgbColor.r = parseInt(color.substring(1,3),16);
            rgbColor.g = parseInt(color.substring(3,5),16);
            rgbColor.b = parseInt(color.substring(6),16);
        
            return setRGBColor(rgbColor);
        } else {
            return null
        }
    }

    return (
        <div 
            className="converter"
            style={{backgroundColor: getRGBString(rgbColor, 0.5) || errorRed}}
        >
            <input
                type="text"
                className="input"
                value={hexColor}
                onChange={handleInputChange}
            />
            <div className='output' 
                style={{backgroundColor: getRGBString(rgbColor, 1) || errorOutput}}>
                {getRGBString(rgbColor) || 'Ошибка!'}
            </div>
        </div>
    )
}