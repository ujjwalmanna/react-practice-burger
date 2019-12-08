import React from 'react';

const withclass=(props)=>{
    return (<div className={props.classes}>
        {props.children}
    </div>);
}

export default withclass;