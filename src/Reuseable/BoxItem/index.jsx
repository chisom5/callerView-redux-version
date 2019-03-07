import { BoxItemStyle } from "../../style/init";
import React from 'react';

/**
 * @param string icon
 * @param string title
 * @param string value
 */


const BoxItem =(props)=> {
    const { icon,title,value } = props;
    return (
        <BoxItemStyle>
            
            <div className="icon">
                <img src={icon} alt="icon" />
            </div>

            <div className="text">
                <p>{title}</p>
                <h1>{value}</h1>
            </div>
        </BoxItemStyle>
    )
}

export default BoxItem;