import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import CustomTextFeild from './CustomTextFeild';
import {Link} from 'react-router-dom';
import { commerce } from '../../lib/Commerce';

const AddressForm = ({ checkoutToken,next }) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListCountries(checkoutTokenId);
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchShippingSubdivision = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOption = async (checkoutToken, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutToken, { country: country, region: region });
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }
    console.log(shippingOptions);

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, [])

    useEffect(() => {
        if (shippingCountry) fetchShippingSubdivision(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOption(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision])

    console.log(shippingOptions)
    console.log(shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })))
    return (
        <>
            <Typography variant='h6' gutterBottom>Shopping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> (next({...data, shippingCountry, shippingSubdivision, shippingOption})))}>
                    <Grid container spacing={3}>
                        <CustomTextFeild required name='firstname' label='First Name' />
                        <CustomTextFeild required name='lastname' label='Last Name' />
                        <CustomTextFeild required name='email' label='Email' />
                        <CustomTextFeild required name='address' label='Address' />
                        <CustomTextFeild required name='city' label='City' />
                        <CustomTextFeild required name='zip' label='Zip/ Postal Code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Coutry</InputLabel>
                            <Select onChange={(e) => (setShippingCountry(e.target.value))} value={shippingCountry} fullWidth >
                                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select onChange={(e) => setShippingSubdivision(e.target.value)} value={shippingSubdivision} fullWidth >
                                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Button  component={Link} to='/cart' variant='outlined'>Back To Cart</Button> 
                        <Button type='submit' variant='contained' color='primary'>Next</Button> 

                    </div>

                </form>

            </FormProvider>

        </>
    )
}

export default AddressForm;