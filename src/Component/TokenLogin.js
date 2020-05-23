import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import Phone from "@material-ui/icons/Phone";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import {ButtonFinish} from "./ButtonCollection";
import useForm from "./useForm";
import isJson from '../isJson';
import { retrieveToken } from '../action'

const CssTextField = withStyles({
    root: {
        '& MuiTextField': {
            color: '#00695c !important',
        },
        '& label': {
            color: '#00695c',
        },
        '& label.Mui-focused': {
            color: '#00695c',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#00695c',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#00695c',
                color: '#00695c',
            },
            '&:hover fieldset': {
                borderColor: '#00695c',
                color: '#00695c',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00695c',
                color: '#00695c',
            },
        },
    },
})(TextField);

const useStyles = makeStyles(theme => ({
    icon: {
        color: '#00695c',
        paddingTop: theme.spacing(3),
        textAlign: 'center',
    },
    first: {
        marginTop: '1rem',
    },
    second: {
        marginBottom: '2rem',
    },

}));

const TokenLogin = () => {
    const classes = useStyles();
    const location = useLocation()
    const history = useHistory()
    const [showPassword, setValues] = React.useState(false);
    const handleClickShowPassword = () => {
        setValues(!showPassword );
    };
    let store = isJson(useSelector(state => state))
    console.log(store)
    const dispatch = useDispatch()
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const submitForm = (e) => {
            let formData = {email: inputs.email, password: inputs.password};           
            // formData.append('email', inputs.email);
            // formData.append('password', inputs.password);           
            dispatch(retrieveToken(formData,history,location))
    }
    const {inputs, handleInputChange, handleSubmit} = useForm(submitForm)
    const error = store.create.name === 'email' ? <Typography color='error' className={classes.icon} variant="caption" gutterBottom>
        {store.create.error}
    </Typography>: '' ;
    return (
        <>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography className={classes.icon} variant="h5" gutterBottom>
                            Log into your account!
                        </Typography>
                    </Grid>
                </Grid>
                {error}
                <Grid container spacing={1} className={`${classes.first} ${classes.second}`}>                                        
                    <Grid item xs={12}>
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
                                        {isNaN(inputs.email) ? 
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            className={classes.icon}
                                        >
                                            <MailOutline fontSize='small' />
                                        </IconButton>: 
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            className={classes.icon}
                                        >
                                            <Phone fontSize='small' />
                                        </IconButton>
                                        }
                                    </InputAdornment>
                                ),style: { color: '#000'}
                            }}
                        />                      
                    </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.second}>
                    <Grid item xs={12}>
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
                                ),style: { color: '#000'}
                            }}
                        />
                    </Grid>
                </Grid>
                <div className={classes.actionsContainer}>
                    <div>                
                        <ButtonFinish loading={store.create.loading} text='Login ' width={true}/> 
                    </div>
                </div>
            </form>
        </>
    );
};

export default TokenLogin;



