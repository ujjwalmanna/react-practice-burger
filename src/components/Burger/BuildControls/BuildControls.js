import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import styles from './BuildControls.module.css'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'}
];
const buildControls=(props)=>(
    <div className={styles.BuildControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label} label={ctrl.label}
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className={styles.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);

export default buildControls