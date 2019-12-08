import React,{Component,Fragment} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import withErrorHandler from '../../components/Hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'

const ING_PRICES={
    salad:0.5,
    bacon:1.2,
    meat:0.7,
    cheese:0.4
}
class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get('https://react-practise-burger.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        }).catch(error=>{this.setState({error:true})})
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
        this.setState({loading:true})
        const orders={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice.toFixed(2),
            customer:{
                name: 'ujjwal',
                address:{
                    street: '24 abc',
                    zipCode: '12345',
                    country: 'india'
                },
                email: 'p@pp.com',
                deliveryMethod: 'fastest'
            }
        }
        axios.post('/orders.json',orders).then(
            response=>this.setState({loading:false,purchasing:false})
        ).catch(error=>this.setState({loading:false,purchasing:false}))
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
        let orderSummary= null
        
        let burger=this.state.error?<p>Ingriendts can't be loaded!</p>:<Spinner/>
        if(this.state.ingredients)
        {
             burger=(
                <Fragment>
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

            orderSummary= <OrderSummary ingredients={this.state.ingredients}
                          price={this.state.totalPrice}
                          purchaceCancel={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler}></OrderSummary>

      
        }
        if(this.state.loading)
        {
            orderSummary=<Spinner/>
        }
        return(
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios)