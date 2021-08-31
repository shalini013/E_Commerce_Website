import React from 'react';
import { Card, CardActions, CardContent, IconButton, Typography ,CardMedia} from '@material-ui/core';

import { AddShoppingCart } from '@material-ui/icons';
import useStyle from './styles';

const Product = ({ product,onAddToCart}) => {
    const classes = useStyle();
     const handleAddToCart = () => onAddToCart(product.id, 1);
    
    return (
        <Card className={classes.root}>
            {/* <img src={product.image} alt='apple pie' className={classes.media} title={product.name}/> */}
            <CardMedia 
            title={product.name}
            className={classes.media}
            image={product.media.source}/>
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant='h5' >{product.name}</Typography>
                    <Typography variant='h5' >{product.price.formatted_with_symbol}</Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html :product.description}} variant='body2' color='textSecondary'/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton onClick={handleAddToCart} aria-label='Add to Card'>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
