import React from 'react'
import {Container,Grid, Typography,Button} from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom';
import useStyles from './styles';

const Cart = ({cart,handleUpdateCart,handleRemoveCart,handleEmptyCart}) => {
     const classes = useStyles();
     const isEmpty = !cart.line_items;
     console.log(cart)
     
     if(!cart.line_items) return 'loading.....'

     const EmptyCart = () =>{
        return(
            <>
            <Typography variant='subtitle1'>Your Shopping Cart Is Empty</Typography>
            <Link to='/' className={classes.link}>Start Adding Some Items</Link>
            </>
        )
     }

     const FilledCart = () =>{
         return(
            <>
                <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem 
                        item={item} 
                        handleUpdateCart={handleUpdateCart}
                        handleRemoveCart={handleRemoveCart}
                        />
                    </Grid>

                ))
                }
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'>Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
            <Button className={classes.emptyButton} color='secondary' variant='contained' size='large' onClick={handleEmptyCart} type='button'>Empty Cart</Button>
            <Button component={Link} to='/checkout' className={classes.checkoutButton} color='primary' variant='contained' size='large' type='button'>CheckOut</Button>

        </div>
            </>
         )
     }
    return (
        <Container >
            <div className={classes.toolbar}/>
            <Typography variant='h3' gutterBottom>Your Shopping List </Typography>
            {isEmpty ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart;
