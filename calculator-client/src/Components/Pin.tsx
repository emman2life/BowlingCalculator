import React from 'react';

const pin = (props:any) => {
    return (
        <div className="pin">
            
            <button onClick={props.click}>{props.pin_num}</button>
         </div>
        
    ) 
};

export default pin