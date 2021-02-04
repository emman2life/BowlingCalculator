import React from 'react';

const frame = (props: any) => {
    return (
        <div className="frame">
            <div className="frame-position">{props.position}</div>
            <div className="scores">
                <div className="shot shot1">{props.shotOne}</div>
                <div className="shot shot2">{props.shotTwo}</div>
                <div className={props.shotThreeClass}>{props.shotThree}</div>
            </div>
            <div className="frame-total">{props.frame_total}</div>
            
         </div>
        
    ) 
};

export default frame