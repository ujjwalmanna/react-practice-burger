import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems=(props)=>(
    <ul className={styles.NavigationItems}> 
        <NavigationItem Link='/' active>Burger Builder</NavigationItem>
        <NavigationItem Link='/'>Checkout</NavigationItem>
    </ul>
)

export default navigationItems;