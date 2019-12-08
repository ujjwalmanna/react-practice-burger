import React,{Component} from 'react';
import Aux from '../../Hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component
{
    componentWillUpdate()
    {
        console.log('[OrderSummary] will update')
    }
    
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(iKey=>
        {
            return (
            <li key={iKey}>
                <span style={{textTransform:"capitalize"}}>{iKey}</span>:{this.props.ingredients[iKey]}
            </li>)
        });
    return (
        <Aux>
            <h3>Your order</h3>
            <p>Burger with following ingredienets:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={this.props.purchaceCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
  }
}

export default OrderSummary