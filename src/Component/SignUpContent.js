import React from 'react';
import Grid from "@material-ui/core/Grid";
import { useSelector } from 'react-redux'
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailOutline from "@material-ui/icons/MailOutline";
import Phone from "@material-ui/icons/Phone";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography'
import isJson from '../isJson'

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
// const ColorCircularProgress = withStyles({
//     root: {
//         color: '#fff',
//         // color: '#00695c',
//     },
// })(CircularProgress);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#001a33',
        height: '100vh',
    },
    margin: {
        marginTop: '1rem',
        // marginBottom: '1rem',
    },
    textField: {
        width: '100%',
        backgroundColor: 'transparent',
        color: '#ffffff',
    },
    icon: {
        color: '#ffffff'
    },
    buttonBase: {
        width: '100%'
    }

}));

const SignUpContent = (props) => {
    const classes = useStyles();
    const [showPassword, setValues] = React.useState(false);
    let store = isJson(useSelector(state => state))
    const handleClickShowPassword = () => {
        setValues(!showPassword );
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    return (
        <>
            <Grid container spacing={1} className={classes.margin}>
                <Grid item sm={2}>

                </Grid>
                <Grid item xs={12} sm={8}>
                    <CssTextField
                        required
                        id="firstname"
                        label="FirstName"
                        fullWidth={true}
                        autoFocus={true}
                        variant="outlined"
                        margin='dense'
                        type='text'
                        name='firstname'
                        value={props.inputs.firstname}
                        onChange={props.handleInputChange}
                        placeholder='FirstNAme *'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle fontSize='small' />
                                </InputAdornment>
                            ),style: { color: 'white'}
                        }}
                    />
                    <Typography variant="caption" className={classes.icon}>
                        {props.validator.current.message('firstname', props.inputs.firstname, 'required|alpha|min:2|max:30')}
                    </Typography>                 
                </Grid>
                <Grid item sm={2}>

                </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.margin}>
                <Grid item sm={2}>

                </Grid>
                <Grid item xs={12} sm={8}>
                    <CssTextField
                        required
                        id="lastname"
                        label="LastName"
                        variant="outlined"
                        margin='dense'
                        placeholder='LastName *'
                        fullWidth={true}
                        type='text'
                        name='lastname'
                        value={props.inputs.lastname}
                        onChange={props.handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle fontSize='small' />
                                </InputAdornment>
                            ),style: { color: 'white'}
                        }}
                    />
                    <Typography variant="caption" className={classes.icon}>
                        {props.validator.current.message('lastname', props.inputs.lastname, 'required|alpha|min:2|max:30')}
                    </Typography>
                    
                </Grid>
                <Grid item sm={2}>

                </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.margin}>
                <Grid item sm={2}>

                </Grid>
                <Grid item xs={12} sm={8}>
                    <CssTextField
                        required
                        id="email"
                        label="Email"
                        variant="outlined"
                        margin='dense'
                        placeholder='Email *'
                        fullWidth={true}
                        type='email'
                        name='email'
                        value={props.inputs.email}
                        onChange={props.handleInputChange}
                        onBlur={() => props.validator.current.showMessageFor('email')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <MailOutline fontSize='small' />
                                </InputAdornment>
                            ),style: { color: 'white'}
                        }}
                    />
                    <Typography variant="caption" className={classes.icon}>
                        {props.validator.current.message('email', props.inputs.email, 'required|email')}
                        {store.create.name === 'email' ? store.create.error : ''}
                    </Typography>
                </Grid>
                <Grid item sm={2}>

                </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.margin}>
                <Grid item sm={2}>

                </Grid>
                <Grid item xs={12} sm={8}>
                    <CssTextField
                        required
                        id="mobile"
                        label="Mobile"
                        variant="outlined"
                        margin='dense'
                        placeholder='Mobile *'
                        fullWidth={true}
                        type='number'
                        name='mobile'
                        value={props.inputs.mobile}
                        onChange={props.handleInputChange}
                        onBlur={() => props.validator.current.showMessageFor('mobile')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Phone fontSize='small' />
                                </InputAdornment>
                            ),style: { color: 'white'}
                        }}
                    />
                    <Typography variant="caption" className={classes.icon}>
                        {props.validator.current.message('mobile', props.inputs.mobile, 'required|phone')}
                        {store.create.name === 'mobile' ? store.create.error : ''}
                    </Typography>
                </Grid>
                <Grid item  sm={2}>

                </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.margin}>
                <Grid item sm={2}>

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
                        value={props.inputs.password}
                        onChange={props.handleInputChange}
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
                    <Typography variant="caption" className={classes.icon}>
                        {props.validator.current.message('password', props.inputs.password, 'required|alpha_num_dash')}
                    </Typography>
                </Grid>
                <Grid item sm={2}>

                </Grid>
            </Grid>
        </>
    );
};

export default SignUpContent;