import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginAcct } from '../action'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useHistory } from 'react-router-dom'
import Typography from "@material-ui/core/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import Phone from "@material-ui/icons/Phone";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import {ButtonFinish} from "./ButtonCollection";
import Divider from '@material-ui/core/Divider';
import isJson from '../isJson';

const CssTextField = withStyles({
    root: {
        '& MuiTextField': {
            color: '#ffffff !important',
        },
        '& label': {
            color: '#ffffff',
        },
        '& label.Mui-focused': {
            color: '#ffffff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
                color: '#ffffff',
            },
            '&:hover fieldset': {
                borderColor: 'white',
                color: '#ffffff',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
                color: '#ffffff',
            },
        },
    },
})(TextField);
const useStyles = makeStyles(theme => ({
    paper: {
        paddingLeft: '0',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        // overflow: 'scroll',
        backgroundColor: '#001a33',
        height: '100vh',
    },
    icon: {
        color: '#ffffff',
        paddingTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: '#fff',
    },
    actionsContainer: {
        marginTop: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        backgroundColor: '#001a33',
    },
    step: {
        color: '#ffffff !important',
        textDecoration: 'underline',
        '&:hover':{
            color: '#1da1f2 !important',
        }
    },
    login: {
        backgroundColor: '#fff',
        color: '#1da1f2',
        '&:hover':{
            backgroundColor: '#1da1f2',
            color: '#fff',
        }
    },
    logPass: {
        marginTop: theme.spacing(4),
    },
    port: {
        // backgroundColor: '#001a33',
        height: '100vh',
    },
    first: {
        marginTop: '3rem',
    },
    second: {
        paddingRight: '2rem',
        paddingLeft: '2rem',
        marginBottom: '2rem',
    },
    divider: {
        marginTop: theme.spacing(5),
        backgroundColor: '#fff',
    },

}));

const SignIn = () => {
    const classes = useStyles();
    let history = useHistory()
    const [inputs, setInputs] = React.useState({email: '', password: ''})
    const [showPassword, setValues] = React.useState(false);
    const handleClickShowPassword = () => {
        setValues(!showPassword );
    };
    const handleLink = (location) => {
        history.push(location)
    }
    let store = isJson(useSelector(state => state))
    console.log(store)
    const dispatch = useDispatch()
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const handleInputChange = (e) => {
        setInputs(inputs => ({
            ...inputs,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = {email: inputs.email, password: inputs.password}                      
        dispatch(loginAcct(formData,history))
    }
    return (
        <>
            <Grid item xs={12} sm={5} className={classes.port}>
                <form onSubmit={handleSubmit}>
                    <Paper className={classes.paper} square={true}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <Typography className={classes.icon} variant="h5" gutterBottom>
                                    Log into your account!
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className={`${classes.first} ${classes.second}`}>
                            <Grid item xs={false} sm={2}>

                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <CssTextField
                                    required
                                    id="emailMobile"
                                    label="Email/Phone"
                                    fullWidth={true}
                                    autoFocus={true}
                                    variant="outlined"
                                    margin='dense'
                                    type='text'
                                    name='email'
                                    value={inputs.email}
                                    onChange={handleInputChange}
                                    placeholder='Email/Mobile *'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {isNaN(inputs.email) ? <MailOutline fontSize='small' /> : <Phone fontSize='small' />}
                                            </InputAdornment>
                                        ),style: { color: 'white'}
                                    }}
                                />
                            </Grid>
                            <Grid item xs={false} sm={2}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} className={classes.second}>
                            <Grid item xs={false} sm={2}>

                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <CssTextField
                                    required
                                    className={classes.margin}
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    placeholder='Password'
                                    margin='dense'
                                    fullWidth={true}
                                    type={ showPassword ? 'text' :'password' }
                                    name='password'
                                    value={inputs.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    className={classes.icon}
                                                >
                                                    {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),style: { color: 'white'}
                                    }}
                                />
                            </Grid>
                            <Grid item xs={false} sm={2}>

                            </Grid>
                        </Grid>
                        <div className={classes.actionsContainer}>
                            <div>                
                                <ButtonFinish loading={store.create.loading} text='Sign In'/> 
                            </div>
                        </div>
                        <Divider component="li" className={classes.divider} />
                        <Grid container spacing={1} className={classes.second}>
                            <Grid item xs={false} sm={1}>

                            </Grid>
                            <Grid item container xs={12} sm={10} className={classes.logPass}>
                                <Grid item xs={5} sm={5}>
                                <Typography variant="body2" className={classes.step}>
                                    <i onClick={() => handleLink('/recover-password')}>Forgot password</i>
                                </Typography>
                                </Grid>
                                <Grid item xs={7} sm={7}>
                                    <Button 
                                        fullWidth={true} 
                                        onClick={() => handleLink('/create')}
                                        className={classes.login}
                                    >
                                        Create an account 
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={false} sm={1}>

                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </Grid>
        </>
    );
};

export default SignIn;