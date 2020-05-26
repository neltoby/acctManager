import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createAcct } from '../action'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SignUpContent from './SignUpContent';
import UploadProfile from "./UploadProfile";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import {ButtonFinish, ButtonNext} from "./ButtonCollection"
import SimpleReactValidator from 'simple-react-validator';
import ErrorBoundary from "./ErrorBoundary";
import isJson from '../isJson';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingLeft: '0',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        // overflow: 'scroll',
        backgroundColor: '#001a33',
        height: '100vh',
    },
    icon: {
        color: '#ffffff'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: '#fff',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        backgroundColor: '#001a33',
    },
    step: {
        color: '#ffffff !important'
    },
    login: {
        backgroundColor: '#fff',
        color: '#1da1f2',
        '&:hover':{
            backgroundColor: '#1da1f2',
            color: '#fff'
        }
    },
    port: {
        // backgroundColor: '#001a33',
        height: '100vh',
    }

}));

function getSteps() {
    return ['Personal details', 'Picture upload'];
}



const SignUp = () => {
    const classes = useStyles();
    const [, forceUpdate] = React.useState();
    const [inputs, setInputs] = React.useState({firstname: '',lastname: '',email: '',mobile: '',password: '',profile: '', files: ''})
    let history = useHistory()
    const validator = React.useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}));
    const [formError, setError] = React.useState(false);
    const handleLink = () => {
        history.push('/login')
    }
    let store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    const submitForm = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            alert('You submitted the form and stuff!');
            let formData = new FormData();
            formData.append('firstname', inputs.firstname);
            formData.append('lastname', inputs.lastname);
            formData.append('email', inputs.email);
            formData.append('mobile', inputs.mobile);
            formData.append('password', inputs.password);
            formData.append('profile', inputs.files);
            dispatch(createAcct(formData,history));
        }else {
            setError(true)
            setTimeout(() => {
                setError(false) 
            }, 3000);
        }

    }
    const handleInputChange = useCallback((e) => {
        e.persist()
        if (e.target.name === 'profile') {
            setInputs(inputs => ({
                ...inputs,
                files: e.target.files[0],
                profile: e.target.value,
            }))
        }else {
            setInputs(inputs => ({
                ...inputs,
                [e.target.name]: e.target.value,
            }))
        }               
    }, [] )
    const handleFileCancel = useCallback((name) => {
        setInputs(inputs => ({
            ...inputs,
            files: '',
            profile: ''
        }))
    }, [] )
    const inputValue = useMemo(() => inputs, [inputs])
    // const {inputs, handleInputChange, handleSubmit, handleFileCancel} = useForm(submitForm)
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <ErrorBoundary>
                        <SignUpContent inputs={inputValue} handleInputChange={handleInputChange} validator={validator}/>
                    </ErrorBoundary>
                    );
            case 1:
                return (
                    <ErrorBoundary>
                        <UploadProfile  
                        inputs={inputs} 
                        handleInputChange={handleInputChange} 
                        handleFileCancel={handleFileCancel}
                        error={formError} 
                        validator={validator} />
                    </ErrorBoundary>
                    );
            default:
                return 'Unknown step';
        }
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = useCallback(() => {
        // if (validator.current.fieldValid('firstname') && validator.current.fieldValid('lastname')
        //     && validator.current.fieldValid('email') )
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }, [])

    const handleBack = useCallback(() => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }, []);

    return (
        <>
                <Grid item xs={12} sm={5} className={classes.port}>
                    <form onSubmit={submitForm } encType="multipart/form-data" >
                    <Paper className={classes.paper} square={true}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <Typography className={classes.icon} variant="h6" gutterBottom>
                                    Create an account with us!
                                </Typography>
                            </Grid>
                        </Grid>
                        <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel className={classes.step}>
                                        <Typography className={classes.step} >
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                    <StepContent>
                                        <Typography component='div'>{getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                {activeStep === steps.length - 1 ? <ButtonFinish loading={store.create.loading} text='Create Account'/> : <ButtonNext onClick={handleNext} />}
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                            
                        </Stepper>
                        <Grid container spacing={1}>
                                <Grid item sm={2} xs={2} />
                                <Grid item container xs={12} sm={8}>
                                    <Grid item xs={2} sm={2} />
                                    <Grid item xs={10} sm={10}>
                                        <Button 
                                            fullWidth={true} 
                                            onClick={handleLink}
                                            className={classes.login}
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2} sm={2} />
                                </Grid>
                                <Grid item xs={2} sm={2} />
                            </Grid>
                    </Paper>
                    </form>
                </Grid>

        </>
    );
};

export default SignUp;