import React, { useState } from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import useForm from './useForm';
import InputAdornment from "@material-ui/core/InputAdornment";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import Instagram from "@material-ui/icons/Instagram";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {sendComplain} from '../action'
import { useDispatch } from 'react-redux';

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
const RedCheckbox = withStyles({
    root: {
      color: 'red',
      '&$checked': {
        color: 'red',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
    emailButton: {
        color: 'white',
    },
    content: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    carrier: {
        width: '60%',
        alignItems: 'start',
    },
    moveCenter: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'center'
        }
    },
    icon: {
        color: 'white',
    },
    blueicons: {
        marginRight: '1rem',
        '&:hover': {
            backgroundColor: '#567bb1',
        }
    },
    ticons: {
        marginRight: '1rem',
        '&:hover': {
            backgroundColor: '#08b5e6',
        }
    },
    icons: {
        marginRight: '1rem',
        '&:hover': {
            backgroundColor: 'red',
        }
    },
    bold: {
        color: 'red',
    },
    bold2: {
        color: 'white',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
        width: '60%',
    },
    small: {
        fontSize: '0.8rem',
        color: 'white',
        paddingBottom: '1rem',
    },
    root: {
        flexGrow: 1,
        backgroundColor: 'rgba(128,128,128,0.1)',
    },
    roots: {
        flexGrow: 1,
        backgroundColor: '#332e2d',
    },
    lroot: {
        width: '100%',
        backgroundColor: 'inherit',
        color: 'white',
    },
    litem: {
        color: 'white',
    },
    inline: {
        display: 'inline',
        color: 'white',
    },
    container: {
        marginBottom: '2rem',
        backgroundColor: '#7f7f7f',
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Footer = () => {
    const ab = useStyles();
    const [complain, setComplain] = useState('')
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch() 
    const [sub, setSub] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(sendComplain(complain))
        setOpen(true)
        setComplain('')
    }
    const handleChange = e => {
        setSub(!sub);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    return (
        <>
        <Grid item container md={4} xs={12} spacing={2} className={ab.content}>
            <div className={ab.carrier}>
                <Typography variant='body1' className={ab.bold}>
                    STAY CONNECTED
                </Typography>
                <Typography variant='body1' className={ab.bold2}>
                    <FormControlLabel
                        control={
                        <RedCheckbox
                            checked={sub}
                            onChange={handleChange}
                            name="sub"
                            color="primary"
                        />
                        }
                        label="Subscribe to our news letter"
                    />
                </Typography>
                <form onSubmit={handleSubmit}>
                    <CssTextField
                        required
                        id="Complain"
                        label="Complain"
                        fullWidth={true}
                        variant="outlined"
                        margin='dense'
                        type='complain'
                        name='complain'
                        value={complain}
                        onChange={e => setComplain(e.target.value)}
                        placeholder='Complain *'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button 
                                        className={ab.emailButton}
                                        type='submit'
                                    >
                                        Send
                                    </Button>
                                </InputAdornment>
                            ),style: { color: 'white'}
                        }}
                    />
                </form>
            </div>
            <div className={ab.row}>
                <span>
                    <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        className={ab.blueicons}
                    >
                        <Facebook className={ab.icon}/>
                    </IconButton>
                    <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        className={ab.ticons}
                    >
                        <Twitter className={ab.icon}/>
                    </IconButton>
                    <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        className={ab.icons}
                    >
                        <Instagram className={ab.icon}/>
                    </IconButton>
                    
                </span>
            </div>
        </Grid>
        <Grid container item md={3} xs={12} spacing={2} className={ab.moveCenter}>
            <div className={ab.carrier}>
                <Typography variant='body1' className={ab.bold}>
                    OUR SERVICES
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Tranfers
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Bank Lifting
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Bank Transaction
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Withdrawal
                </Typography>
            </div>         
        </Grid>
        <Grid container item md={2} xs={12} spacing={2} className={ab.moveCenter}>
            <div className={ab.carrier}>
                <Typography variant='body1' className={ab.bold}>
                    CONTACT US
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Housing Estate Victoria Garden City , Lagos Island <br/>
                    Suite 300
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Office: 01-7654672
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Customer Care: 09000067000
                </Typography>
            </div>
        </Grid>
        <Grid container item md={3} xs={12} spacing={2} className={ab.moveCenter}>
            <div className={ab.carrier}>
                <Typography variant='body1' className={ab.bold}>
                    PRIVACY
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    &copy;Copyright 2020
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Office: 09036521234
                </Typography>
                <Typography variant='body1' className={ab.small}>
                    Customer Care: 09000067000
                </Typography>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Your complain has been sent!
                </Alert>
            </Snackbar>
        </Grid>
        </>
    );
};

export default Footer;