import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux';
import isJson from '../isJson';
import {cancelLogout, logout} from '../action'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
    icon: {
        color: '#00695c',
        paddingTop: theme.spacing(3),
        textAlign: 'center',
    },
    img: {
        borderRadius: '50%',
    },
    continue: {
        display: 'flex',
        justifyContent: 'center',
    }
}))

const LoginOut = () => {
    const ab = useStyles()
    const store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    let src = `http://localhost:3000/${store.home.user.Pix}`
    const logoutFxn = () => {
        cookies.remove('login',{ path: '/'})
        dispatch(cancelLogout())
        dispatch(logout())
    }
    const cancelAxn = () => {
        dispatch(cancelLogout())
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <Typography className={ab.icon} variant="h5" gutterBottom>
                <img src={src} width='50' height='50' alt={store.home.user.FirstName} className={ab.img} />
                    {/* <ExitToAppIcon style={{height: '2rem', width: '2rem'}} /> */}
                </Typography>
                <Typography className={ab.icon} variant="h5" gutterBottom>
                    Are you sure you want to log out?
                </Typography>
            </Grid>
            <Grid container item xs={12} sm={12}>
                <Grid item xs={6} sm={6} className={ab.continue}>
                    <Button 
                        onClick={cancelAxn} 
                        size="small"
                        color="primary" 
                        disableFocusRipple={false}
                        disableRipple={false}
                        variant="contained"
                    >
                        CANCEL
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} className={ab.continue}>
                    <Button
                        onClick={logoutFxn}
                        variant="contained"
                        size="small"
                        color="default"
                        className={ab.margin}
                        disableFocusRipple={false}
                        disableRipple={false}
                    >
                        CONTINUE
                        
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginOut