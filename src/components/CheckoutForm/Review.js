import React from 'react';
import {Typography, ListItem, ListItemText, List} from '@material-ui/core';

const Review = ({checkoutToken}) => {
    console.log(checkoutToken)
    return (
        <>
        <Typography variant='h6' gutterBottom>Order Summery</Typography>
        <List disablePadding>
            {checkoutToken.live.line_items.map((product)=>(
                <ListItem style={{padding: '10px 0'}} key={product.name}>
                    <ListItemText primary={product.name} secondary={`Quantity : ${product.quantity}`}>
                         <Typography variant='body2' >{product.price.formatted_with_symbol}</Typography>
                    </ListItemText>
                </ListItem> ))}
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary='total' style={{fontWeight: 700}}/>
                         <Typography variant='subtitle2' >{checkoutToken.live.subtotal.formatted_with_symbol}</Typography>
                    
                
                </ListItem>
           

        </List>
        
            
        </>
    )
}

export default Review
