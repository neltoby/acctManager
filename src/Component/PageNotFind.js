import React from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button'
import {makeStyles} from "@material-ui/core/styles";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
    },
    container: {
        height: '100vh',
    },
    center: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#1da1f2',
        fontWeight: '900'
    },
    color: {
        color: '#1da1f2',
        '& span': {
            fontSize: '1rem',
            color: '#aaa',
        }
    },
    ul: {
        color: '#aaa'
    },
    login: {
        backgroundColor: '#1da1f2',
        color: '#fff',
        '&:hover':{
            backgroundColor: '#1e90ff',
            
        }
    },
}))

const PageNotFind = () => {
    const classes = useStyles();
    let match = useRouteMatch()
    let location = useLocation()
    let history = useHistory()
    const handleLink = () => {
        history.push(match.url)
    }
    const handleLogin = () => {
        history.push('/login')
    }
    const fxn = cookies.get('login') ? handleLink  : handleLogin ;
    const opt= cookies.get('login') ? ['Misspelt url', 'Connection lost', 'Page might have been moved']  
    : ['You are probably not logged in'] ;
    console.log(match)
    console.log(location)
    return (
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.container}>
                <Grid item sm={2} xs={false}>
                </Grid>
                <Grid item container sm={8} xs={12} className={classes.center}>
                    <Typography className={classes.icon} variant="h2" gutterBottom>
                        404
                    </Typography>
                    <Typography className={classes.color} variant="h5" gutterBottom>
                        Page Not Find "<span>{match.url}</span>"
                    </Typography>
                    <Typography className={classes.color} variant="subtitle1" gutterBottom>
                        These might the likely reasons - 
                    </Typography>
                    <ul className={classes.ul}>
                        {opt.map((val,i) => {
                            return <li key={i}>{val}</li>
                        })}
                    </ul>
                    <Button 
                        color='primary'
                        onClick={fxn}
                        className={classes.login}
                    >
                        {cookies.get('login') ? 'Retry' : 'Login'}
                    </Button>
                </Grid>
                <Grid item sm={2} xs={false}>
                </Grid>
            </Grid>
        </div>
    );
};

export default PageNotFind;