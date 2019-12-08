import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngreidient/BurgerIngredient'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'

const burger=(props)=>{
    let transformIngredients = Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
           return <BurgerIngredient key={igKey+i} type={igKey}/>
        })
    }).reduce((ar,el)=>{
        return ar.concat(el)
    },[])
    if(transformIngredients.length===0)
    {
     transformIngredients=<p>please add ingredients</p>
    }
     
    return(
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}
export default burger