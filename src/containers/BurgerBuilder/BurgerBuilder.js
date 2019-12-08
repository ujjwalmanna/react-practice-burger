import React,{Component,Fragment} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const ING_PRICES={
    salad:0.5,
    bacon:1.2,
    meat:0.7,
    cheese:0.4
}
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false
    }
    updatePurchaseState(ingredients){
       
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{return sum+el},0)
        this.setState({purchasable:sum>0})
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        alert('continue purchase')
    }
    addIngredientHandler=(type)=>{
        const oldCount= this.state.ingredients[type]
        const updatedCount= oldCount+1
        const upgradedIngredients={
            ...this.state.ingredients
        }
        upgradedIngredients[type]=updatedCount;
        const priceAddition=ING_PRICES[type]
        const oldprice=this.state.totalPrice;
        const newprice=oldprice+priceAddition
        this.setState({totalPrice:newprice,ingredients:upgradedIngredients})
        this.updatePurchaseState(upgradedIngredients)
    }

    removeIngredientHandler=(type)=>{
        const oldCount= this.state.ingredients[type]
        const updatedCount= oldCount>0? oldCount-1:0
        const upgradedIngredients={
            ...this.state.ingredients
        }
        upgradedIngredients[type]=updatedCount;
        const priceAddition=ING_PRICES[type]
        const oldprice=this.state.totalPrice;
        const newprice=oldprice-priceAddition
        this.setState({totalPrice:newprice>=4?newprice:4,ingredients:upgradedIngredients})
        this.updatePurchaseState(upgradedIngredients)
    }


    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                     purchaceCancel={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                purchasable={this.state.purchasable}
                disabled={disabledInfo}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/>
            </Fragment>
        );
    }
}

export default BurgerBuilder