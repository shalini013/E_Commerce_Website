import React, { useState, useEffect } from 'react';
import { Typography, Paper, Stepper, Step, StepLabel, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import useStyle from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/Commerce';
import { Link ,useHistory} from 'react-router-dom';

const steps = ['Shopping Address', 'Payment Details']



const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    const classes = useStyle()
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [isFinish, setIsFinish] = useState(false)
    const history = useHistory();


    const generateCheckoutToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
            setCheckoutToken(token)

        } catch (error) {
            history.pushState('/')
        }

    }

    useEffect(() => {
        generateCheckoutToken();
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();

    }
    const timeOut = () =>{
        setTimeout(() => {
            setIsFinish(true)
        }, 3000);
    }  

    const Confirmation = () => order.customer ? (
        <>
            <CssBaseline />
            <div>
                <Typography variant='h4'>Thank you for your purches, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle1'>ref :{order.customer_reference}</Typography>
            </div>
            <br />
            <Button variant='outlined' component={Link} to='/'>Back To Home</Button>
        </>
    ) : isFinish ?(
        <>
        <div>
                <Typography variant='h4'>Thank you for your purches</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button variant='outlined' component={Link} to='/'>Back To Home</Button>
        </>


    ): (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if (error) {
        <>
            <Typography variant='h5'>Error:{error}</Typography>
            <br />
            <Button variant='outlined' component={Link} to='/'>Back To Home</Button>

        </>
    }

    const Form = () => activeStep === 0 ? <AddressForm next={next} checkoutToken={checkoutToken} /> : <PaymentForm checkoutToken={checkoutToken} backStep={backStep} shippingData={shippingData} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeOut={timeOut} />

    return (
        <>
         <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>
                                    {step}
                                </StepLabel>

                            </Step>
                        ))}

                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}

                </Paper>

            </main>

        </>
    )
}

export default Checkout
