import React from 'react';
import { Card, CardActions, CardContent, Button, Typography ,CardMedia} from '@material-ui/core';
import useStyle from './styles';


const CartItem = ({item,handleUpdateCart,handleRemoveCart}) =>{
    const classes = useStyle()
    console.log(item)
    
    return(
        <Card>
        <CardMedia 
            title={item.name}
            className={classes.media}
            image={item.media.source}/>
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant='h4' >{item.name}</Typography>
                    <Typography variant='h5' >{item.line_total.formatted_with_symbol}</Typography>
                </div>
        
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button size='small' onClick={()=>handleUpdateCart(item.id,item.quantity-1)} type='button'>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button size='small' onClick={()=>handleUpdateCart(item.id,item.quantity+1)} type='button'>+</Button>


                </div>
                <Button variant='contained' type='button' color='secondary' onClick={()=>handleRemoveCart(item.id)}>Remove</Button>

            </CardActions>
    </Card>

    )
}

export default CartItem;