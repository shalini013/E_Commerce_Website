import React,{useState, useEffect} from 'react';
import {Products,NavBar,Cart,Checkout} from './components';
import {commerce} from './lib/Commerce';
import {Switch, Route,BrowserRouter as Router} from 'react-router-dom';


function App() {

  const [products, setProducts] = useState([])
   const [cart, setCart] = useState({})
   const [order, setOrder] = useState({})
   const [errorMessage, setErrorMessage] = useState('')
  
  const fetchProducts = async()=>{
    const {data} = await commerce.products.list();
    setProducts(data);
  }

   const fetchCart = async() =>{
     setCart(await commerce.cart.retrieve())
    
  } 

   const handleAddToCart = async (productId, quantity) =>{
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart)

  }

  const handleUpdateCartQty = async (productId,quantity) => {
    const responce = await commerce.cart.update(productId,{quantity});
    setCart(responce.cart)

  }

  const handleRemoveCart = async(productId) =>{
    const responce = await commerce.cart.remove(productId);
    setCart(responce.cart)

  }

  const handleEmptyCart = async ()=>{
    const responce = await commerce.cart.empty();
    setCart(responce.cart)
  }

  const refreshCart = async () =>{
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) =>{
    try {
      const incommingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incommingOrder)
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message)      
    }
  }
   
 
  
  useEffect(()=>{
    fetchProducts();
     fetchCart(); 
    
  },[])
  
  return (
    <Router>
       <NavBar totalItems={cart.total_items}/>
      <div>
        <Switch>
          <Route exact path='/'><Products products={products}  onAddToCart={handleAddToCart} /></Route>
          <Route exact path='/cart'><
            Cart cart={cart} 
            handleUpdateCart={handleUpdateCartQty}
            handleRemoveCart={handleRemoveCart}
            handleEmptyCart={handleEmptyCart}
            /></Route>
            <Route exact path='/checkout'>
              <Checkout 
              cart={cart}
              order={order}
              errorMessage={errorMessage}
              onCaptureCheckout={handleCaptureCheckout}
              />
              </Route>
        </Switch>
      
     
    </div>
    </Router>
  )
}

export default App;

